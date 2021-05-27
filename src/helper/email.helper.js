const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'candido.kris@ethereal.email',
        pass: 'TAeBhf5UzDrQdvWCAB'
    }
});
const send = (info) => {
    return new Promise(async(resolve, reject) => {
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





const mailProcessor = (email, pin) => {
    const info = {
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
}



module.exports={
    mailProcessor
}