const User = require('../models/user');

exports.getUsers = async(req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({allUsers: users});;

    } catch(error) {
        console.log('Get users is failing '+ JSON.stringify(error));
        res.status(500).json({ error: error});
    }
};

exports.postUser = async (req, res, next) => {
    try {
        console.log('inside post');
        if(!req.body.phoneNumber) {
            throw new Error('phone number is mandatory');
        }
        const name = req.body.name;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;

        const data = await User.create( {name: name, email: email, phoneNumber: phoneNumber});
        res.status(201).json({newUserDetail: data});
    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
};

exports.deleteUser = async(req, res, next) => {
    try {
        console.log('inside delete');
        if(req.params.id == 'undefined') {
            console.log('Id is missing');
            return res.status(404).json({err: 'Id is missing'});
        }
        const userId = req.params.id;
        await User.destroy({where: {id: userId}});
        res.sendStatus(200);
    } catch(error) {
        console.log('Delete user is failing '+ JSON.stringify(error));
        res.status(500).json({ error: error});
    }
};