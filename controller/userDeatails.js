const UserAdress = require('../modal/UserAdress');
const User = require('../modal/users');
const mongoose = require('mongoose');
exports.userDetails_getAllUsers = (req, res, next) => {
    const id = req.param.userId;
    UserAdress.find()
        .populate('user')
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                users: doc.map(doc => {
                    return {
                        adress: doc.adress,
                        user: doc.user,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/userDetails/' + doc._id
                        }
                    }
                })
            };
            console.log(doc);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.userDetails_createDetails = (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'user no found'
                });
            }
            const userAdrees = new UserAdress({
                _id: mongoose.Types.ObjectId(),
                adress: req.body.adress,
                user: req.body.userId
            });
            return userAdrees.save();

        })
        .then(resualt => {
            console.log(resualt);
            res.status(201).json(resualt);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};