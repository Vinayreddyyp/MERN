const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();



router.post('/tasks',auth,  async(req, res) => {
	console.log('id of the task', req.user._id)
	//const tasks = new Task(req.body);
	const tasks = new Task({
		...req.body,
		owner: req.user._id
	})


	try {
		await tasks.save();
		res.status(201).send(tasks)
	} catch(e) {
		res.status(500).send(e);
	}
});
router.get('/tasks', auth, async(req, res) => {
	
	const match = {};
	console.log('match', match);
	if(req.query.completed) {
		console.log('req.query.completed', req.query.completed);
         match.completed = req.query.completed === 'true';
	}
	try {
		/* const tasks = await Task.find({}); */
		await req.user.populate({
			path: 'tasks',
			match, 
		}).execPopulate()
		res.send(req.user.tasks);
		
		res.status(201).send(req.user.tasks);
	} catch(e) {
		res.status(200).send(e);
	}
	
});

router.patch('/tasks/:id', async(req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if(!isValidOperation) return res.status(400).send({error: 'Invalid operation'});
	
	try {
		const tasks = await Task.findById(req.params.id);
    console.log('taasks', tasks);
        updates.forEach((update) => tasks[update] = req.body[update])
         await tasks.save();
		if(!tasks) return res.status(404).send();
		res.send(tasks);
		} catch(e) {
			res.status(400).send(e)
		}
})

router.get('/tasks/:id', async(req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);
		if(!task) {
			res.status(404).send()
		}
		res.send(task);
	}catch(err) {
       res.status(400).send(err)
	}
	
});



router.delete('/task/:id', auth , async(req, res) => {
	try {
		//const tasks = await Task.findByIdAndDelete(req.params.id);
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
		if(!tasks) {
			res.send(404).send({'Error': 'Task not found'});

		}
		res.send(tasks)
	} catch(e) {
		res.send(500).send(e)
	}
})
module.exports = router;