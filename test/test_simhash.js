var simhash = require('../lib/simhash.js');
var fs = require('fs');

exports.compareSmallString = function(test) {
    test.equal(simhash.compare('I am working', 'I am working'), 1);
    test.done();
}

exports.compareSameFile = function(test) {
    var file1 = fs.readFileSync("test/sample1.txt", "utf8");
    test.equal(simhash.compare(file1, file1), 1);
    test.done();
}

exports.compareSimilarFile = function(test) {
    var file1 = fs.readFileSync("test/sample1.txt", "utf8");
    var file2 = fs.readFileSync("test/sample2.txt", "utf8");
    var estimate = Math.round(simhash.compare(file1, file2) * 100);
    test.equal(estimate, 67);
    test.done();
}
