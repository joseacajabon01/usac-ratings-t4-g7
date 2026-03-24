const str = s => typeof s === 'string' ? s.trim() : '';
const isEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
module.exports = { str, isEmail };
