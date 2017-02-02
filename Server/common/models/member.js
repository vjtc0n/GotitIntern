'use strict'

var loopback = require('loopback');

module.exports = function(Member) {
  var app = require('../../server/server');
  delete Member.validations.username;
};
