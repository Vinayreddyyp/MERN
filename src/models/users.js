const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
				throw new Error('password');
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
	tokens:[{ 
		token:{
			type: String,
			required: true
		}
	}]
});


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
	console.log('token in the model', token)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


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
	return user;
}

//user chainging password 

userSchema.pre('save', async function(next) {
	const user = this;
	if(user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
