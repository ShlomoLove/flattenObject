// input is nested object
// output is object
//create an object that will be the output;

// create variable for the string for the key
// if there is no input then create new string, else use string from recursion call;
//create variable or string concat the key of string
//make that new string into a key;
//if the value is a arroy or object concat to the string and continue in the loop
//if the value is typeof a string then we create that as the value of the new key



const flattenObject = (obj, str, outObj) => {
  // variable to control output - checks if there is argument
  let output = outObj ? outObj : {};
  // variable to follow path of key string
  let strPath = str ? str : '';
  // a separate varioable for key to allow path to reset
  let keyStr = strPath;

  // this loop will loop through an array and add index to the string
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (i > 0) {
        // this conditional removes the previous index to apply the appropriate index without duplicate
        keyStr = keyStr.slice(0, -2)
      }
      // add index to string
      keyStr += `.${i}`
      strPath = keyStr;
      //use recursion to enter further into nested object
      flattenObject(obj[i], strPath, output)
    }
  } else {
    // this is the loop for the object; 
    for (let key in obj) {
      // conditional checking key string to add necessary items and determine if it needs a .
      keyStr === '' ? keyStr += `${key}` : keyStr += `.${key}`;
      if (typeof obj[key] === 'string') {
        // create key value pair
        output[keyStr] = obj[key];
        keyStr = strPath;
      } else if (typeof obj[key] !== 'string') {
        //use recursion to enter further into nested object;
        flattenObject(obj[key], keyStr, output);
      }
    }
  }

  return output;
};

let jsonObj = '{ "first_name": "Homer",\
  "last_name": "Simpson",\
  "student_data": [\
    { "term": "Fall 2010",\
      "programs": [\
        { "code": "MA",\
          "name": "Master of Arts",\
          "majors": [\
            { "code": "PH", "name": "Philosophy" },\
            { "code": "TH", "name": "Theology" }\
          ]\
        },\
        { "code": "MS",\
          "name": "Master of Science",\
          "majors": [\
            { "code": "CS", "name": "Computer Science" }\
          ]\
        }\
      ]\
    },\
    { "term": "Spring 2003",\
      "programs": [\
        { "code": "BS",\
          "name": "Bachelor of Science",\
          "majors": [\
            { "code": "CS", "name": "Computer Science" }\
          ]\
        }\
      ]\
    }\
  ]\
}';

let inputObj = JSON.parse(jsonObj);

console.log(flattenObject(inputObj))
