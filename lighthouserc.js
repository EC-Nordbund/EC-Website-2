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
    assert: {
      preset: 'lighthouse:recommended',
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.80 }],
        "categories:accessibility": ["error", { "minScore": 0.98 }],
        "categories:pwa": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 1 }],
        // User Farbschema geht sonst nicht
        "color-contrast": "off",
        // Geht in CI nicht
        "redirects-http": "off",
        // Geht in CI nicht
        "uses-http2": "off",
        // Zu viel unsed JS + CSS
        "unused-css-rules": "off",
        "unused-javascript": "off",
        // Sollte bald wieder rein
        "uses-optimized-images": "off",
        "content-width": "off"
      }
    },
  }
}
