import express from 'express'
import { json } from 'body-parser'
import { ruleLib } from '../plugins/validateLib'
import { saveForConfirm, validateToken, cleanup } from './fs-helpers'
import { validate } from './validate'

const app = express()

app.use(json())

app.post('/anmeldung/ma/ort', (req, res) => {
  const rules = {
    vorname: ruleLib.vorname,
    nachname: ruleLib.nachname,
    geschlecht: ruleLib.geschlecht,
    gebDat: ruleLib.gebDat,
    strasse: ruleLib.strasse,
    plzOrt: {
      plz: ruleLib.plz,
      ort: ruleLib.ort,
    },
    email: ruleLib.email,
    datenschutz: ruleLib.datenschutz,
    ecKreis: ruleLib.ecKreis,
    isMA: ruleLib.isMA,
  }

  const errVals = validate(rules, req.body)

  if (errVals.length !== 0) {
    res.status(400)
    res.json({
      status: 'ERROR',
      context: errVals,
    })
    return
  }

  try {
    const token = saveForConfirm(req.body, 20)

    const { email } = req.body

    // TODO: send Email

    res.status(200)
    res.json({
      status: 'OK',
    })
  } catch (ex) {
    res.status(500)
    res.json({
      status: 'ERROR',
      context: ex,
    })
  }
})

app.post('/anmeldung/ma/veranstaltung', (req, res) => {
  const rules = {
    vorname: ruleLib.vorname,
    nachname: ruleLib.nachname,
    geschlecht: ruleLib.geschlecht,
    gebDat: ruleLib.gebDat,
    strasse: ruleLib.strasse,
    plzOrt: {
      plz: ruleLib.plz,
      ort: ruleLib.ort,
    },
    email: ruleLib.email,
    datenschutz: ruleLib.datenschutz,
    telefon: ruleLib.telefon,
    lebensmittelallergien: ruleLib.textArea250,
    bemerkungen: ruleLib.textArea250,
  }

  const errVals = validate(rules, req.body)

  if (errVals.length !== 0) {
    res.status(400)
    res.json({
      status: 'ERROR',
      context: errVals,
    })
    return
  }

  try {
    const token = saveForConfirm(req.body, 10)

    const { email } = req.body

    // TODO: send Email

    res.status(200)
    res.json({
      status: 'OK',
    })
  } catch (ex) {
    res.status(500)
    res.json({
      status: 'ERROR',
      context: ex,
    })
  }
})
app.post('/anmeldung/tn', (req, res) => {
  const rules = {
    vorname: ruleLib.vorname,
    nachname: ruleLib.nachname,
    geschlecht: ruleLib.geschlecht,
    gebDat: ruleLib.gebDat,
    strasse: ruleLib.strasse,
    plzOrt: {
      plz: ruleLib.plz,
      ort: ruleLib.ort,
    },
    email: ruleLib.email,
    telefon: ruleLib.telefon,
    bemerkungen: ruleLib.textArea250,
    lebensmittelallergien: ruleLib.textArea250,
    gesundheit: ruleLib.textArea250,
    datenschutz: ruleLib.datenschutz,
    freizeitLeitung: ruleLib.checkboxRequired,
    tnBedingungen: ruleLib.tnBedingungen,
  }

  const errVals = validate(rules, req.body)

  if (errVals.length !== 0) {
    res.status(400)
    res.json({
      status: 'ERROR',
      context: errVals,
    })
    return
  }

  try {
    const token = saveForConfirm(req.body, 1)

    const { email } = req.body

    // TODO: send Email

    res.status(200)
    res.json({
      status: 'OK',
    })
  } catch (ex) {
    res.status(500)
    res.json({
      status: 'ERROR',
      context: ex,
    })
  }
})
app.post('/confirm/:token', (req, res) => {
  const token = req.params.token

  try {
    const data = validateToken(token)

    const type = data.__internals.type

    if (type === 1) {
      // TN Anmeldung

      // TODO: Send to other API

      res.status(200)
      res.json({
        status: 'OK',
      })
      return
    }

    if (type === 10) {
      // MA Anmeldung

      // TODO: Send to other API

      res.status(200)
      res.json({
        status: 'OK',
      })
      return
    }

    if (type === 20) {
      // MA Ort Anmeldung Mail confirm

      data.__internals.type = 21
      data.__internals.expires = 'NEVER'

      const token = saveForConfirm(data, -1)

      // TODO: Email an Verantwortlichen

      res.status(200)
      res.json({
        status: 'OK',
      })
      return
    }

    if (type === 21) {
      // MA Ort Anmeldung Verantwortlicher confirm

      // TODO: Send to other API
      res.status(200)
      res.json({
        status: 'OK',
      })
      return
    }
  } catch (ex) {
    res.status(500)
    res.json({
      status: 'ERROR',
      context: ex,
    })
  }
})

cleanup()

setInterval(cleanup, 1000*60*59)

export default app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
