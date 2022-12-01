const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 100,
    },
    location : {
      type:String,
      default:"egypt"
    }, 
    status: {
      type: String,
      enum: ["interview", "pending", "declined"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "remote"],
      default: "full time",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('job', JobSchema)