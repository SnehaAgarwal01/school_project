const express = require("express");
const router = express.Router();
const Queries = require("../models/Other/Queries");

router.post("/getQueries", async (req, res) => {
  try {
    let queries = await Queries.find(req.body);
    if (queries) {
      res.json({ success: true, message: "Query Generated Successfully", queries });
    } else {
      res.status(404).json({ success: false, message: "No Query Available!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addQueries", async (req, res) => {
  let { description, title, type } = req.body;
  try {
    let queries = await Queries.findOne({description, title, type });
    if (queries) {
      return res
        .status(400)
        .json({ success: false, message: "Query Already Exists!" });
    }
    await Queries.create({
      description,
      title,
      type,
    });
    const data = {
      success: true,
      message: "Query Added Successfully",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateQueries/:id", async (req, res) => {
  let {description, title, type } = req.body;
  try {
    let queries = await Queries.findByIdAndUpdate(req.params.id, {
      description,
      title,
      type,
    });
    if (!queries) {
      return res
        .status(400)
        .json({ success: false, message: "No Query Available!" });
    }
    res.json({
      success: true,
      message: "Query Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteQueries/:id", async (req, res) => {
  try {
    let queries = await Queries.findByIdAndDelete(req.params.id);
    if (!queries) {
      return res
        .status(400)
        .json({ success: false, message: "No Query Available!" });
    }
    res.json({
      success: true,
      message: "Query Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
