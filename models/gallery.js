const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
	pic: { type: String, required: true },
	priority_number: { type: Number, required: true },
});

module.exports = mongoose.model('Gallery', GallerySchema);