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

describe('range',()=>{
  it('should filter',()=>{
    const jsonArray = sampleData.simpleDataArrays["numbers"];
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .range('a',2,5)
      .build();
    
    expect(filteredData).toEqual([
      {
        "a": "2",
        "b": "8",
        "c": "14"
      },
      {
        "a": "3",
        "b": "9",
        "c": "15"
      },
      {
        "a": "4",
        "b": "10",
        "c": "16"
      },
      {
        "a": "5",
        "b": "11",
        "c": "17"
      }
    ]);
  })
});

describe('minimum',()=>{
  it('should filter',()=>{
    const jsonArray = sampleData.simpleDataArrays["numbers"];
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .minimum('b',8)
      .build();
    
    expect(filteredData).toEqual([
      {
        "a": "2",
        "b": "8",
        "c": "14"
      },
      {
        "a": "3",
        "b": "9",
        "c": "15"
      },
      {
        "a": "4",
        "b": "10",
        "c": "16"
      },
      {
        "a": "5",
        "b": "11",
        "c": "17"
      },
      {
        "a": "6",
        "b": "12",
        "c": "18"
      }
    ]);
  })
});

describe('maximum',()=>{
  it('should filter',()=>{
    const jsonArray = sampleData.simpleDataArrays["numbers"];
    const filter = new FilterBuilder(jsonArray);
    const filteredData = filter
      .maximum('c',15)
      .build();
    
    expect(filteredData).toEqual([
      {
        "a": "1",
        "b": "7",
        "c": "13"
      },
      {
        "a": "2",
        "b": "8",
        "c": "14"
      },
      {
        "a": "3",
        "b": "9",
        "c": "15"
      }
    ]);
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

