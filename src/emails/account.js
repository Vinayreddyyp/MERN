const sgMail = require('@sendGrid/mail');


const sendGridApiKey = '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';

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
to: email,
from: 'ypvinayreddy@gmail.com',
 subject: 'this is email from vinay reddy',
 text: 'Welcome to the vinay desctibing chebalagudu beach',
 
    })
}
