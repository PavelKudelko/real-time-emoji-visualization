const {getSettings, updateSettings} = require('../config/settings');

//interval related methods: GET and PUT
const getInterval = async (req, res) => {
    try {
        const settings = getSettings();
        res.status(200).json({ interval: settings.interval });
    }
    catch (error) {
        console.error.apply(error);
        res.status(500).json({ error: 'Error retrieving settings' });
    }
};

const updateInterval = async (req, res) => {
    try {
        const { interval } = req.body;
        updateSettings('interval', interval);
        res.status(200).json({
            interval: getSettings.interval,
            message: 'Interval updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update interval',
            error: error.message
        });
    }
};

// threshold related methods: GET and PUT
const getThreshold = async (req, res) => {
    try {
        const settings = getSettings();
        res.status(200).json({ threshold: settings.threshold });
    }
    catch (error) {
        console.error.apply(error);
        res.status(500).json({ error: 'Error retrieving settings' });
    }
};

const updateThreshold = async (req, res) => {
    try {
        const { threshold } = req.body;
        updateSettings('threshold', threshold);
        res.status(200).json({
            threshold: getSettings.threshold,
            message: 'Threshold updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update threshold',
            error: error.message
        });
    }
};

// Allowed emotes method (maybe gonna delete in future)
const getAllowedEmotes = async (req, res) => {
    try {
        const settings = getSettings();
        res.status(200).json({ allowedEmotes: settings.allowedEmotes });
    }
    catch (error) {
        console.error.apply(error);
        res.status(500).json({ error: 'Error retrieving settings' });
    }
};

const updateAllowedEmotes = async (req, res) => {
    try {
        const { allowedEmotes } = req.body;
        updateSettings('allowedEmotes', allowedEmotes);
        res.status(200).json({
            allowedEmotes: getSettings.allowedEmotes,
            message: 'allowedEmotes updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update allowedEmotes',
            error: error.message
        });
    }
};