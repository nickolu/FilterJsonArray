const utils = require('./utilities.js');

class Filter {
  constructor(builder) {
    return builder.filteredData;
  }
}

class FilterBuilder  {
  constructor(arr) {
    this.data = arr;
    this.filteredData = arr;
  }

  firstCharacter(fieldName, criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      if (item[fieldName].split("")[0] === criteria) {
        return true;
      }
    });

    return this;
  }

  stringMatch(fieldName, criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      
      if (typeof item[fieldName] === "string") {
        const text = utils.sanitizeText(item[fieldName]);
        criteria = utils.sanitizeText(criteria);

        return text.includes(criteria);
      }
    });
    
    return this;
  }

  stringMatchAny(criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      const jsonString = utils.sanitizeText(JSON.stringify(item));
      
      return jsonString.includes(criteria);
    });
    
    return this;
  }

  build() {
    return new Filter(this);
  }
}


module.exports = FilterBuilder;
