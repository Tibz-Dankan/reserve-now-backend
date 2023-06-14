const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class Auth {
  user;
  statusCode;
  res;
  token;
  expirationTime;
  expiresIn;

  signToken(id) {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign({ id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN_HOURS,
    });
  }

  constructor(user, statusCode, res) {
    const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN_HOURS);

    this.user = user;
    this.statusCode = statusCode;
    this.res = res;
    this.token = this.signToken(user.id);
    this.expirationTime = new Date(
      Date.now() + JWT_EXPIRES_IN * 60 * 60 * 1000
    );
    this.expiresIn = JWT_EXPIRES_IN * 60 * 60 * 1000;
    this.user.password = undefined;
  }

  async send() {
    return this.res.status(this.statusCode).json({
      status: "success",
      token: this.token,
      expiresIn: this.expiresIn,
      expirationTime: this.expirationTime,
      user: this.user,
    });
  }
}

module.exports = { Auth };
