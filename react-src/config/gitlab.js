const gitlab = require('node-gitlab-api')({
  url: 'http://ec2-35-170-68-173.compute-1.amazonaws.com', // Defaults to http://gitlab.com
  token: 'jJqZdjzbL4Rr67ayoKcB'
	//Can be created in your profile.
});

module.exports = gitlab;
