const _ = require('lodash');
mongoose = require('mongoose');
activityModel = require('./activity.model');


exports.createActivity = function(req, res, next) {
	const newActivity = new activityModel({
		title: req.body.title,
		type: req.body.type,
		city: req.body.city,
		description: req.body.description
	});

	newActivity.save(function(err, activity) {
		if(err) {
            console.log(err);
			return res.send(500);
		}
		res.json({message:"bieeeen"});
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
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  activityModel.findById(req.params.id, (err, activityModel) => {
      if (err) {
        return res.send(err);
      }

      return res.json(activityModel);
    });
};

exports.editActivity = function(req, res ,next) {
	const activityId = req.params.id;

	activityModel
		.findByIdAndUpdate(activityId, { $set: req.body }, function(err, activity) {
			if(err) {
				return res.status(400).json({ message: 'Unable to update activity', error: err });
			}

			res.json({ message: 'activity successfully updated', activity: activity });
		});
};

exports.removeActivity = function (req, res) {
    activityModel
        .findByIdAndRemove(req.params.id, function(err) {
            if (err) {
            	res.json({ message: 'impossible to remove the activity', error: err });
            }

            res.json({ message: 'activity removed successfully' });
        });
};
