const path = require("path");
const pug = require("pug");
const SGmail = require("@sendgrid/mail");

class Email {
  from;
  recipients;
  subject;
  constructor(recipients, subject) {
    SGmail.setApiKey(process.env.SEND_GRID_API_KEY);

    this.from = "cryptopile20@gmail.com";
    this.recipients = recipients;
    this.subject = subject;
  }

  async sendHtml(html, subject) {
    const mailOptions = {
      to: this.recipients,
      from: { email: this.from, name: "Reserve Now" },
      subject: subject,
      html: html,
    };
    try {
      console.log("sending mail");
      await SGmail.send(mailOptions);
      console.log("mail sent");
    } catch (error) {
      console.log("error sending email", error);
    }
  }

  async sendWelcome(username) {
    const html = pug.renderFile(
      path.join(__dirname, "../views/email/welcome.pug"),
      {
        subject: this.subject,
        userName: username,
      }
    );
    await this.sendHtml(html, "Welcome to LetsChat ");
  }

  async sendPasswordReset(url, username) {
    console.log("Password reset url: ", url);

    const html = pug.renderFile(
      path.join(__dirname, "../views/email/resetPassword.pug"),
      {
        subject: "Password Reset",
        userName: username,
        resetURL: url,
      }
    );
    await this.sendHtml(html, "Reset Password");
  }

  async sendContactUs(name, message, email, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "../views/email/contactUs.pug"),
      {
        subject: "Contact Us Message",
        name: name,
        message: message,
        email: email,
        contactSubject: subject,
      }
    );
    await this.sendHtml(html, "Contact Us Message");
  }

  async sendBookingNotification(username, roomNumber) {
    const html = pug.renderFile(
      path.join(__dirname, "../views/email/bookingNotification.pug"),
      {
        subject: "Booking Received",
        userName: username,
        roomNumber: roomNumber,
      }
    );
    await this.sendHtml(html, "Booking Received");
  }
}

module.exports = { Email };
