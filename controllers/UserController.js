const {ObjectId} = require('mongoose').Types;
const User = require('./../models/User');
const _ = require('lodash');

class UserController {
    constructor() {
    };

    static getMe(req, res) {
      res.send(req.user);
    }

    static getOne(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        User.findById(id).then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    static getAll(req, res) {
        User.find({}, (err, users) => {
            if (err) {
                return res.send(err);
            }
            return res.send(users);
        })
    };

    static add(req, res) {
        const newUser = new User(req.body);

        newUser.save().then(() => {
            return newUser.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(newUser);
        }).catch((e) => {
            res.status(400).send(e);
        })
    };


    static update(req, res) {
        const id = req.params.id;
        const body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'city', 'street']);

        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }
        User.findByIdAndUpdate(id, {
            $set: body
        }, {new: true}).then((user) => {
            if (!user) {
                res.status(404).send();
            }

            res.send({user});

        }).catch((e) => {
            res.status(404).send(e);
        })
    };

    static removeOne(req, res) {
        let id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        User.findByIdAndRemove(id).then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };
}

module.exports = UserController;
