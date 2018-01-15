const express = require('express');
const router = express.Router();
const gitlab = require('../config/gitlab');
const authenticate = require('../middleware/expressJwtAuth');

router.get('/tree/:id', function (req, res) {
  console.log('EST');
  //Initialize Repo in Gitlab
  gitlab.projects.repository.tree(req.params.id, {recursive: true}).then(t => {
    res.status(200).json({success: true, tree:t });
  }).catch(err=>{
    console.log(err);
  });
});
//TODO: All repositories for a given user, all files in a given repository, =
module.exports = router;