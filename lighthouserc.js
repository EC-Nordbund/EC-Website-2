module.exports = {
  ci: {
    collect: {
      // , 'http://localhost:3000/blog/all'
      url: ['http://localhost:3000/', 'http://localhost:3000/datenschutz', 'http://localhost:3000/blog', 'http://localhost:3000/veranstaltungen/'],
      startServerCommand: 'yarn start'
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'http://next.ec-nordbund.de:9000',
      // token: 'Your *build token* goes here', // could also use LHCI_TOKEN variable instead
    },
    // TODO: Überlegen was hier sinn macht.
    assert: {
      preset: 'lighthouse:recommended',
      // assertions: {
      // "first-contentful-paint": "off",
      // "works-offline": ["warn", { "minScore": 1 }],
      // "uses-responsive-images": ["error", { "maxLength": 0 }]
      // },
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.98 }],
        "categories:pwa": ["error", { "minScore": 0.85 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "color-contrast": "off",
        "redirects-http": "off",
        "tap-targets": "off",
        "uses-http2": "off",
        "unused-css-rules": "off",
        "unused-javascript": "off",
        // Kann wenn Testbeiträge weg sind wieder rein.
        "uses-rel-preconnect": "off",
        // Kann bald wieder rein
        "apple-touch-icon": "off",
        // Sollte bald wieder rein
        "uses-optimized-images": "off",
        "content-width": "off"
      }
    },
  }
}
