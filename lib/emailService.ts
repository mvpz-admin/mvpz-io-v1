import { createTransport } from "nodemailer"

const SERVER = process.env.EMAIL_SERVER || "smtp://team@mvpz.io:131SportzTeamz@smtp.zoho.eu:587"
const FROM_ADDRESS = process.env.FROM_ADDRESS || "team@mvpz.io"

export function sendCustomVerificationRequest ({emailAddress, otp, server=SERVER, fromAddress = FROM_ADDRESS}){
    return new Promise((resolve,reject) => {
      // const { host } = new URL(url)
      // NOTE: You are not required to use `nodemailer`, use whatever you want.
      const transport = createTransport(server)
      const htmlText = html({ otp, emailAddress })
      // console.log(htmlText)
      transport.sendMail({
          to: emailAddress,
          from: `MVPz<${fromAddress}>`,
          subject: `Sign in to Mvpz`,
          // text: text({ url, host }),
          html: htmlText,
      }, function(error, info){
        if(error){
          console.log(error)
          reject(error)
        }else{
          resolve(true)
        }      
      })
    })    
}

function html(params: { otp: string, emailAddress: string, }) {
    const { otp, emailAddress } = params
  

  return   `<body style="font-family: 'Arial', sans-serif; background-color: #1a1a1a; color: #ffffff; margin: 0; padding: 0;">
  <div style="max-width: 600px; height: 800px; margin: 40px auto; background: #000000; text-align: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
    <div style="margin-bottom: 30px;">
      <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/main-bg.png" alt="MVPz Logo" style="width: 100%; height: 200px; object-fit: cover;">
    </div>
    <div style="width: 100%; padding-bottom: 20px;">
      <div style="margin-bottom: 20px; width: 575px; margin: 0px auto; text-align: center;">
        <h1 style="color: #854df2;">Welcome Back!</h1>
        <h4 style="color: #ffffff;">Hey, User</h4>
        <p style="color: #ffffff;">
          We're excited to have you! Use the button below to securely sign into MVPz as <span style="color: #007bff; opacity: 0.8;">${emailAddress}</span>.
          For your security, this link will expire in 15 minutes.
        </p>
${otp}
      </div>
      <p style="font-size: 16px; color: #ffffff; margin-bottom: 20px; line-height: 20px;">
        Need assistance? Contact us at<br>
        <a href="mailto:team@mvpz.io" style="color: #007bff; text-decoration: none;">team@mvpz.io</a>.
      </p>
      <hr style="border: 0; height: 1px; background-color: #e9ecef; margin: 20px auto; opacity: 0.2; width: 500px;">
      <p style="font-size: 14px; color: #495057; width:500px; margin:0 auto">
        <strong style"padding-bottom:20px">Why MVPz?</strong><br>
        MVPz is a platform designed to help athletes like you monetize your fanbase, build a community, and grow your influence. We're here to empower you every step of the way.
      </p>
<!--       <p style="font-size: 14px; color: #6c757d; margin-top: 30px;">MVPz</p> -->
      <img src="https://mvpz-src-public.s3.us-east-005.backblazeb2.com/images/mvpz-transparent-logo.png" alt="MVPz Logo"  style="object-fit:contain;width:50px;height:50px ;margin-top: 20px;margin-bottom:0">
      <p style="font-size: 12px; color: #adb5bd; ">Built in the USA</p>
      <p style="font-size: 12px; color: #adb5bd; ;">
        If you did not request this email, please ignore it or contact our support team.
      </p>
<!--       <div style="margin-bottom: 20px; width: 575px; margin: 0px auto; text-align: center;">
        <p style="margin: 0;">MVPz</p>
        <p style="margin: 0;">Built in USA</p>
      </div> -->
    </div>
  </div>
</body>
`
  }
  
  /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
  function text({ url, host }: { url: string, host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
  }

  export function sendEmail({emailAddress, subject, bodyHtml}){
    return new Promise((resolve,reject) => {
      const transport = createTransport(SERVER)
      transport.sendMail({
          to: emailAddress,
          from: `MVPz<${FROM_ADDRESS}>`,
          subject,
          text: bodyHtml,
          html: bodyHtml,
      }, function(error, info){
        if(error){
          console.log(error)
          reject(error)
        }else{
          resolve(true)
        }      
      })
    })
  }