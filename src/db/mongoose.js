const mongoose = require('mongoose');

//connecting to the database
mongoose.connect('process.env.MONGODB_URL', {
	useNewUrlParser: true,
});

//creating model

// const task = new Task({
// 	description: 'Learn the Mongoose Model',
// 	completed: false,
// });
