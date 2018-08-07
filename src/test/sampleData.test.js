const sampleData = require('./sampleData.js');

describe('sampleData',()=>{
  it('should not have changed',()=>{
    expect(sampleData).toMatchSnapshot();
  });
});
