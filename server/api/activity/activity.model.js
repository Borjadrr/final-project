'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitiesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: false
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  image: {
        type: String, default: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250'
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Activities', activitiesSchema);
