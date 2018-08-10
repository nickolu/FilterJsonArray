const FilterJsonArray = require('../FilterJsonArray.js');
const sampleData = require('./sampleData.js');

describe('FilterJsonArray',()=>{
  it('should return an empty array if the data argument is not an array',()=>{
    expect(new FilterJsonArray(sampleData).filter()).toEqual([]);
  });
  
});

describe('firstCharacter',()=>{
  it('should filter the objects by the first character of the given fieldName',()=>{
    const jsonArray = sampleData.simpleDataArrays["short"];
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .firstCharacter('b','f')
      .filter();
    
    expect(filteredData).toEqual([
      jsonArray[0],
      jsonArray[1]
    ]);
  })
});

describe('stringMatch',()=>{
  it('should return an array with three objects when filtering the spells by "duration" === "instantaneous"',()=>{
    const jsonArray = sampleData.spellsArray;
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .stringMatch('duration','instantaneous')
      .filter();
      
    expect(filteredData.length).toEqual(3);
  });

  it('should return none of the provided data when given a bad fieldName', ()=>{
    const jsonArray = sampleData.simpleDataArrays["long"];
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .stringMatch('duration','instantaneous')
      .filter();
      
    expect(filteredData.length).toEqual(0);
  });
});

describe('stringMatchAny',()=>{
  it('should return an array with three objects when filtering the spells by "instantaneous"',()=>{
    const jsonArray = sampleData.spellsArray;
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .stringMatchAny('instantaneous')
      .filter();
    
    expect(filteredData.length).toEqual(3);
  })
});

describe('range',()=>{
  it('should return objects where the field "a" has a value between 2 and 5',()=>{
    const jsonArray = sampleData.simpleDataArrays["numbers"];
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .range('a',2,5)
      .filter();
    
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
  it('should return objects where the field "b" has a value of 8 or greater',()=>{
    const jsonArray = sampleData.simpleDataArrays["numbers"];
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .minimum('b',8)
      .filter();
    
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
  it('should return objects where the field "c" has a value of 15 or less',()=>{
    const jsonArray = sampleData.simpleDataArrays["numbers"];
    const filter = new FilterJsonArray(jsonArray);
    const filteredData = filter
      .maximum('c',15)
      .filter();
    
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

describe('chaining filters', ()=>{
  it('should return the json array with all other items removed', ()=>{
    const sorcererSpells = new FilterJsonArray(sampleData["spellsArray"])
      .stringMatchAny('sorcerer')
      .stringMatch('school','necromancy')
      .filter();

    expect(sorcererSpells).toEqual([sampleData["spellsArray"][0]]);
  });
});
