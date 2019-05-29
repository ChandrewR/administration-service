var express = require('express');
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('../models/user');
const nodemailer = require('nodemailer');
/* var adduserapp = express();

var bodyParser  = require('body-parser');
adduserapp.use(bodyParser.urlencoded({ extended: false }));
adduserapp.use(bodyParser.json()); */

exports.test = function(req, res) {
  res.json({
      message: 'add user test api is up!'
  });
}

exports.deleteUser = function(req, res) {

  try {
    User.deleteOne({ _id: req.query._id }).then(result => {
      /* res.json({
        success : true,
        _id : req.query._id
      }); */
      res.sendOk({
        success : true,
        _id : req.query._id
      });
    });
  } catch(e) {
    res.sendError({
      success : false,
      _id : null
    });
  }
  
}

exports.getUsers = function(req, res) {

  try {
    User.find().then(data => {
      console.log(data);
      /* res.status(201).json({
        message : "Fetched users successfully",
        userrole : data
      }); */
  
      res.sendOk({
        message : "Fetched users successfully",
        userrole : data
      });
    });
  } catch(e) {
    res.sendError({
      message : "Failed",
      userrole : null
    });
  }
  
}

exports.getUserDetails = function(req, res) {

  try {
    User.find().then(data => {
      console.log(data);
      /* res.status(201).json({
        message : "Fetched users successfully",
        userrole : data
      }); */
  
      res.sendOk({
        message : "Fetched users successfully",
        userrole : data
      });
    });
  } catch(e) {
    res.sendError({
      message : "Failed",
      userrole : null
    });
  }
  
}

exports.sendemail = function(req, res) {

  // Create a SMTP transporter object
  console.log("===<<<>>>>><>>><<"+req.body.subject);
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lexie.auer25@ethereal.email',
        pass: 'CwMPS1S1w3aTpxPR59'
    }
});

// Message object
let message = {
    from: 'Lexie Auer <lexie.auer25@ethereal.email>',
    to: req.body.toemail,
    subject: req.body.subject,
    text: 'Hello to myself!',
    html: '<p><b>'+req.body.subject+'</b>'
};

transporter.sendMail(message, (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.sendOk({ 
      success: true,
      message : 'Successfully sent!'
     });
});

}
 
exports.adduser = function(req, res) {

  try {
    var user = new User({ 
      associateID: req.body.associateID,
      role: req.body.role
    });
  
    user.save().then(result => {
        /* res.status(201).json({ 
          success: true,
          message : 'Successfully saved!',
          _id : result._id
         }); */
  
         res.sendOk({ 
          success: true,
          message : 'Successfully saved!',
          _id : result._id
         });
      });
  } catch(e) {
    res.sendError({ 
      success: false,
      message : 'Failed',
      _id : null
     });
  }

  
} 