const categories = [
  {
    id: 'typography',
    name: 'Typography',
    description: 'HTML, being a markup language, has abundantly clear semantics for basic typography. Water.css leaves those semantics untouched.',
    snippets: [
      {
        id: 'copy',
        name: 'Headings and copy',
        code: `
<h1>Heading 1</h1>
<p>
  This is a paragraph that could contain long-form text. Heck, <a href="#">here's a link</a>.
  <strong>This is important,</strong> this is normal, <em>and this is emphasized!</em>
</p>
<p>This is another paragraph that could contain long-form text.</p>

<h2>Heading 2</h2>
<p>You probably get the idea by now!</p>

<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h5>Heading 6</h5>
        `
      },
      {
        id: 'quotes',
        name: 'Quotes',
        code: `
<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  "The HTML blockquote Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote#Usage_notes">Notes</a> for how to change it). A URL for the source of the quotation may be given using the <code>cite</code> attribute, while a text representation of the source can be given using the <code>&lt;cite&gt;</code> cite element."
  <footer>
    <cite>MDN, "The Block Quotation element"</cite>
  </footer>
</blockquote>

<p>
  Did you know HTML supports inline quotes? I didn't, until I read that
  <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">
    the <code>&lt;q&gt;</code> HTML element indicates that the enclosed text is a short inline quotation
  </q>.
</p>
        `
      },
      {
        id: 'lists',
        name: 'Lists',
        code: `
<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
  <li>Unordered list item 3</li>
</ul>
<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
  <li>Ordered list item 3</li>
</ol>
<dl>
  <dt>Unordered lists</dt>
  <dd>Represents an unordered list of items, typically rendered as a bulleted list</dd>
  <dt>Ordered lists</dt>
  <dd>Represents an ordered list of items, typically rendered as a numbered list</dd>
  <dt>Description lists</dt>
  <dd>Encloses a list of groups of terms and descriptions</dd>
  <dd>Not commonly used, but still nifty</dd>
</dl>
        `
      },
      {
        id: 'code-etc',
        name: 'Code samples, keyboard shortcuts, oh my',
        code: `
<p>
  Below is some code. If you select it, you can copy using <kbd>Ctrl-C</kbd>.
  Did you know that <code>alert(1)</code> can show an alert in JavaScript?
</p>
<pre><code>// This logs a message to the console and check out the scrollbar.
console.log('Hello, world!')</code></pre>

<p>HTML also has elements for <var>variables</var> and sample output: <samp>Hello, world!</samp></p>
        `
      }
    ]
  },
  {
    id: 'forms',
    name: 'Form controls',
    description: 'Water.css provides a set of styles for form controls, including text inputs, select boxes, buttons, and more.',
    snippets: [
      {
        id: 'text-inputs',
        name: 'Text inputs',
        code: `
<form onsubmit="return false;">
  <label for="email">Email</label>
  <input type="email" name="email" id="email" placeholder="john.doe@gmail.com" />

  <label for="id">User id (read only)</label>
  <input readonly name="id" id="id" value="04D6H89Z" />

  <label for="disabled">Random disabled input</label>
  <input disabled name="disabled" id="disabled" placeholder="Because why not?" />

  <label for="about">About me</label>
  <textarea name="about" id="about" placeholder="I am a textarea..."></textarea>
</form>
        `
      },
      {
        id: 'buttons',
        name: 'Buttons',
        code: `
<button onclick="alert('Clicked!')">Hey look, a button!</button>
<br>
<form onsubmit="alert('Form submitted!'); return false;">
  <label for="name-field">Your name</label>
  <input type="text" id="name-field" name="name" />
  <input type="submit" value="Submit" />
  <input type="reset" value="Reset" />
</form>
        `
      },
      {
        id: 'assorted-inputs',
        name: 'Assorted other controls',
        code: `
<form onsubmit="return false;">
  <label for="rating">Rate this site</label>
  <input name="rating" id="rating" type="range" min="1" max="10"></input>

  <label for="flavor">Choose a flavor</label>
  <select name="flavor" id="flavor">
    <option>Chocolate</option>
    <option>Strawberry</option>
    <option>Vanilla</option>
  </select>

  <fieldset>
    <legend>Choose a Doe</legend>
    <div>
      <input type="radio" id="john" name="drone" value="john" checked />
      <label for="john">John Doe</label>
    </div>
    <div>
      <input type="radio" id="jane" name="drone" value="jane" />
      <label for="jane">Jane Doe</label>
    </div>
    <div>
      <input type="radio" id="johnny" name="drone" value="johnny" />
      <label for="johnny">Johnny Doe</label>
    </div>
  </fieldset>

  <input type="checkbox" name="remember" id="remember" checked />
  <label for="remember">Remember me</label>
</form>
        `
      },
      {
        id: 'dialogs',
        name: 'Dialogs',
        caniuse: 'https://caniuse.com/dialog',
        code: `
<div>
  <button type="button" id="dialog-trigger">
    Show me the dialog!
  </button>
  <span id="dialog-result"></span>
</div>

<dialog id="dialog">
  <header>This is a sample dialog</header>
  <form method="dialog">
    <p>What is your favorite pet animal?</p>
    <menu>
      <button value="feline">Cats</button>
      <button value="canine">Dogs</button>
      <button value="other">Others</button>
    </menu>
  </form>
</dialog>

<script>
  document.getElementById('dialog-trigger').addEventListener('click', () => {
    document.getElementById('dialog-result').innerText = ''
    document.getElementById('dialog').showModal()
  })

  document.getElementById('dialog').addEventListener('close', (event) => {
    document.getElementById('dialog-result').innerText = \`Your answer: \${event.target.returnValue}\`
  })
</script>
        `,
        realCode: `
<div>
  <button type="button" id="dialog-trigger">
    Show me the dialog!
  </button>
  <span id="dialog-result"></span>
</div>
        `
      }
    ]
  },
  {
    id: 'misc',
    name: 'Miscellaneous',
    description: 'Styles are also provided for various other elements that don\'t strictly fit into the other categories. These include tables, dialogs, and images.',
    snippets: [
      {
        id: 'tables',
        name: 'Tables',
        code: `
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Godzilla</td>
      <td>2</td>
      <td>$299.99</td>
    </tr>
    <tr>
      <td>Mozilla</td>
      <td>10</td>
      <td>$100,000.00</td>
    </tr>
    <tr>
      <td>Quesadilla</td>
      <td>1</td>
      <td>$2.22</td>
    </tr>
  </tbody>
</table>
        `
      },
      {
        id: 'details',
        name: 'Summary/details',
        caniuse: 'https://caniuse.com/details',
        code: `
<details>
  <summary>Some summary/details can't hurt!</summary>
  <p>Lorem ipsum dolor sit blah blah.</p>
</details>
        `
      },
      {
        id: 'rules-etc',
        name: 'Rules, images, and addresses',
        code: `
<p>Here's a horizontal rule and image because I don't know where else to put them.</p>
<img src="https://placekitten.com/408/287" alt="Example kitten" />
<hr />

<p>Addresses are also styled to be <strong>awesome</strong>!</p>
<address>
  <a href="mailto:john.doe@example.com">john.doe@example.com</a><br>
  <a href="tel:778-330-2389">778-330-2389</a><br>
  <a href="sms:666-666-6666">666-666-6666</a><br>
</address>
        `
      }
    ]
  }
]

