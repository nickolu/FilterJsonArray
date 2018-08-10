const utils = require('./utilities.js');



class FilterBuilder {
  constructor(builder) {
    return builder.filteredData;
  }
}

class FilterJsonArray  {
  constructor(initialJsonArray) {
    this.filteredData = Array.isArray(initialJsonArray) 
      ? initialJsonArray 
      : [];
  }

  /**
   * filter the current jsonArray with provided filter function
   */
  filterData(filterFunction) {
    this.filteredData = this.filteredData.filter(filterFunction);
  }

  /**
   * filter by objects which have a specific first character in a certain field
   */
  firstCharacter(fieldName, criteria) {
    this.filterData((item)=>{
      if (item[fieldName].split("")[0] === criteria) {
        return true;
      }
    });

    return this;
  }

  /**
   * filter by objects which have a certain substring in a certain field
   */
  stringMatch(fieldName, criteria) {
    this.filterData((item)=>{
      if (typeof item[fieldName] === "string") {
        const text = utils.sanitizeText(item[fieldName]);
        criteria = utils.sanitizeText(criteria);

        return text.includes(criteria);
      }
    });
    
    return this;
  }
  
   /**
   * filter by objects which have a specific substring anywhere in a stringified version of the object
   */
  stringMatchAny(criteria) {
    this.filterData((item)=>{
      const jsonString = utils.sanitizeText(JSON.stringify(item));
      
      return jsonString.includes(criteria);
    });
    
    return this;
  }


  /**
   * filter by objects which have a number within a specified range in a certain field
   */
  range(fieldName, startValue, endValue) {
    this.filterData((item)=>{
      const intValue = Number(item[fieldName]);
      if (intValue >= startValue && intValue <= endValue) {
        return true;
      }
    });
    
    return this;
  }

  /**
   * filter by objects which have a number greater than or equal to the critia in a certain field
   */
  minimum(fieldName, criteria) {
    this.filterData((item)=>{
      const itemValue = Number(item[fieldName]);
      if (criteria <= itemValue) {
        return true;
      }
    });
    
    return this;
  }

  /**
   * filter by objects which have a number less than or equal to the critia in a certain field
   */
  maximum(fieldName, criteria) {
    this.filterData((item)=>{
      const itemValue = Number(item[fieldName]);
      if (criteria >= itemValue) {
        return true;
      }
    });
    
    return this;
  }

  filter() {
    return new FilterBuilder(this);
  }
}

module.exports = FilterJsonArray;
