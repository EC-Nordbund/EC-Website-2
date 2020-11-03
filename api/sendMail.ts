import { createTransport, createTestAccount, getTestMessageUrl } from "nodemailer";


let transport: ReturnType<typeof createTransport> | null = null

export const sendMail: ReturnType<typeof createTransport>['sendMail'] = async (...args: any[]) => {
  if (!transport) {
    const testAccount = await createTestAccount()
    transport = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })
  }

  const info = await (transport.sendMail as any)(...args)

  console.log(getTestMessageUrl(info))

  return info
}