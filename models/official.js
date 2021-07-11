const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficialSchema = new Schema({
    name: { type: String, required: true },
	pic: { type: String, required: true },
    post: { type: String, required: true },
	priority_number: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Official', OfficialSchema);