const express = require('express');
const router = express.Router();

// controllers
const {
    getInterval,
    updateInterval,
    getThreshold,
    updateThreshold,
    getAllowedEmotes,
    updateAllowedEmotes
} = require('../controllers/settingsController');

const validators = require('../middleware/validators');

router.get('/interval', getInterval);
router.put('/interval', validators.validateInterval,updateInterval);
router.get('/threshold', getThreshold);
router.put('/threshold', validators.validateThreshold, updateThreshold);
// Not sure if emotes methods are needed at all
// But put it here for now, maybe delete later
router.get('/allowed-emotes', getAllowedEmotes);
router.put('/allowed-emotes', validators.validateAllowedEmotes, updateAllowedEmotes);

module.exports = router;
