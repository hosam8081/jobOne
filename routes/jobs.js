const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob,
} = require("../controllers/jobs");
const auth = require("../middleware/authentication");

router.route("/").get(getAllJobs).post(auth, createJob);
router.route("/:id").get(auth, getJob).patch(auth, updateJob).delete(auth, deleteJob)

module.exports = router;
