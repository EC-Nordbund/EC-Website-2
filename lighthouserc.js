module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'yarn start'
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'http://next.ec-nordbund.de:9000',
      // token: 'Your *build token* goes here', // could also use LHCI_TOKEN variable instead
    },
  }
}