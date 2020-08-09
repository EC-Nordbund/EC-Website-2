export async function get<T = {}>(url: string):Promise<T> {
  let fetch:Window['fetch']

  if(process.server) {
    fetch = require('node-fetch')
  } else {
    fetch = window.fetch
  }

  const res = await fetch(url)
  const json = await res.json()

  return json
}

export async function post<T = {}>(url: string, data: any): Promise<T> {
  let fetch:Window['fetch']

  if(process.server) {
    fetch = require('node-fetch')
  } else {
    fetch = window.fetch
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  return res.json();
}
