import { build, watch } from './gulpfile.js'
if (process.argv[2] === 'build') {
  build()
} else if (process.argv[2] === 'watch') {
  watch()
} else {
  console.log('Unknown command, supported: build, watch')
}
