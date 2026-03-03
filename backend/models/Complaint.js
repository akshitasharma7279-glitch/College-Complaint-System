const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    lab: {
      type: String,
      required: true
    },
    roll: {
      type: String,
      required: true
    },
    complaint: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);