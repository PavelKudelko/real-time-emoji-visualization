const settings = {
    interval: 20, // let's say we analyse every 10 messages
    threshold: 0.1, // let's say default is 10%
    allowedEmotes: ['❤️', '👍', '😢', '😡']
};

// return copy of settings
const getSettings = () => {
    return { ...settings}; // return copy without nesting
};

const updateSettings = (key, value) => {
    if (key in settings) {
        settings[key] = value;
        return true;
    }
    return false;
};

module.exports = {
    getSettings,
    updateSettings
}