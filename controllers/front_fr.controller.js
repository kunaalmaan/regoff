const AdminUpload = require("../models/adminUploads");
const Registrar = require("../models/registrar");
const Contact = require("../models/contact");

exports.getfr = async (req, res) => {
  // let registrars = await Registrar.find({}).sort("-creation"); 
  let uploads = await AdminUpload.find({});  
  let uploadImages = [];
  uploads.forEach((upload) => {
    uploadImages.push(`uploads/adminUploads/${upload.image}`);
  });

  let registrars = await Registrar.find({}).sort("priority_number");
  let contactInfos = await Contact.find({});
  
  return res.render("home/fr/fr", {
	  uploads,
	  registrars,
	  uploadImages,
	  contactInfos,
  });
};
