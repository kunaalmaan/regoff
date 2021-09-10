const AdminUpload = require("../models/adminUploads");
const Rule = require("../models/rule");
const Contact = require("../models/contact");

exports.getrule = async (req, res) => {
  // let registrars = await Registrar.find({}).sort("-creation"); 
  let uploads = await AdminUpload.find({});  
  let uploadImages = [];
  uploads.forEach((upload) => {
    uploadImages.push(`uploads/adminUploads/${upload.image}`);
  });

  let rules = await Rule.find({}).sort("-creation");
  let contactInfos = await Contact.find({});
  
  return res.render("home/rule/rule", {
	  uploads,
	  rules,
	  uploadImages,
	  contactInfos,
  });
};
