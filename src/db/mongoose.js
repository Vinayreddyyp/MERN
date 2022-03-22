const mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/tak-manager-api', {
	useNewUrlParser: true,
});

//creating model

// const task = new Task({
// 	description: 'Learn the Mongoose Model',
// 	completed: false,
// });
