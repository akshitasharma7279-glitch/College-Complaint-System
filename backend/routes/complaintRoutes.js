const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");


// 🔹 POST - Add Complaint
router.post("/", async (req, res) => {
  try {
    const { lab, roll, complaint } = req.body;

    const newComplaint = new Complaint({
      lab,
      roll,
      complaint
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// 🔹 GET - Get All Complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// 🔹 PUT - Mark Complaint as Reviewed
router.put("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "Reviewed" }
    );

    res.json({ message: "Complaint Updated" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// 🔹 DELETE - Delete One Complaint
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// 🔹 DELETE - Clear All Complaints
router.delete("/clear/all", async (req, res) => {
  try {
    await Complaint.deleteMany();
    res.json({ message: "All Complaints Cleared" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;