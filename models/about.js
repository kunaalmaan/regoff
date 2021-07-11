const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
	fax: { type: String},
	email: { type: String, required: true },

});

module.exports = mongoose.model("About", AboutSchema);
