// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const fs = require('fs')
const accountSid = 'ACee26ec3a039ce63f25f8181675a5a605';
const authToken = 'c3590d1874e7086b4e45dc344a348ed7';
const client = require('twilio')(accountSid, authToken);
const { randnum, randcountry } = require('./shortcut')

const from = '+16149082863'

// const body = `
//   New login of your Amazon account from ${randcountry()}
// `

const delay = 3

let list = []

process.on('unhandledRejection', (reason, p) => {
  error(`Unhandled Rejection at`);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

async function sendSMS(body, from, to, i, length) {
  try {
    const run = await client.messages.create({ body, from, to })
    console.log(`[${i+1}/${length}] Sukses mengirim ke ${run.to}`)
  } catch(e) {
    console.log(`[${i+1}/${length}] Gagal mengirim ${e}`)
  }
}

fs.open('list.txt', 'r', function (err, file) {
  if (err) throw err;
  // baca file
  fs.readFile(file, (err, data) => {
      if (err) throw err;
      let payload = data.toString()

      list = payload.split('\n')
      startSend()
  });
});

async function startSend() {
  for (let i in list) {
    let body = `
     Your Amazon sign code is : #${randnum(6)}. Your code expires in 10 minutes. If it's not you, recover your account, visit this link "https://smarturl.it/account_recovery"                                                  Amazon Service Assistant
    `
    sendSMS(body, from, list[i], parseFloat(i), list.length)
    await sleep(1000)
  }
}

