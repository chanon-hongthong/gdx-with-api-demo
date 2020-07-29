const express = require('express');
const router = express.Router();
const axios = require('axios');
const { check } = require('express-validator');
const userControllers = require('./../controllers/users-controller');
//const dummy = require('./../Data/DummyData');

// router.get('/api/login', function(req, res) {
//   axios.get('http://203.157.35.249/webservices?login_user=chanon.h&value=chanon00&chksum=7cebd0a4d2998249b56e3499f00b9068')
//     .then(response => {
//       res.json(response.data);
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   });

router.get('/api/getuser', (req, res, next) => {
  console.log('GET Request in User');
  res.json({message: 'Get Users works!'});
});

router.get('/api/user/get/:uid', userControllers.getUserById);
router.get('/api/user/getbypid/:pid', userControllers.getUserByIdentification);

router.post('/api/user/create', userControllers.createUser);
router.post('/api/user/checkexistByIdentification', userControllers.checkexistByIdentification);

router.patch('/api/user/update/:uid', userControllers.updateUserById);

router.delete('/api/user/delete/:uid', userControllers.deleteUserById);
module.exports = router;