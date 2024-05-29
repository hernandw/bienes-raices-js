import nodemailer from "nodemailer";
process.loadEnvFile()

const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT, FRONTEND_URL, PORT } = process.env

export const sendEmail = async(datos)=>{
    const transport = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }

        
      });

      const { name, email, token } = datos
      await transport.sendMail({
        from: "Bienes Raices",
        to: email,
        subject: "Comprueba tu cuenta en Bienes Raices",
        text: "Comprueba tu cuenta en Bienes Raices",
        html: `<p>Hola ${name}, comprueba tu cuenta en Bienes Raices.</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${FRONTEND_URL}:${PORT}/confirmar/${token}">Comprobar cuenta</a></p>   
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
      })
}