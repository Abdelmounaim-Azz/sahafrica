import * as nodemailer from 'nodemailer'; 

export class GMailService { 
  private _transporter: nodemailer.Transporter; 
  constructor() { 
    this._transporter = nodemailer.createTransport( 
      `smtps://azz.sahafrica%40gmail.com:${process.env.GMAIL_APP_PASSWORD!}@smtp.gmail.com` 
    ); 
  } 
  sendMail(to: string, subject: string, content: string) 
  : Promise<void> 
  { 
    let options = { 
      from: 'azz.sahafrica@gmail.com', 
      to: to, 
      subject: subject, 
      text: content 
    } 

    return new Promise<void> ( 
      (resolve: (msg: any) => void,  
        reject: (err: Error) => void) => { 
          this._transporter.sendMail(  
            options, (error, info) => { 
              if (error) { 
                reject(error); 
              } else { 
                  resolve(`Message Sent  
                    ${info.response}`); 
              } 
          }) 
        } 
    ); 
  } 

}
