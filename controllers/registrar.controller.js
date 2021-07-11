const Registrar = require("../models/registrar");
const fs = require("fs");

exports.getRegistrar = async (req, res) => {
  const registrars = await Registrar.find({}).sort("priority_number");
  return res.render("registrar/index", { registrars });
};

exports.addRegistrarForm = (req, res) => {
  return res.render("registrar/add");
};

exports.postRegistrar = async (req, res) => {
  const {
    name,
	post,
	date,
    priority_number,
  } = req.body;
  const pic = `uploads/registrar_images/${req.file.filename}`;
  const data = {
    name,
	post,
	date,
    priority_number: Number(priority_number),
    pic,
  };
  const newRegistrar = new Registrar(data);
  await newRegistrar.save();
  req.flash("success", "Successfully added new registrar");
  return res.redirect("/regoff/admin/registrar");
};

exports.getEditForm = async (req, res) => {
  const registrar = await Registrar.findById(req.params.reg_id);
  return res.render("registrar/edit", { registrar });
};


exports.editRegistrar = async (req, res) => {
  const {
     name,
	post,
	date,
    priority_number,
  } = req.body;

  const data = {
    name,
	post,
	date,
    priority_number: Number(priority_number),
  };
  if (req.file) {
    const pic = `uploads/registrar_images/${req.file.filename}`;
    data["pic"] = pic;
  }
  //console.log(data);
  const updatedRegistrar = await Registrar.findByIdAndUpdate(
    req.params.reg_id,
    data
  );
  if (!updatedRegistrar) {
    req.flash("error", "Unable to edit registrar");
    //return res.redirect("/admin/")
  } else {
    req.flash("success", "Successfully editted registrar");
  }
  return res.redirect("/regoff/admin/registrar");
};

exports.deleteRegistrar = async (req, res) => {
  try {
    const id = req.params.reg_id;
    const registrar = await Registrar.findById(id);
    fs.unlinkSync(`${registrar.pic}`);
    console.log("successfully deleted!");
    await Registrar.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted registrar");
    return res.redirect("/regoff/admin/registrar");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/registrar");
  }
};

// const compare = (a, b) => {
//   console.log(a, b);
//   return a.priority_number - b.priority_number;
// };
