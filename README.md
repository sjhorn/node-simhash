# node-simhash

A simple command line tool for comparing text files using the simhash algorithm and contrasting with the jaccard index.

[![Build Status](https://travis-ci.org/sjhorn/node-simhash.svg?branch=master)](https://travis-ci.org/sjhorn/node-simhash)


## References

[Near duplicate detection (moz.com)](https://moz.com/devblog/near-duplicate-detection/)

## Installation

### If you have just clone this like then run the following
````
npm install
npm link
````

Or if you would like to install globally
````
npm install https://github.com/sjhorn/node-simhash -g
````

## Command line tool usage

Using node
````
simhash file1.txt file2.txt

simhash https://file.com/page1.html https://file.com/page2.html

````

### Using lib
````js
var simhash = require('node-simhash');

simhash.compare(string1, string2);

````

### Methods
#### <a name="summary"></a>.summary(file1, file2)
Compare two text strings using both simhash and jaccard index and print a summary

#### <a name="compare"></a>.compare(file1, file2)
Compare two text strings using both simhash and jaccard index


#### <a name="hammingWeight"></a>.hammingWeight(number)

Count the binary ones in a number.

#### <a name="shingles"></a>.shingles(string, words_per_single=2)

Convert string to set of shingles using the default of 2 words per shingle and tokenize using the natural libraries default tokenizer.

#### <a name="jaccardIndex"></a>.jaccardIndex(string1, string2)

Compare two strings by tokeniseing and then compare the intersection of shingles to the union of shingles.

#### <a name="createBinaryString"></a>.createBinaryString(number)

Print a 32-bit number as a binary string of 32 characters

#### <a name="shingleHashList"></a>.shingleHashList(set)

Convert a set of shingles to a set of crc-32 hashes.
