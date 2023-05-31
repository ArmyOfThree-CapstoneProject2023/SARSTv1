const express = require('express');

const Resident = require("../models/resident");

const router = express.Router();

router.post("", (req, res, next) =>{
  const resident = new Resident({
    rfname: req.body.rfname,
    rlname: req.body.rlname,
    rdob: req.body.rdob,
    rsex: req.body.rsex,
    rgender: req.body.rgender,
    rpronouns: req.body.rpronouns,
    content: req.body.content,
    disAction: req.body.disAction
  });
  resident.save().then(createdResident =>{
    res.status(201).json({message: "Resident added successfully",
    residentId: createdResident._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const resident = new Resident({
    _id: req.body.id,
    rfname: req.body.rfname,
    rlname: req.body.rlname,
    rdob: req.body.rdob,
    rsex: req.body.rsex,
    rgender: req.body.rgender,
    rpronouns: req.body.rpronouns,
    content: req.body.content,
    disAction: req.body.disAction
  });
  Resident.updateOne({ _id: req.params.id }, resident).then(result => {
    res.status(200).json({message:"Update successful!"});
  });
});

router.get("", (req, res, next) => {
  Resident.find().then(documents => {
    res.status(200).json({
      message:"Resident fetched successfully!",
      residents: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Resident.findById(req.params.id).then(resident => {
    if (resident) {
      res.status(200).json(resident);
    } else {
      res.status(404).json({ message:"Resident was not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Resident.deleteOne({ _id: req.params.id }). then(result => {
    console.log(result);
    res.status(200).json({ message: "Resident deleted!" });
  });
});
module.exports = router;
