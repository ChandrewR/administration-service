/**
* @name Administration
* @summary Administration Hydra Express service entry point
* @description Manages users and data and other administartion activities
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
const mongoose = require('mongoose');

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config-1.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {

      mongoose.connect(config.dburl,{ useNewUrlParser: true });
      var db = mongoose.connection;
        db.on('error', function (err) {
          console.log('Failed to connect to database');
          process.exit(1);
        });
      
        db.once('open', function () {
          console.log("Connected to database");
        });

      hydraExpress.registerRoutes({
        '/administrationapi/v1': require('./routes/administration-v1-routes')
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
