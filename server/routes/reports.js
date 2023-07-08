const express = require('express');
const router = express.Router();
const { Report } = require('../models');

// GET all reports
router.get('/', (req, res) => {
  Report.findAll()
    .then((reports) => {
      res.json(reports);
    })
    .catch((error) => {
      console.error('Error retrieving reports:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// GET a specific report by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Report.findByPk(id)
    .then((report) => {
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json(report);
    })
    .catch((error) => {
      console.error('Error retrieving report:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// POST a new report
router.post('/', (req, res) => {
  const { name, contactNumber, dateOfReport, timeOfReport, selectedImage, otherDamages } = req.body;

  Report.create({
    name,
    contactNumber,
    dateOfReport,
    timeOfReport,
    selectedImage,
    otherDamages,
  })
    .then((report) => {
      res.status(201).json(report);
    })
    .catch((error) => {
      console.error('Error creating report:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// DELETE a report
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Report.destroy({
    where: { id },
  })
    .then((deletedCount) => {
      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json({ message: 'Report deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting report:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
