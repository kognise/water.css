const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const fs = require('fs-extra')
const chokidar = require('chokidar')
const sass = require('node-sass')

const script = `
const socket = io()
socket.on('reload', () => location.reload())
`

app.get('/', async (req, res) => {
  console.log('> Serving index')
  const html = await fs.readFile('index.html')
  const injected = html.toString().replace('</body>', `<script src='/socket.io/socket.io.js'></script><script>${script}</script></body>`)
  res.send(injected)
})

app.get('/script.js', async (req, res) => {
  console.log('> Serving script')
  const script = await fs.readFile('script.js')
  res.contentType('javascript')
  res.send(script)
})

app.use('/dist', (req, res, next) => {
  console.log('> Serving a stylesheet')
  next()
}, express.static('dist'))

function reload() {
  console.log('> Reloading')
  io.emit('reload')
}

chokidar.watch('index.html', { ignoreInitial: true }).on('all', () => {
  console.log('> Index changed')
  reload()
})

chokidar.watch('script.js', { ignoreInitial: true }).on('all', () => {
  console.log('> Script changed')
  reload()
})

function buildSass(file) {
  sass.render({ file, outputStyle: 'compressed' }, async (errors, result) => {
    if (errors) {
      console.log('> Sass errors!')
      console.log(errors)
      return
    }
    const outFile = file.replace('src', 'dist').replace('.scss', '.css')
    await fs.outputFile(outFile, result.css)
    reload()
  })
}

chokidar.watch('src/*.scss', { ignoreInitial: true }).on('all', (event, file) => {
  console.log('> Stylesheet changed')
  buildSass(file)
})

chokidar.watch('src/parts/*.scss', { ignoreInitial: true }).on('all', async () => {
  console.log('> Stylesheet part changed')
  const src = await fs.readdir('src')
  const files = src.filter(file => file !== 'parts').map(file => `src/${file}`)
  for (let file of files) {
    buildSass(file)
  }
})

http.listen(3000, () => console.log('> Ready at http://localhost:3000/'))