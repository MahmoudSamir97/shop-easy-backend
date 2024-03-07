const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mahmoudalymekky97@gmail.com',
    pass: 'geuw ahql zjez wbkw',
  },
});
const sendeEmailFun = async (templateUsed, email, link, userName) => {
  try {
    const mailOptions = {
      from: 'mahmoudalymekky97@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      html: templateUsed(link, userName),
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

module.exports = sendeEmailFun;
