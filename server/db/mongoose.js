const mongoose = require('mongoose');
const keys = require('./../key');
const User = require('../models/userSchema');

exports.connect = function(){
    return mongoose.connect(keys.DB_URI,{ useNewUrlParser: true })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log('DB Connection failed!,'+err));
}

// const createUser = async(req, res, next) => {
//     const createUser = new User({
//         identification_number: req.body.identification_number,
//         birthdate: req.body.birthdate
//     });
//     const result = await createUser.save();
//     res.json(result);
// };

// const getUsers = async (req, res, next) => {
//     const users = await User.find().exec();
//     res.json(users);
// }
// exports.createUser = createUser;
// exports.getUsers = getUsers;
