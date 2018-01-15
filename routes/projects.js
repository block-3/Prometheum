const express = require('express');
const router = express.Router();
const gitlab = require('../config/gitlab');
const authenticate = require('../middleware/expressJwtAuth');

router.post('/', authenticate, function (req, res) {
  const repoData = {
    userId: req.body.gitlabId,
    name: req.body.name,
    description: req.body.description,
    visibility: (req.body.visbility) ? req.body.visbility : 'public'
  };
  //Initialize Repo in Gitlab
  gitlab.projects.create(repoData).then(r => {
    res.status(200).json({success: true, msg: 'gr8 success', repo: r});
  }).catch(err => {
    res.status(400).json({ success: false, msg: 'failure' });
  });
});

router.get('/', function (req, res) {
  const options = {
    visbility: 'public'
  };
  //Initialize Repo in Gitlab
  gitlab.projects.all(options).then(r => {
    res.status(200).json({success: true, projects: r});
  }).catch(err => {
    res.status(400).json({ success: false, msg: 'failure' });
  });
});
//TODO: All repositories for a given user, all files in a given repository, =
module.exports = router;
