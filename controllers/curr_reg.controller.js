const Curr_reg = require("../models/curr_reg");
const fs = require("fs");

exports.getCurr_reg = async (req, res) => {
  const curr_regs = await Curr_reg.find({}).sort("priority_number");
  return res.render("curr_reg/index", { curr_regs });
};

exports.addCurr_regForm = (req, res) => {
  return res.render("curr_reg/add");
};

exports.postCurr_reg = async (req, res) => {
  const {
    name,
	post,
	date,
	phone,
	email,
	description,
    priority_number,
  } = req.body;
  const pic = `uploads/curr_reg_images/${req.file.filename}`;
  const data = {
    name,
	post,
	date,
	phone,
	email,
	description,
    priority_number: Number(priority_number),
    pic,
  };
  const newCurr_reg = new Curr_reg(data);
  await newCurr_reg.save();
  req.flash("success", "Successfully added new curr_reg");
  return res.redirect("/regoff/admin/curr_reg");
};

exports.getEditForm = async (req, res) => {
  const curr_reg = await Curr_reg.findById(req.params.creg_id);
  return res.render("curr_reg/edit", { curr_reg });
};


exports.editCurr_reg = async (req, res) => {
  const {
	  name,
	  post,
	  date,
	  phone,
	  email,
	  description,
	  priority_number,
  } = req.body;

  const data = {
	  name,
	  post,
	  date,
	  phone,
	  email,
	  description,
	  priority_number: Number(priority_number),
  };
  if (req.file) {
	  const pic = `uploads/curr_reg_images/${req.file.filename}`;
	  data["pic"] = pic;
  }
  //console.log(data);
  const updatedCurr_reg = await Curr_reg.findByIdAndUpdate(
	  req.params.creg_id,
	  data
  );
  if (!updatedCurr_reg) {
	  req.flash("error", "Unable to edit curr_reg");
    //return res.redirect("/admin/")
  } else {
	  req.flash("success", "Successfully editted curr_reg");
  }
  return res.redirect("/regoff/admin/curr_reg");
};

exports.deleteCurr_reg = async (req, res) => {
  try {
    const id = req.params.creg_id;
    const curr_reg = await Curr_reg.findById(id);
    fs.unlinkSync(`${curr_reg.pic}`);
    console.log("successfully deleted!");
    await Curr_reg.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted curr_reg");
    return res.redirect("/regoff/admin/curr_reg");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/curr_reg");
  }
};

// const compare = (a, b) => {
//   console.log(a, b);
//   return a.priority_number - b.priority_number;
// };
