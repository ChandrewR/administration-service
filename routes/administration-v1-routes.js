/**
 * @name administration-v1-api
 * @description This module packages the Administration API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
var usercontroller = require('../controllers/usercontroller');
var checkAuth   = require('../middleware/check-auth');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.get('/',
(req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
});

api.get('/getusers', checkAuth.authenticate, usercontroller.getUsers);
api.get('/getuserdetails', usercontroller.getUserDetails);
api.post('/adduser', checkAuth.authenticate, usercontroller.adduser);
api.post('/sendemail', checkAuth.authenticate, usercontroller.sendemail);
api.delete('/deleteuser', checkAuth.authenticate, usercontroller.deleteUser);

module.exports = api;
