function sanitizeText(text) {
  text = typeof text === 'string' ? text : '';
  
  return text.toLowerCase().replace(/_/g, ' ');
}

module.exports = {
  sanitizeText
}