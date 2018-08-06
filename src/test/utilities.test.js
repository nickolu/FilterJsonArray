const utils = require('../utilities.js');

describe('sanitize',()=>{
  it('should change "Hello_World" to "hello world"', ()=>{
    expect(utils.sanitizeText('Hello_World')).toEqual('hello world');
  });

  it('should return an empty string if given a bad string', ()=>{
    expect(utils.sanitizeText(undefined)).toEqual('');
  });
});