const express = require('express');
const passport = require('passport');
const router = express.Router();
const postsApi=require('../../../controllers/api/v1/posts_api');
//post geeting delete

router.get('/',postsApi.index);
router.get('/:id',passport.authenticate('jwt', {session: false}),postsApi.destroy);
module.exports=router;