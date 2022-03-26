const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('pasworrd');
			}
		},
	},
	age: {
		type: Number,
		required: true,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age Must to be a positive integer');
			}
		},
	},
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({email});
	console.log('email', email);
	if(!user) {
		throw new Error('unable to find the email')
	}
	const isMatch = await bcrypt.compare(password, user.password);
	console.log('isMatch', isMatch);
	if(!isMatch) {
		throw new Error('Unable to login')
	}
}

userSchema.pre('save', async function(next) {
	const user = this;
	if(user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
