import express from 'express'
import { json } from 'body-parser'
import { sha3_512 as sha } from 'js-sha3'
import * as fs from 'fs'
import * as path from 'path'
import { ruleLib } from '../plugins/validateLib'

const ANMELDUNG_SAVE_DIR = '../confirm'

const app = express()

app.use(json())

function saveForConfirm(data: any, type: number): string {
  if (!data.__internals) {
    data.__internals = {
      time: new Date(),
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      type,
    }
  }

  const json = JSON.stringify(data)
  const token = sha(json + new Date() + Math.random())

  const filename = path.join(__dirname, ANMELDUNG_SAVE_DIR, token + '.json')

  if (fs.existsSync(filename)) {
    return saveForConfirm(data, type)
  }

  fs.writeFileSync(filename, json)

  return token
}

function validateToken(token: string): any {
  const filename = path.join(__dirname, ANMELDUNG_SAVE_DIR, token + '.json')

  if (!fs.existsSync(filename)) {
    throw 'Token not found'
  }

  const data = JSON.parse(fs.readFileSync(filename, 'utf-8'))

  fs.unlinkSync(filename)

  return data
}

function validate(rules: any, data: any) {
  const errors: string[] = []

  Object.keys(rules).forEach((key) => {
    if (Array.isArray(rules[key])) {
      errors.push(
        ...((rules[key] as Array<any>)
          .map((rule: (v: any) => true | string) => rule(data[key]))
          .filter((v) => v !== true) as Array<string>)
      )
    } else if (typeof rules[key] === 'object') {
      if (!data[key]) {
        errors.push('Benötigte Angaben fehlen!')
      } else {
        errors.push(...validate(rules[key], data[key]))
      }
    } else {
      const err = rules[key](data[key])

      if (err !== true) {
        errors.push(err)
      }
    }
  })

  return errors
}

function cleanup() {
  fs.readdirSync(path.join(__dirname, ANMELDUNG_SAVE_DIR)).forEach(file => {
    const exp = JSON.parse(fs.readFileSync(path.join(__dirname, ANMELDUNG_SAVE_DIR, file), 'utf-8')).__internals.expires

    if(expired(exp)) {
      fs.unlinkSync(path.join(__dirname, ANMELDUNG_SAVE_DIR, file))
    }
  })
}

function expired(time: string) {
  if(time === 'NEVER') {
    return false
  }

  const regex = /[-:T]/

  const now = new Date().toString().split(regex)
  const old = time.split(regex)

  for (let i = 0; i < 5; i++) {
    const a = parseInt(now[i])
    const b = parseInt(old[i])

    if (a > b) {
      return true
    }

    if (b < a) {
      return false
    }
  }

  return true
}

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
