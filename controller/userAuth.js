const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserAuth = require("../modal/userAuth");
exports.userAuth_Sign = (req, res, next) => {
    UserAuth.find({ email: req.body.email })
        .exec()
        .then(User => {
            if (User.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const User = new UserAuth({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        User
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "UserAuth created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};
exports.UserAuth_DeleteUser = (req, res, next) => {
    UserAuth.remove({ _id: req.params.UserAuthId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "UserAuth deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.UserAuth_Login = (req, res, next) => {
    UserAuth.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },

                        "security",
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.UserAuth_getAllUsers = (req, res, next) => {
    UserAuth.find()
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                users: doc.map(doc => {
                    return {
                        email: doc.email,
                        password: doc.password,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/userAuth/' + doc._id
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