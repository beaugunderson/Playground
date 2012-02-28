#!/usr/bin/env node

var parser = require("./explore").parser;
var _ = require("underscore");

parser.yy = {
   data: {
      values: [
         "aabbccddee",
         "abcde",
         "abcdef"
      ]
   },
   _: _,
   apply: function(data, f) {
      return _.map(data, function(datum) {
         return f(datum);
      });
   }
};

console.log('uniqueCharacters(values)', parser.parse("uniqueCharacters(values)"));
console.log('sqrt(uniqueCharacters(values))', parser.parse("sqrt(uniqueCharacters(values))"));
console.log('add(sqrt(uniqueCharacters(values)), 5)', parser.parse("add(sqrt(uniqueCharacters(values)), 5)"));
