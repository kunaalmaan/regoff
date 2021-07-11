const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrarSchema = new Schema({
    name: { type: String, required: true },
	pic: { type: String },
	date: { type: String, required: true },
    post: { type: String, required: true },
	priority_number: { type: Number, required: true },
});

module.exports = mongoose.model('Registrar', RegistrarSchema);