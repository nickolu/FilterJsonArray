const utils = require('./utilities.js');


class FilterBuilder {
  constructor(builder) {
    return builder.filteredData;
  }
}

class Filter  {
  constructor(arr) {
    if (Array.isArray(arr)) {
      this.data = arr;
      this.filteredData = arr;  
    } else {
      this.filteredData = [];
    }
  }

  /**
   * only objects where the first character of a field matches the criteria
   * @param {string} fieldName 
   * @param {string} criteria 
   */
  firstCharacter(fieldName, criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      if (item[fieldName].split("")[0] === criteria) {
        return true;
      }
    });

    return this;
  }

  /**
   * only objects which have a specific substring in a given field
   * @param {string} fieldName 
   * @param {string} criteria 
   */
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

  /**
   * only objects which have a specific substring anywhere in a stringified version of the object
   * @param {string} criteria 
   */
  stringMatchAny(criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      const jsonString = utils.sanitizeText(JSON.stringify(item));
      
      return jsonString.includes(criteria);
    });
    
    return this;
  }

  /**
   * only objects where the given field is a number and its value is between two given numbers
   * @param {string} fieldName 
   * @param {number} startValue 
   * @param {number} endValue 
   */
  range(fieldName, startValue, endValue) {
    this.filteredData = this.filteredData.filter((item)=>{
      const intValue = Number(item[fieldName]);
      if (intValue >= startValue && intValue <= endValue) {
        return true;
      }
    });
    
    return this;
  }

  /**
   * only objects where the given field is a number and its value is greater than or equal to a given point
   * @param {string} fieldName 
   * @param {number} criteria 
   */
  minimum(fieldName, criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      const itemValue = Number(item[fieldName]);
      if (criteria <= itemValue) {
        return true;
      }
    });
    
    return this;
  }

  /**
   * only objects where the given field is a number and its value is less than or equal to a given point
   * @param {string} fieldName 
   * @param {number} criteria 
   */
  maximum(fieldName, criteria) {
    this.filteredData = this.filteredData.filter((item)=>{
      const itemValue = Number(item[fieldName]);
      if (criteria >= itemValue) {
        return true;
      }
    });
    
    return this;
  }

  build() {
    return new FilterBuilder(this);
  }
}

module.exports = Filter;
