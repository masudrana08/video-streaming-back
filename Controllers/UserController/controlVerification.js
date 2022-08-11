const UserModel = require("../../Models/UserModel");
const sendMail = require("../../Utilities/sendMail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ============ Send Verification ============ //
const controlSendVerification = (req, res) => {
  const randArr = [];
  for (let i = 0; i < 6; i++) {
    randArr.push(Math.floor(Math.random() * 10));
  }
  const verificationNumber = randArr.join("");
  const { email, isVerified } = req.user;
  sendMail({
    to: email,
    subject: "Check Your Verification Code",
    text: "Your verification code is: " + verificationNumber,
    html: `<html>Your verification code is: <b>${verificationNumber}</b></html>`,
  })
    .then((result) => {
      UserModel.findOne({ username: req.user.username }).then((dbres) => {
        const salt = bcrypt.genSaltSync(10);
        const pinHash = bcrypt.hashSync(verificationNumber, salt);
        dbres.tempPinHash = pinHash;
        dbres.save();
        setTimeout(() => {
          dbres.tempPinHash = "";
          dbres.save();
        }, 1000 * 300);
      });
      res.send(
        JSON.stringify({
          status: "ok",
          data: "Don't forget to check Spam folder.",
        })
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(JSON.stringify({ status: "error", data: "Something Wrong" }));
    });
};

// ============ Confirm Verification ============ //
const controlConfirmVerificaiton = (req, res) => {
  const { pin } = req.body;
  UserModel.findOne({ username: req.user.username }).then((dbres) => {
    const isPinMatch = bcrypt.compareSync(pin, dbres.tempPinHash);
    if (isPinMatch) {
      dbres.isVerified = isPinMatch;
      dbres.save().then((result) => {
        console.log(result);
        const { _id, name, email, username } = dbres;
        const KEY = process.env.JWT_PRIVATE;
        const token = jwt.sign(
          { id: _id, isVerified: isPinMatch, name, email, username },
          KEY
        );
        res.send(
          JSON.stringify({
            status: "ok",
            data: token,
          })
        );
      });
    }
  });
};
module.exports = { 
  controlSendVerification,
  controlConfirmVerificaiton 
};
