const Rule = require("../models/rule");

const fs = require("fs");

exports.getRules = async (req, res) => {
  try {
    const rules = await Rule.find({});
    rules.sort(compare);
    return res.render("rule/index", { rules });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addRuleForm = async (req, res) => {
  try {
    return res.render("rule/add");
  } catch (error) {
    console.log(error.message);
  }
};

exports.postRule = async (req, res) => {
  try {
    var { title, description } = req.body;

    const path = req.file ? req.file.filename : link;
    if (!path) {
      req.flash("error", "You need to add rule pdf or link!");
      return res.redirect("/regoff/admin/rule/add");
    }
    //console.log(path);
    const newRule = await new Rule({
      title,
	  description,
      path,
    }).save();
    if (!newRule) {
      req.flash("error", "Unable to add new rule");
      res.redirect("/regoff/admin/rule/add");
    }

    req.flash("success", "Successfully added new rule");
    return res.redirect("/regoff/admin/rule");
  } catch (error) {
    console.log(error.message);
  }
};

exports.findRule = async (req, res) => {
  try {
    const val = req.body.mySearch1;
    const val2 = req.body.dropdown;
    var rules = await Rule.find({
      $and: [
        {
          $or: [
            { title: { $regex: val, $options: "i" } },
            { description: { $regex: val, $options: "i" } },
          ],
        },
      ],
    });
    //var categories = await Category.find({});
    rules.sort(compare);
    res.render("rule/index", { rules });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.rule_id);
    return res.render("rule/edit", { rule});
  } catch (error) {
    console.log(error.message);
  }
};

exports.editRule = async (req, res) => {
  try {
    var { title, description,  link } = req.body;

    const path = req.file ? req.file.filename : link;
    let data;
    if (!req.file && !link) {
      data = { title, description };
    } else {
      data = { title, description, path };
    }

    //const savedCategory = await Category.find({ name: name });

    // if (savedCategory.length == 0) {
    //   const newCategory = new Category({ name });
    //   await newCategory.save();
    // }

    const updatedRule = await Rule.findByIdAndUpdate(
      req.params.rule_id,
      data
    );

    if (!updatedRule) {
      req.flash("error", "Unable to edit rule");
      return res.redirect("/regoff/admin/rule");
    }
    req.flash("success", "Successfully editted rule");
    return res.redirect("/regoff/admin/rule");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getOneRule = async (req, res) => {
  try {
    const id = req.params.rule_id;
    const rule = await Rule.findById(id);
    const filePath = "uploads/rule_pdf/" + rule.path;
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteRule = async (req, res) => {
  try {
    const id = req.params.rule_id;
    const rule = await Rule.findById(id);
    if (rule.path.indexOf("https://") == -1) {
      fs.unlinkSync(`uploads/rule_pdf/${rule.path}`);
      console.log("successfully deleted!");
    }
    await Rule.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted rule");
    return res.redirect("/regoff/admin/rule");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/regoff/admin/rule");
  }
};

const compare = (a, b) => {
  return b.creation - a.creation;
};
