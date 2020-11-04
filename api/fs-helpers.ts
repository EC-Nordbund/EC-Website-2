import * as fs from 'fs'
import * as path from 'path'
import { sha3_512 as sha } from 'js-sha3';

const ANMELDUNG_SAVE_DIR = '../confirm'
export function cleanup() {
  fs.readdirSync(path.join(__dirname, ANMELDUNG_SAVE_DIR)).forEach(file => {
    if (file === '.gitkeep') { return }

    const exp = JSON.parse(fs.readFileSync(path.join(__dirname, ANMELDUNG_SAVE_DIR, file), 'utf-8')).__internals.expires;
    if (expired(exp)) {
      fs.unlinkSync(path.join(__dirname, ANMELDUNG_SAVE_DIR, file));
    }
  });
}
export function saveForConfirm(data: any, type: number): string {
  if (!data.__internals) {
    data.__internals = {
      time: new Date(),
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
      type,
    };
  }

  if (typeof data.__internals.expires !== 'string') {
    data.__internals.expires = data.__internals.expires.toISOString()
  }

  const json = JSON.stringify(data);
  const token = sha(json + new Date() + Math.random());
  const filename = path.join(__dirname, ANMELDUNG_SAVE_DIR, token + '.json');
  if (fs.existsSync(filename)) {
    return saveForConfirm(data, type);
  }
  fs.writeFileSync(filename, json);
  return token;
}
export function validateToken(token: string): any {
  const filename = path.join(__dirname, ANMELDUNG_SAVE_DIR, token + '.json');
  console.log(filename)
  if (!fs.existsSync(filename)) {
    throw 'Token not found';
  }
  const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
  fs.unlinkSync(filename);
  return data;
}

function expired(time: string) {
  if (time === 'NEVER') {
    return false
  }
  return new Date().toUTCString() > time
}
