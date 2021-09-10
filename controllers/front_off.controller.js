const AdminUpload = require("../models/adminUploads");
const Official = require("../models/official");
const Contact = require("../models/contact");

exports.getoff = async (req, res) => {
  // let registrars = await Registrar.find({}).sort("-creation"); 
  let uploads = await AdminUpload.find({});  
  let uploadImages = [];
  uploads.forEach((upload) => {
    uploadImages.push(`uploads/adminUploads/${upload.image}`);
  });

  let officials = await Official.find({}).sort("priority_number");
  let contactInfos = await Contact.find({});
  
  return res.render("home/off/off", {
	  uploads,
	  officials,
	  uploadImages,
	  contactInfos,
  });
};
