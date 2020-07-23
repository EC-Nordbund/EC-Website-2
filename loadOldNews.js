const axios = require('axios')
const fs = require('fs')

const file = []
const slugs = []

const HTML_ENCODED = /&#[0-9]\d*;/

async function main() {
  const data = await axios.default.get(
    'https://www.ec-nordbund.de/wp-json/wp/v2/posts?per_page=100&offset=0'
  )

  const _f = data.data.map((v) => ({
    filename: `./content/blog/${v.slug}.md`,
    content: `---\ntitle: "${v.title.rendered
      .split('"')
      .join('\\"')
      .split(HTML_ENCODED)
      .join('')}"\npublished: ${
      v.date
    }\ndescription: "${v.meta.jetpack_publicize_message
      .split('\n')
      .join('\\n')
      .split('\r')
      .join('')
      .split('"')
      .join(
        '\\"'
      )}"\nfeaturedImage: http://localhost:3000/card.png\n---\n\n# ${v.title.rendered
      .split('"')
      .join('\\"')
      .split(HTML_ENCODED)
      .join('')}\n\n${v.content.rendered}`,
    slug: v.slug,
  }))

  _f.forEach((v) => {
    fs.writeFileSync(v.filename, v.content)
    file.push(
      ...v.content
        .split('src="')
        .filter((v, i) => i !== 0)
        .map((v) => v.split('"')[0].split('?')[0])
        .filter((v) =>
          v.startsWith('https://www.ec-nordbund.de/wp-content/uploads/')
        )
    )
    file.push(
      ...v.content
        .split('src-set="')
        .filter((v, i) => i !== 0)
        .map((v) => v.split('"')[0].split('?')[0])
        .filter((v) =>
          v.startsWith('https://www.ec-nordbund.de/wp-content/uploads/')
        )
    )
    slugs.push(v.slug)
  })

  console.log(file)

  fs.writeFileSync('./fileToDownload.json', JSON.stringify(file.sort()))
  fs.writeFileSync('./slugs.json', JSON.stringify(slugs.sort()))
  // console.log(_f)
}

main()
