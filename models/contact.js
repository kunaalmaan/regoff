const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  phone: { type: String, required: true },
	fax: { type: String},
	email: { type: String, required: true },

});

module.exports = mongoose.model("Contact", ContactSchema);
