const gitlab = require('node-gitlab-api')({
  url: 'http://ec2-35-170-68-173.compute-1.amazonaws.com', // Defaults to http://gitlab.com
  token: '5LbSmKXXxvmz_TmmBSkv'	//Can be created in your profile.
});

module.exports = gitlab;
