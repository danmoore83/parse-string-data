# parse-string-data
Parse data (object literal / array) from a text string and return a data structure

This is particularly useful for extracting data from a text string, that doesnt conform to the JSON spec and will fail when using JSON.parse. 
e.g. data stored as a javascript object, without quotes surrounding the key:value pairs

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

The NPM distribution is shipped with the following files:

- __index.js__: Babel transpiled version for general use
- __index.es6.js__ - Original ES6 version for platforms that support ES6

### Installing

Run the following from your projects' root folder to install and save as a dependency in your package.json

```
npm install parse-string-data --save
```

### Usage 
Firstly, lets create a string containing some data, and require the module
```
var parseStringData = require('parse-string-data');
var str = 'Lorem ipsum dolor sit amet, consectetur adiplising elit. { foo: true, bar: false, buzz: bla }';
```

Call the module with the string as it's first argument.

```
var parsedData = parseStringData(str);
```

The data in the above string will be extracted and returned in a data structure. In this case, an Object.
```
{
 foo: true,
 bar: false,
 buzz: 'bla'
}
```
#### Recursion
When parsing the results, parse-string-data recursively checks the extracted value for data, allowing the data to be many levels deep

```
var str = 'Lorem ipsum dolor sit amet, consectetur adiplising elit. { foo: true, bar: false, buzz: [0, 10, asdf], beer: { type: paleale, size: pint, favourite: true, sizes: [pot, schooner, pint]  }  }';
```
Parsing the above string will result in the following: 

```
{
  foo: true,
  bar: false,
  buzz: [
    0: 0, 
    1: 10, 
    2: 'asdf'
  ],
  beer: { 
    type: paleale,
    favourite: true,
    size: pint, 
    sizes: [
      0: 'pot', 
      1: 'schooner', 
      2: 'pint'
    ]
  }
}
```

#### Data Formatting
During parsing, the data values are run through a formatter to avoid returning values as strings.
e.g.
- 'true' and 'false' are formatted as Boolean
- '0', '10', '-1' are formatted as a Number
- 'null' is formatted as a null Object.

Additional formatting can be submitted by a pull-request.


## Contributing

Please read [CONTRIBUTING.md](https://github.com/wildpixeldesign/parse-string-data/blob/master/CONTRIBUTING.md) for details on the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wildpixeldesign/parse-string-data/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
