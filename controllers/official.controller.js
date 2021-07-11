const Official = require("../models/official");
const fs = require("fs");

exports.getOfficial = async (req, res) => {
  const officials = await Official.find({}).sort("priority_number");
  return res.render("official/index", { officials });
};

exports.addOfficialForm = (req, res) => {
  return res.render("official/add");
};

exports.postOfficial = async (req, res) => {
  const {
    name,
	post,
    priority_number,
    phone,
    email,
  } = req.body;
  const pic = `uploads/official_images/${req.file.filename}`;
  const data = {
    name,
	post,
    priority_number: Number(priority_number),
    phone, 
	email,
    pic,
  };
  const newOfficial = new Official(data);
  await newOfficial.save();
  req.flash("success", "Successfully added new official");
  return res.redirect("/regoff/admin/official");
};

exports.getEditForm = async (req, res) => {
  const official = await Official.findById(req.params.off_id);
  return res.render("official/edit", { official });
};


exports.editOfficial = async (req, res) => {
  const {
     name,
	post,
    priority_number,
    phone,
    email,
  } = req.body;

  const data = {
    name,
	post,
    priority_number: Number(priority_number),
    phone, 
	email,
  };
  if (req.file) {
    const pic = `uploads/official_images/${req.file.filename}`;
    data["pic"] = pic;
  }
  //console.log(data);
  const updatedOfficial = await Official.findByIdAndUpdate(
    req.params.off_id,
    data
  );
  if (!updatedOfficial) {
    req.flash("error", "Unable to edit official");
    //return res.redirect("/admin/")
  } else {
    req.flash("success", "Successfully editted official");
  }
  return res.redirect("/regoff/admin/official");
};

exports.deleteOfficial = async (req, res) => {
  try {
    const id = req.params.off_id;
    const official = await Official.findById(id);
    fs.unlinkSync(`${official.pic}`);
    console.log("successfully deleted!");
    await Official.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted official");
    return res.redirect("/regoff/admin/official");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/official");
  }
};

// const compare = (a, b) => {
//   console.log(a, b);
//   return a.priority_number - b.priority_number;
// };
