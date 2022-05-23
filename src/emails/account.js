const sgMail = require('@sendGrid/mail');




sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ypvinayreddy@gmail.com',
        subject: 'this is email from vinay reddy',
        text: 'Welcome to the vinay desctibing chebalagudu beach',
        html: `welcome to the app, ${name}, have a great time`
 
 
    })
} 

const sendCancelationEmail = (email, name) => {
       sgMail.send({
           to:email,
           from: 'ypvinayreddy@gmail.com',
           subject: 'Sorry to see you g0!',
           text: `Goodbye,${name}, I hope to see you back sometime soon`
       })
}
module.exports = {
    sendWelcomeEmail
}
