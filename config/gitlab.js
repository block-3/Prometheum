const gitlab = require('node-gitlab-api')({
  url: 'http://ec2-34-205-85-158.compute-1.amazonaws.com/', // Defaults to http://gitlab.com
  token: '5LbSmKXXxvmz_TmmBSkv'	//Can be created in your profile. 
});

module.exports = gitlab;