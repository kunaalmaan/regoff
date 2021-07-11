const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Curr_regSchema = new Schema({
    name: { type: String, required: true },
	pic: { type: String },
	date: { type: String, required: true },
    post: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	description: { type: String, required: true },
	priority_number: { type: Number, required: true },
});

module.exports = mongoose.model('Curr_reg', Curr_regSchema);