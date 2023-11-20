const express = require("express");
const router = express.Router();
const parentCredential = require("../../models/Parent/ParentCredentials");

router.post("/login", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    let user = await parentCredential.findOne({ loginid });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }
    if (password !== user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }
    const data = {
      success: true,
      message: "Login Successfull!",
      loginid: user.loginid,
      id: user.id,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    let user = await parentCredential.findOne({ loginid });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Parent With This LoginId Already Exists",
      });
    }
    user = await parentCredential.create({
      loginid,
      password,
    });
    const data = {
      success: true,
      message: "Register Successfull!",
      loginid: user.loginid,
      id: user.id,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    let user = await parentCredential.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No parent Exists!",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let user = await parentCredential.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No parent Exists!",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
