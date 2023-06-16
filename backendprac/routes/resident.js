const express = require('express');

const Resident = require("../models/resident");
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

//middleware request putting a new resident information into database
router.post("", checkAuth, (req, res, next) =>{
  const resident = new Resident({
    rfname: req.body.rfname,
    rlname: req.body.rlname,
    rdob: req.body.rdob,
    rsex: req.body.rsex,
    rgender: req.body.rgender,
    rpronouns: req.body.rpronouns,
    content: req.body.content,
    task: req.body.task,
    disAction: req.body.disAction
  });
  resident.save().then(createdResident =>{   //saving the new resident info and sending successful message back
    res.status(201).json({message: "Resident added successfully",
    residentId: createdResident._id
    });
  });
});

//middleware rquest submitting an editted resident
router.put("/:id", checkAuth, (req, res, next) => {
  const resident = new Resident({
    _id: req.body.id,
    rfname: req.body.rfname,
    rlname: req.body.rlname,
    rdob: req.body.rdob,
    rsex: req.body.rsex,
    rgender: req.body.rgender,
    rpronouns: req.body.rpronouns,
    content: req.body.content,
    task: req.body.task,
    disAction: req.body.disAction
  });
  Resident.updateOne({ _id: req.params.id }, resident).then(result => {
    res.status(200).json({message:"Update successful!"});
  });
});

//middleware fetching a existing resident
router.get("", checkAuth,(req, res, next) => {
  Resident.find().then(documents => {
    res.status(200).json({
      message:"Resident fetched successfully!",
      residents: documents
    });
  });
});

//middleware that getting a specific id from the database
router.get("/:id", checkAuth,(req, res, next) => {
  Resident.findById(req.params.id).then(resident => {
    if (resident) {
      res.status(200).json(resident);
    } else {
      res.status(404).json({ message:"Resident was not found" });
    }
  });
});

//middleware that requests the deletion of a resident from the database
router.delete("/:id", checkAuth,(req, res, next) => {
  Resident.deleteOne({ _id: req.params.id }). then(result => {
    console.log(result);
    res.status(200).json({ message: "Resident deleted!" });
  });
});
module.exports = router;
