const express = require('express');

const Resident = require("../models/resident");

const router = express.Router();

router.post("", (req, res, next) =>{
  const resident = new Resident({
    name: req.body.name,
    content: req.body.content
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
    name: req.body.name,
    content: req.body.content
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