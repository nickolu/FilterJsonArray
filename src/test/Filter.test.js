const FilterBuilder = require('../Filter.js');
const sampleData = require('./sampleData.js');

describe('firstCharacter',()=>{
  it('should filter the objects by the first character of the given fieldName',()=>{
    const jsonArray = sampleData.simpleDataArrays["short"];
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .firstCharacter('b','f')
      .build();
    
    expect(filteredData).toEqual([
      jsonArray[0],
      jsonArray[1]
    ]);
  })
});

describe('stringMatch',()=>{
  it('should return an array with three objects when filtering the spells by "duration" === "instantaneous"',()=>{
    const jsonArray = sampleData.spellsArray;
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .stringMatch('duration','instantaneous')
      .build();
      
    expect(filteredData.length).toEqual(3);
  });

  it('should return none of the provided data when given a bad fieldName', ()=>{
    const jsonArray = sampleData.simpleDataArrays["long"];
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .stringMatch('duration','instantaneous')
      .build();
      
    expect(filteredData.length).toEqual(0);
  });
});

describe('stringMatchAny',()=>{
  it('should return an array with three objects when filtering the spells by "instantaneous"',()=>{
    const jsonArray = sampleData.spellsArray;
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .stringMatchAny('instantaneous')
      .build();
    
    expect(filteredData.length).toEqual(3);
  })
});

// describe('',()=>{
//   it('should filter',()=>{
//     const jsonArray = sampleData;
//     const filter = new FilterBuilder(jsonArray);
//     const filteredData = filter
//       .firstCharacter('b','f')
//       .build();
    
//     expect(filteredData).toEqual([
      
//     ]);
//   })
// });

