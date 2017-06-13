
module.exports = function () {
	var config = {
		// all js that I want to vet !
		alljs:[
				'./src/**/*.js',
				'./*.js'
		]
	};
	return config;
};