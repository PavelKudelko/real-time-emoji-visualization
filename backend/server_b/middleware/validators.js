// Middleware for routes: validators of input

// Not sure if we need then tho, because we  will most likely have just sliders
// in UI. But I put it here for now, maybe delete later

// validate user input for interval
const validateInterval = (req, res, next) => {
  const { interval } = req.body;
  if (interval === undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required field: interval'
    });
  }

  if (!Number.isInteger(interval) || interval <= 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Interval must be a positive integer'
    });
  }

  next();
};

// validate user input for Threshold: it must be between 0 and 1
// as a representation of range 0% to 100%
const validateThreshold = (req, res, next) => {
  const { threshold } = req.body;

  if (threshold === undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required field: threshold'
    });
  }

  if (typeof threshold !== 'number' || threshold < 0 || threshold > 100) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Threshold must be a number between 0 and 100 (inclusive)'
    });
  }

  next();
};

// Kind of silly validation of emotes, but we might not need it at all
const validateAllowedEmotes = (req, res, next) => {
  const { allowedEmotes } = req.body;

  if (!allowedEmotes || !Array.isArray(allowedEmotes)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing or invalid field: allowedEmotes must be an array'
    });
  }

  if (allowedEmotes.some(emote => typeof emote !== 'string')) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'All emotes must be strings'
    });
  }

  next();
};

module.exports = {
  validateInterval,
  validateThreshold,
  validateAllowedEmotes
};
