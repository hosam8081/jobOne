const Jobs = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  try {
    const { status, type, search, sort } = req.query;
    const queryObject = {};
    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (type && type !== "all") {
      queryObject.type = type;
    }
    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }
    let result = Jobs.find(queryObject);
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const job = await result;

    const totalJobs = await Jobs.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(200).send({ job, totalJobs, numOfPages });
  } catch (error) {
    res.json(error);
  }
};

const getJob = async (req, res) => {
  try {
    // const { id } = req.params;
    // const {userID} = req.user;
    const {
      params: { id },
      user: { userID },
    } = req;
    const job = await Jobs.findOne({ _id: id, createdBy: userID });
    res.status(200).send({ job });
  } catch (error) {
    console.log(error);
  }
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Jobs.create(req.body);
  res.status(201).json(job);
};

const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      params: { id },
      user: { userID },
    } = req;

    const job = await Jobs.findByIdAndUpdate(
      { _id: id, createdBy: userID },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      throw new NotFoundError(`No job with id ${id}}`);
    }

    if (!company || !position) {
      throw new BadRequestError("Company or Position fields cannot be empty");
    }

    res.status(200).json({ job });
  } catch (error) {
    res.json(error);
  }
};
const deleteJob = async (req, res) => {
  try {
    const {
      params: { id },
      user: { userID },
    } = req;

    const job = await Jobs.findByIdAndRemove({ _id: id, createdBy: userID });

    if (!job) {
      throw NotFoundError("No job with id" + id);
    }

    res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob,
};
