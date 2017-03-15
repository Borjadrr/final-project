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
        type: String, default: 'http://photos1.meetupstatic.com/photos/event/1/e/f/2/event_192127922.jpeg'
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Activities', activitiesSchema);
