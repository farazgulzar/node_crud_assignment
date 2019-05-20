'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const User = new Schema({
  author: ObjectId,
  first_name: String,
  last_name: String,
});

module.exports = mongoose.model('User', User)