const User = require('../modal/users');
const mongoose = require('mongoose');
exports.user_get = (req, res, next) => {
    const id = req.param.userId;
    User.find()
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                users: doc.map(doc => {
                    return {
                        name: doc.name,
                        age: doc.age,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/user/' + doc._id
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
exports.user_getById = (req, res, next) => {
    let id = req.params.idUser;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From Db", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'no valis entery found for provided id'
                });
            }
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.user_PatchById = (req, res, next) => {
    const id = req.params.userId;
    const updtaeUser = {};
    for (const user of req.body) {
        updtaeUser[user.userName] = user.value;
    }
    User.update({ _id: id }, { $set: updtaeUser })
        .exec()
        .then(resualt => {
            console.log(resualt);
            res.status(200).json(resualt);
        })
};
exports.user_deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(resualt => {
            res.status(200).json(resualt);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};
exports.user_createUser = (req, res, next) => {
    const userDetails = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    });
    userDetails.save()
        .then(resualt => {
            console.log(resualt);
            res.status(201).json({
                message: 'post users',
                userDetails: userDetails

            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};