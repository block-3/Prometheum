const gitlab = require('node-gitlab-api')({
  url: 'http://localhost', // Defaults to http://gitlab.com
  token: 'jgNwu7rggcQBBEhfbrVL'
	//Can be created in your profile.
});


module.exports = gitlab;
