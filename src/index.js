const express = require('express');
require('./db/mongoose');
const User = require('./models/users');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users',async(req, res) => {
	const user = new User(req.body);
	console.log("users", user)
	try {
		await user.save()
         res.status(201).send(user)
	} catch(e) {
     res.status(400).send(e);
	}
});

app.get('/users', async(req, res) => {
	try {
		const users = await User.find({});
		res.send(users)
	} catch(e) {
		res.status(500).send()
	}
})

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

    
  try {
	  const user = await User.findById(_id);
	  if(!user) {
		  return res.status(404).send()
	  }
	  res.send(user)
  } catch(e) {
	 return res.status(500).send(e);
  }
	
});

app.patch('/users/:id', async(req, res) => {
	const updates = Object.keys(req.body);
	console.log('updates', updates);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) => {
		allowedUpdates.includes(update)
	})

	if(!isValidOperation) {
		return res.status(400).send({error:'Invalid updates'});
	}
	try{
		const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:  true, runValidators:true});
		console.log('user as per idxx', user)
		if(!user) {
			return res.status(404).send()
		}
		res.send(user)
	} catch(e) {
		res.status(400).status();
	}
})
app.post('/tasks', async(req, res) => {
	const tasks = new Task(req.body);


	try {
		await tasks.save();
		res.status(201).send(tasks)
	} catch(e) {
		res.status(500).send(e);
	}
});
app.get('/tasks', async(req, res) => {
	
	try {
		const tasks = await Task.find({});
		console.log('tasks', tasks);
		res.status(201).send(tasks)
	} catch(e) {
		res.status(200).send(e);
	}
	
});

app.patch('/tasks/:id', async(req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if(!isValidOperation) return res.status(400).send({error: 'Invalid operation'});
	
	try {
		const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{new:  true, runValidators:true});
		if(!tasks) return res.status(404).send();
		res.send(tasks);
		} catch(e) {
			res.status(400).send(e)
		}
})

app.get('/tasks/:id', async(req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);
		if(!task) {
			res.status(404).send()
		}
		res.send(task);
	}catch(err) {
       res.status(400).send(e)
	}
	
});

app.delete('/users/:id', async(req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if(!user) {
			return res.status(404).send({'Error': 'username not found'})
		}
		res.send(user)
	} catch(e) {
		res.status(500).send(e)
	}
})

app.delete('/task/:id', async(req, res) => {
	try {
		const tasks = await Task.findByIdAndDelete(req.params.id);
		if(!tasks) {
			res.send(404).send({'Error': 'Task not found'});

		}
		res.send(tasks)
	} catch(e) {
		res.send(500).send(e)
	}
})

app.listen(port, () => {
	console.log('Server is up on port' + port);
});


