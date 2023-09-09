const express = require('express');
const router = express.Router();
const postsApi=require('../../../controllers/api/v1/users_api');

router.get('/createsession',postsApi.createSession);

module.exports=router;