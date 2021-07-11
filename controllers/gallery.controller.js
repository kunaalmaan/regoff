const Gallery = require("../models/gallery");
const fs = require("fs");

exports.getGallery = async (req, res) => {
  const galleries = await Gallery.find({}).sort("priority_number");
  return res.render("gallery/index", { galleries });
};

exports.addGalleryForm = (req, res) => {
  return res.render("gallery/add");
};

exports.postGallery = async (req, res) => {
  const {
    priority_number,
  } = req.body;
  const pic = `uploads/gallery_images/${req.file.filename}`;
  const data = {
    priority_number: Number(priority_number),
    pic,
  };
  const newGallery = new Gallery(data);
  await newGallery.save();
  req.flash("success", "Successfully added new gallery");
  return res.redirect("/regoff/admin/gallery");
};

exports.getEditForm = async (req, res) => {
  const gallery = await Gallery.findById(req.params.gal_id);
  return res.render("gallery/edit", { gallery });
};


exports.editGallery = async (req, res) => {
  const {
    priority_number,
  } = req.body;

  const data = {
    priority_number: Number(priority_number),
  };
  if (req.file) {
    const pic = `uploads/gallery_images/${req.file.filename}`;
    data["pic"] = pic;
  }
  //console.log(data);
  const updatedGallery = await Gallery.findByIdAndUpdate(
    req.params.gal_id,
    data
  );
  if (!updatedGallery) {
    req.flash("error", "Unable to edit gallery");
    //return res.redirect("/admin/")
  } else {
    req.flash("success", "Successfully editted gallery");
  }
  return res.redirect("/regoff/admin/gallery");
};

exports.deleteGallery = async (req, res) => {
  try {
    const id = req.params.gal_id;
    const gallery = await Gallery.findById(id);
    fs.unlinkSync(`${gallery.pic}`);
    console.log("successfully deleted!");
    await Gallery.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted gallery");
    return res.redirect("/regoff/admin/gallery");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/gallery");
  }
};

// const compare = (a, b) => {
//   console.log(a, b);
//   return a.priority_number - b.priority_number;
// };
