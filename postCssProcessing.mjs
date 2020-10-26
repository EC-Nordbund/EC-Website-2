import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'

const base = './.nuxt/dist'

function handleDir(dir) {
  readdirSync(dir).forEach((fileOrFolder) => {
    const combined = dir + '/' + fileOrFolder

    if (statSync(combined).isFile()) {
      if (combined.endsWith('.css')) {
        handleFile(combined)
      }
    } else {
      handleDir(combined)
    }

  })
}


function handleFile(file) {
  let content = readFileSync(file, 'utf-8')

  let len = 0

  while (content.length !== len) {
    len = content.length

    content = handleContents(content)
  }

  writeFileSync(file, content)
}

// TODO: optimize multiple css selectors
function handleContents(content) {
  return content.split('}')
    .filter(v => {
      const sel = v.split('{')[0]
      return sel.split(',').every(selector =>
        !selector.includes('.v-application--is-rtl') &&
        !selector.includes('[dir=rtl]') &&
        !(selector.includes('rounded') && !selector.includes('0')) &&
        !selector.includes('order') &&
        !selector.includes('.v-btn--fab') &&
        !selector.includes('.theme--dark')
      )
    })
    .join('}').split('  ').join('').split('\n ').join('\n').split('\n\n').join('\n')
}

handleDir(base)