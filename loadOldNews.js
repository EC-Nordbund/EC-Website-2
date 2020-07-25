const fs = require('fs')
const axios = require('axios')

const file = []
const slugs = []

const HTML_ENCODED = /&#[0-9]\d*;/

var HTMLParser = require('node-html-parser')

const classes = []

const remClass = [
  'aligncenter',
  'alignnone',
  'alignright',
  'alignwide',
  'attachment-thumbnail',
  'blocks-gallery-grid',
  'blocks-gallery-item',
  'columns-3',
  'columns-4',
  'embed-youtube',
  'failed',
  'fbPhotosPhotoCaption',
  'gallery',
  'gallery-caption',
  'gallery-columns-3',
  'gallery-group',
  'gallery-icon',
  'gallery-item',
  'gallery-row',
  'gallery-size-thumbnail',
  'galleryid-1737',
  'gmail_default',
  'has-background',
  'has-cyan-bluish-gray-color',
  'has-media-on-the-right',
  'has-medium-font-size',
  'has-text-align-center',
  'has-text-align-left',
  'has-text-color',
  'has-very-dark-gray-background-color',
  'has-very-light-gray-background-color',
  'has-very-light-gray-color',
  'hasCaption',
  'images-1',
  'images-2',
  'img_container',
  'is-cropped',
  'is-provider-youtube',
  'is-stacked-on-mobile',
  'is-style-default',
  'is-style-fill',
  'is-type-video',
  'is-vertically-aligned-center',
  'landscape',
  'largeFail',
  'portrait',
  'size-medium',
  'size-thumbnail',
  'tiled-gallery',
  'tiled-gallery-caption',
  'tiled-gallery-item',
  'tiled-gallery-item-large',
  'tiled-gallery-item-small',
  'tiled-gallery-unresized',
  'type-rectangular',
  'type-square',
  'wp-block-button',
  'wp-block-button__link',
  'wp-block-buttons',
  'wp-block-embed',
  'wp-block-embed-youtube',
  'wp-block-embed__wrapper',
  'wp-block-gallery',
  'wp-block-group',
  'wp-block-group__inner-container',
  'wp-block-image',
  'wp-block-media-text',
  'wp-block-media-text__content',
  'wp-block-media-text__media',
  'wp-block-quote',
  'wp-block-separator',
  'wp-block-spacer',
  'wp-caption',
  'wp-caption-text',
  'wp-embed-aspect-16-9',
  'wp-has-aspect-ratio',
  'wp-video',
  'wp-video-shortcode',
  'youtube-player',
]

const links = ['href', 'src']
const delAttrs = [
  'id',
  // 'class',
  'data-original-width',
  'data-carousel-extra',
  'itemscope',
  'itemtype',
  'data-original-height',
  'border',
  'itemprop',
  'content',
  'data-image-meta',
  'data-comments-opened',
  'data-attachment-id',
  'data-orig-file',
  'data-orig-size',
  'data-image-title',
  'data-image-description',
  'data-medium-file',
  'data-large-file',
  'data-permalink',
  'srcset',
  'sizes',
]

const parseElement = (el) => {
  el.childNodes.forEach(parseElement)

  if (el.nodeType !== 3) {
    delAttrs.forEach((att) => {
      el.removeAttribute(att)
    })

    links.forEach((att) => {
      let l = el.getAttribute(att)

      if (!l) {
        return
      }

      l = l.split(/i\d.wp.com\//).join('')

      if (l.startsWith('https://www.ec-nordbund.de/wp-content/uploads/')) {
        l = l
          .split('https://www.ec-nordbund.de/wp-content/uploads/')
          .join('/old/')

        // TODO: LOG
        console.log(l)
      }

      el.setAttribute(att, l)
    })

    const klass = el.getAttribute('class')

    if (klass) {
      const klassen = klass.split(' ')

      const ncl = klassen
        .filter((el) => !remClass.includes(el))
        .filter((el) => !/wp-image-\d+/.test(el))
        .join(' ')
        .trim()

      // if (klassen.some((v) => v === 'wp-block-gallery')) {
      //   console.log(el.tagName, el)
      // }

      // console.log(ncl, 'c')

      // console.log(klass, ncl)

      if (ncl !== '') {
        el.setAttribute('class', ncl)
      } else {
        el.removeAttribute('class')
      }
    }
  }
}

const parseFile = (el) => {
  const p = HTMLParser.parse(el)
  p.removeWhitespace()

  parseElement(p)

  return p.toString()
}

async function main() {
  const data = await Promise.all([
    await axios.default.get(
      'https://www.ec-nordbund.de/wp-json/wp/v2/posts?per_page=100&offset=0'
    ),
    await axios.default.get(
      'https://www.ec-nordbund.de/wp-json/wp/v2/posts?per_page=100&offset=100'
    ),
  ])

  data.forEach((data) => {
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
        )}"\nfeaturedImage: /card.png\n---\n\n# ${v.title.rendered
        .split('"')
        .join('\\"')
        .split(HTML_ENCODED)
        .join('')}\n\n${parseFile(v.content.rendered)}`,
      slug: v.slug,
    }))

    _f.forEach((v) => {
      fs.writeFileSync(v.filename, v.content)
      file.push(
        ...v.content
          .split('src="')
          .filter((_v, i) => i !== 0)
          .map((v) => v.split('"')[0].split('?')[0])
          .filter((v) =>
            v.startsWith('https://www.ec-nordbund.de/wp-content/uploads/')
          )
      )
      file.push(
        ...v.content
          .split('src-set="')
          .filter((_v, i) => i !== 0)
          .map((v) => v.split('"')[0].split('?')[0])
          .filter((v) =>
            v.startsWith('https://www.ec-nordbund.de/wp-content/uploads/')
          )
      )
      slugs.push(v.slug)
    })
  })

  // console.log(file)
  // console.log(
  //   classes
  //     .sort()
  //     .filter((el, i, self) => self.indexOf(el) === i)
  //     .join('\n')
  // )

  // fs.writeFileSync('./fileToDownload.json', JSON.stringify(file.sort()))
  // fs.writeFileSync('./slugs.json', JSON.stringify(slugs.sort()))

  // console.log(_f)
}

main()
