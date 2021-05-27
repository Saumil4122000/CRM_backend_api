const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'manley.welch13@ethereal.email',
        pass: 'pG5jenf3JYxhUPNshy'
    }
});
const send = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            // send mail with defined transport object
            let result = await transporter.sendMail(info);
            console.log("Message sent: %s", result.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            resolve(result)

        } catch (error) {
            console.log(error)
        }
    })

}





const mailProcessor = ({email, pin, type}) => {
    let info=' ';
    switch (type) {
        case "request-new-pass":
          info = {
                from: '"CRM SYSTEM" <gabe.legros@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "password Reset Pin", // Subject line
                text: "Here is your passwod reset pin: " + pin + " pin will be valid only 1day", // plain text body
                html: `<b>Hello</b>
                Here is your pin
                <b>${pin}</b>
                This pin well expire in 1 day
                <p></p>  `// html body

            }
            send(info)

            break;

        case "password-update-success":

          info = {
                from: '"CRM SYSTEM" <gabe.legros@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "password Updated", // Subject line
                text: "Your new Password has been updated", // plain text body
                html: `<b>Hello</b>
                <p></p>  `// html body

            }
            send(info)

            break;

    }


}



module.exports = {
    mailProcessor
}