const tocContainer = document.getElementById('toc')
for (const category of categories) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.href = `#${category.id}`
  a.innerText = category.name
  li.appendChild(a)

  const ul = document.createElement('ul')
  for (const snippet of category.snippets) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${snippet.id}`
    a.innerText = snippet.name
    li.appendChild(a)
    ul.appendChild(li)
  }

  li.appendChild(ul)
  tocContainer.appendChild(li)
}

const demosContainer = document.getElementById('demos')
let first = true
for (const category of categories) {
  const h2 = document.createElement('h2')
  h2.id = category.id
  h2.innerText = category.name
  demosContainer.appendChild(h2)

  const p = document.createElement('p')
  p.innerText = category.description
  demosContainer.appendChild(p)

  for (const snippet of category.snippets) {
    const h3 = document.createElement('h3')
    h3.id = snippet.id
    h3.innerText = snippet.name
    demosContainer.appendChild(h3)

    if (snippet.caniuse) {
      const p = document.createElement('p')
      p.innerText = '⚠️ This may not be supported in all browsers. '
      const a = document.createElement('a')
      a.href = snippet.caniuse
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.innerText = 'See caniuse for more info.'
      p.appendChild(a)
      demosContainer.appendChild(p)
    }

    const pre = document.createElement('pre')
    const code = document.createElement('code')
    code.innerText = snippet.code.trim()
    pre.style.position = 'relative'
    pre.appendChild(code)

    const button = document.createElement('button')
    button.innerText = 'Copy'
    button.className = 'snippet-copy'
    let timeout = null
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(snippet.code.trim())
      button.innerText = 'Copied!'
      clearTimeout(timeout)
      timeout = setTimeout(() => { button.innerText = 'Copy' }, 1000)
    })

    pre.appendChild(button)
    demosContainer.appendChild(pre)

    const details = document.createElement('details')
    details.id = `${snippet.id}-details`
    details.innerHTML = snippet.realCode || snippet.code

    // Execute any scripts in the HTML.
    Array.from(details.querySelectorAll('script')).forEach((oldScript) => {
      const newScript = document.createElement('script')
      for (const { name, value } of oldScript.attributes) { newScript.setAttribute(name, value) }
      newScript.appendChild(document.createTextNode(oldScript.innerHTML))
      oldScript.parentNode.replaceChild(newScript, oldScript)
    })

    const summary = document.createElement('summary')
    summary.innerText = 'Show output'
    details.prepend(summary)
    demosContainer.appendChild(details)

    if (first) {
      details.open = true
      first = false

      let firstToggle = true
      details.addEventListener('toggle', () => {
        if (!details.open || firstToggle) return
        firstToggle = false
        history.pushState({}, '', '#' + snippet.id)
      })
    } else {
      details.addEventListener('toggle', () => {
        if (!details.open) return
        history.pushState({}, '', '#' + snippet.id)
      })
    }
  }
}

const hashChange = () => {
  const details = document.getElementById(`${window.location.hash.slice(1)}-details`)
  if (!details) return
  details.open = true
}
window.addEventListener('hashchange', hashChange, false)
hashChange()

// Dialog demo scripting.
document.getElementById('dialog-trigger').addEventListener('click', () => {
  document.getElementById('dialog-result').innerText = ''
  document.getElementById('dialog').showModal()
})

document.getElementById('dialog').addEventListener('close', (event) => {
  document.getElementById('dialog-result').innerText = `Your answer: ${event.target.returnValue}`
})
