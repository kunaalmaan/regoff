const AdminUpload = require("../models/adminUploads");
const Registrar = require("../models/registrar");

exports.getfr = async (req, res) => {
  // let registrars = await Registrar.find({}).sort("-creation"); 
  let uploads = await AdminUpload.find({});  
  let uploadImages = [];
  uploads.forEach((upload) => {
    uploadImages.push(`uploads/adminUploads/${upload.image}`);
  });

  let registrars = await Registrar.find({}).sort("-priority");
  
  return res.render("home/fr/fr", {
	  uploads,
	  registrars,
	  uploadImages,
  });
};
