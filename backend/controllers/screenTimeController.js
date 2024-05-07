// const ScreenTime = require('../models/ScreenTime');

// exports.logScreenTime = async (req, res) => {
//   try {
//     const newScreenTime = new ScreenTime(req.body);
//     const savedScreenTime = await newScreenTime.save();
//     res.status(201).json(savedScreenTime);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllScreenTime = async (req, res) => {
//   try {
//     const screenTimeEntries = await ScreenTime.find();
//     res.status(200).json(screenTimeEntries);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
