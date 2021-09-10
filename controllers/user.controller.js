const Rule = require("../models/rule");
//const Announcement = require("../models/announcement");
const AdminUpload = require("../models/adminUploads");
const Gallery = require("../models/gallery");
const About = require("../models/about");
const Contact = require("../models/contact");
const Registrar = require("../models/registrar");
const Curr_reg = require("../models/curr_reg");
const Official = require("../models/official");

exports.getHome = async (req, res) => {
  let rules = await Rule.find({}).sort("-creation"); 
  let uploads = await AdminUpload.find({});  
  let aboutInfos= await About.find({}).sort("priority_number");
  let uploadImages = [];
  uploads.forEach((upload) => {
    uploadImages.push(`uploads/adminUploads/${upload.image}`);
  });

  //let officials = await Official.find({}).sort("-priority");
	let officials = await Official.find({}).sort("priority_number");
  let registrars = await Registrar.find({}).sort("priority_number");
	let curr_regs = await Curr_reg.find({}).sort("-priority");
	let galleries = await Gallery.find({}).sort("-priority");
	let contactInfos = await Contact.find({});
  
  return res.render("home", {
	  uploads,
	  officials,
	  registrars,
	  curr_regs,
	  uploadImages,
	  aboutInfos,
	  rules,
	  galleries,
	  contactInfos,
  });
};
