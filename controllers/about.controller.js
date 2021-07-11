const About = require("../models/about");
const fs = require("fs");

exports.getAboutInfo = async (req, res, next) => {
  try {
    const aboutInfos = await About.find({});
    // aboutInfos.sort((a, b) => (a.priority_number > b.priority_number ? 1 : -1));

    return res.render("about/index", {
      aboutInfos,
      link: "/about/addAboutInfo",
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.addAboutForm = (req, res) => {
  try {
    return res.render("about/add", { link: "/about" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateAboutForm = async (req, res) => {
  try {
    const id = req.params.id;
    const aboutInfo = await About.findById(id);
    if (!aboutInfo) {
      req.flash("error", "Cannot update");
      return res.redirect("/regoff/admin/about");
    }

    return res.render("about/edit", {
      link: "/about/" + req.params.id,
      aboutInfo,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateAboutInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const aboutInfo = await About.findById(id);
    if (!aboutInfo) {
      req.flash("error", "Cannot find uploaded info");
      return res.redirect("/regoff/admin/about");
    }

    var title = aboutInfo.title;
    var description = aboutInfo.description;
    var phone = aboutInfo.phone;
    var fax = aboutInfo.fax;
    var email = aboutInfo.email;
    if (req.body.title) {
      title = req.body.title;
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    if (req.body.description) {
      description = req.body.description;
    }
	  if (req.body.phone) {
      phone = req.body.phone;
    }
	  if (req.body.fax) {
      fax = req.body.fax;
    }
	  if (req.body.email) {
      email = req.body.email;
    }
    
    const obj = { title, description,phone,fax,email };
    const uploadAboutInfo = await About.findByIdAndUpdate(id, obj, {
      runValidators: true,
    });
    if (!uploadAboutInfo) {
      req.flash("error", "Cannot upload Info");
      return res.redirect("/regoff/admin/about");
    }
    req.flash("success", "Successfully updated about info");

    return res.redirect("/regoff/admin/about");
  } catch (error) {
    console.log(error.message);
  }
};

exports.createAboutInfo = async (req, res) => {
  try {
    
    var {title, description,phone,fax,email } = req.body;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    const newAboutInfo = new About({ title, description,phone,fax,email  });
    const aboutInfo = await newAboutInfo.save();
    if (!aboutInfo) {
      req.flash("error", "Cannot add info");
      return res.redirect("/regoff/admin/about");
    }
    req.flash("success", "Successfully uploaded info");
    return res.redirect("/regoff/admin/about");
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteAboutInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const aboutInfo = await About.findById(id);
    if (!aboutInfo) {
      req.flash("error", "Cannot find uploaded info");
      return res.redirect("/regoff/admin/about");
    }
    
    await About.findByIdAndRemove(id);

    req.flash("success", "Successfully deleted info");
    return res.redirect("/regoff/admin/about");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/about");
  }
};
exports.deleteAllInfo = async (req, res) => {
  try {
    const aboutInfos = await About.find({});
    if (!aboutInfos) {
      req.flash("error", "Cannot find uploaded info");
      return res.redirect("/regoff/admin/about");
    }

    
    await About.deleteMany({});

    req.flash("success", "Successfully deleted all info");

    return res.redirect("/regoff/admin/about");
  } catch (err) {
    // handle the error
    console.log(err);
    res.redirect("/regoff/admin/about");
  }
};
