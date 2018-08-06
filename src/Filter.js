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

  range(fieldName, startValue, endValue) {
    this.filteredData = this.filteredData.filter((item)=>{
      const intValue = Number(item[fieldName]);
      if (intValue >= startValue && intValue <= endValue) {
        return true;
      }
    });
    
    return this;
  }

  minimum(fieldName, val) {
    this.filteredData = this.filteredData.filter((item)=>{
      const itemValue = Number(item[fieldName]);
      if (val <= itemValue) {
        return true;
      }
    });
    
    return this;
  }

  maximum(fieldName, val) {
    this.filteredData = this.filteredData.filter((item)=>{
      const itemValue = Number(item[fieldName]);
      if (val >= itemValue) {
        return true;
      }
    });
    
    return this;
  }

  build() {
    return new Filter(this);
  }
}


module.exports = FilterBuilder;
