const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	age: {
		type: Number,
	}
},
	{
		timestamps: true  // This will add createdAt and updatedAt fields
	});

module.exports = mongoose.model('user', UserSchema);