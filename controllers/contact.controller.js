const Contact = require("../models/contact");
const fs = require("fs");

exports.getContactInfo = async (req, res, next) => {
  try {
    const contactInfos = await Contact.find({});
    return res.render("contact/index", {
      contactInfos,
      link: "/contact/addContactInfo",
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.addContactForm = (req, res) => {
  try {
    return res.render("contact/add", { link: "/contact" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateContactForm = async (req, res) => {
  try {
    const id = req.params.id;
    const contactInfo = await Contact.findById(id);
    if (!contactInfo) {
      req.flash("error", "Cannot update");
      return res.redirect("/regoff/admin/contact");
    }

    return res.render("contact/edit", {
      link: "/contact/" + req.params.id,
      contactInfo,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateContactInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const contactInfo = await Contact.findById(id);
    if (!contactInfo) {
      req.flash("error", "Cannot find uploaded info");
      return res.redirect("/regoff/admin/contact");
    }

    var phone = contactInfo.phone;
    var fax = contactInfo.fax;
    var email = contactInfo.email;
	  if (req.body.phone) {
      phone = req.body.phone;
    }
	  if (req.body.fax) {
      fax = req.body.fax;
    }
	  if (req.body.email) {
      email = req.body.email;
    }
    
    const obj = { phone,fax,email };
    const uploadContactInfo = await Contact.findByIdAndUpdate(id, obj, {
      runValidators: true,
    });
    if (!uploadContactInfo) {
      req.flash("error", "Cannot upload Info");
      return res.redirect("/regoff/admin/contact");
    }
    req.flash("success", "Successfully updated contact info");

    return res.redirect("/regoff/admin/contact");
  } catch (error) {
    console.log(error.message);
  }
};

exports.createContactInfo = async (req, res) => {
  try {
    var {phone,fax,email} = req.body;
    const newContactInfo = new Contact({ phone,fax,email  });
    const contactInfo = await newContactInfo.save();
    if (!contactInfo) {
      req.flash("error", "Cannot add info");
      return res.redirect("/regoff/admin/contact");
    }
    req.flash("success", "Successfully uploaded info");
    return res.redirect("/regoff/admin/contact");
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteContactInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const contactInfo = await Contact.findById(id);
    if (!contactInfo) {
      req.flash("error", "Cannot find uploaded info");
      return res.redirect("/regoff/admin/contact");
    }
    
    await Contact.findByIdAndRemove(id);

    req.flash("success", "Successfully deleted info");
    return res.redirect("/regoff/admin/contact");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/contact");
  }
};
exports.deleteAllInfo = async (req, res) => {
  try {
    const contactInfos = await Contact.find({});
    if (!contactInfos) {
      req.flash("error", "Cannot find uploaded info");
      return res.redirect("/regoff/admin/contact");
    }
    await Contact.deleteMany({});
    req.flash("success", "Successfully deleted all info");

    return res.redirect("/regoff/admin/contact");
  } catch (err) {
    // handle the error
    console.log(err);
    res.redirect("/regoff/admin/contact");
  }
};
