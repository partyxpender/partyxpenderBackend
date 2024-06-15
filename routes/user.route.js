const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

router.post('/user/signup', user.signup);
router.post('/user/login', user.login);
router.post('/user/bio_login', user.bioMetricLogin);
router.post('/user/otp', user.resendOtp);
router.post('/user/verify_otp', user.verifyOTP);
router.post('/user/reset_password', user.resetPassword);
router.post('/user/balance', user.getBalance);
router.post('/user', user.getUser);
// router.post('/user/notification', user.notification);
router.patch('/user', user.updateProfile);
router.delete('/user', user.deleteAccount);
router.post('/user/profile_picture', user.addImageURL);
router.post('/user/topup', user.topup);


module.exports = router;