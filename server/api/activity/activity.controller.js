const _ = require('lodash');
mongoose = require('mongoose');
const express = require("express");
const authController = express.Router();
activityModel = require('./activity.model');
userModel = require('../user/user.model');
const upload = require('../../configs/multer');


exports.createActivity = (req, res) => {
    console.log("entra en createActivity", req.file);
    const newActivity = new activityModel({
        title: req.body.title,
        type: req.body.type,
        city: req.body.city,
        description: req.body.description,
        image: `${req.file.filename}`
    });
    newActivity.save((err) => {
        if (err) {
          console.log("ERROR:",err);
          return res.send(err);

        }

        return res.status(200).json({
          message: 'New Event created!',
          newActivity: newActivity
        });
      });
    };




exports.showActivities = function(req, res, next) {
    activityModel.find({})
        .exec((err, activityModel) => {
            if (err) {
                return res.send(err);
            }
            return res.json(activityModel);
        });
};

exports.showActivity = function(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Specified id is not valid'
        });
    }

    activityModel.findById(req.params.id)
    .populate('participants')
    .then((activity) => res.status(200).json(activity))
    .catch((error) => res.status(500).json({message:"Error getting activity"}));
};

exports.addParticipants = function(req, res) {
    const activityId = req.params.id;
    console.log("ihhi",req.body);
    activityModel.findById(activityId)
    .then((activity) => {
      console.log(activity.participants);
      if(activity.participants.indexOf(req.body._id) == -1){
        return activityModel.findByIdAndUpdate(activityId, {
    		        $push: {
    		            participants: req.body._id
    		        }
    		});
      } else {
        throw 'User is already in this activity';
      }
    })
		.then((result) => {
			console.log("done!");
			res.status(200).json({message:"Paticipant added to activity"});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({message:"Error adding participant", error:err});
		});
};


exports.editActivity = function(req, res, next) {
    const activityId = req.params.id;

    activityModel
        .findByIdAndUpdate(activityId, {
            $set: req.body
        })
				.then((activity) =>{
					res.status(200).json({
              message: 'activity successfully updated',
              activity: activity
          });
				})
				.catch((err) => {
					res.status(400).json({
              message: 'Unable to update activity',
              error: err
          });
				});
};

exports.removeActivity = function(req, res) {
    activityModel
        .findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    message: 'impossible to remove the activity',
                    error: err
                });
            }

            res.json({
                message: 'activity removed successfully'
            });
        });
};
