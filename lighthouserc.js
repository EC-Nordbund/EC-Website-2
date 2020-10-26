module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/datenschutz', 'http://localhost:3000/blog', 'http://localhost:3000/veranstaltungen/', 'http://localhost:3000/blog/all'],
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
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:pwa": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "color-contrast": "off",
        "redirects-http": "off",
        "tap-targets": "off"
      }
    },
  }
}
