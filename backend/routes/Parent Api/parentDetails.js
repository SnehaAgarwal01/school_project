const express = require("express");
const router = express.Router();
const parentDetails = require("../../models/Parent/ParentDetails");

router.post("/getDetails", async (req, res) => {
  try {
    let user = await parentDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Parent Found" });
    }
    const data = {
      success: true,
      message: "Parent Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addDetails", async (req, res) => {
  try {
    let user = await parentDetails.findOne(req.body);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Parent With This ParentId Already Exists",
      });
    }
    user = await parentDetails.create(req.body);
    const data = {
      success: true,
      message: "Parent Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateDetails/:id", async (req, res) => {
  try {
    let user = await parentDetails.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Parent Found",
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

router.delete("/deleteDetails/:id", async (req, res) => {
  try {
    let user = await parentDetails.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Parent Found",
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

router.get("/count", async (req, res) => {
    try {
      let user = await parentDetails.count(req.body);
      const data = {
        success: true,
        message: "Count Successfull!",
        user,
      };
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error", error });
    }
  });

module.exports = router;
