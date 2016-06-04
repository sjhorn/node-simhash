void function() {
    'use strict';
    var crc32 = require('crc-32');
    var natural = require('natural');

    module.exports = {
        compare: compare,
        hammingWeight: hammingWeight,
        shingles: shingles,
        jaccardIndex: jaccardIndex,
        createBinaryString: createBinaryString,
        shingleHashList: shingleHashList
    }

    function compare(file1, file2) {
        var hash1 = simhash(file1);
        var hash2 = simhash(file2);
        var simhashval = similarity(hash1, hash2);
        var jaccard = jaccardIndex(shingles(file1), shingles(file2));
        console.log("File1 simhash:", createBinaryString(hash1));
        console.log("File2 simhash:", createBinaryString(hash2));
        console.log( "Similarity is "+simhashval+" (%d%% similar)", Math.round(simhashval * 100)  );
        console.log( "Jaccard index is "+jaccard+" (%d%% similar)", Math.round(jaccard * 100) );
    }

    function hammingWeight(l) {
        var c;
        for(c = 0; l; c++) {
          l &= l-1;
        }
        return c;
    }

    function similarity(simhash1, simhash2) {
        return hammingWeight((simhash1 & simhash2)) / hammingWeight((simhash1 | simhash2));
    }

    function shingleHashList(str) {
        var list = [];
        for (var word of shingles(str, 2)) {
            list.push(crc32.str(word) & 0xffffffff);
        }
        return list;
    }

    function shingles(original, kshingles=2) {
        var words = new natural.WordTokenizer().tokenize(original);
        var shingles = new Set();
        for (var index = 0; index < words.length-kshingles; index++) {
          var list = [];
          for(var j = 0; j < kshingles; j++) {
            list.push(words[j+index].toLowerCase());
          }
          shingles.add(list.join(" "));
        }
        return shingles;
    }

    function simhash(str) {
        var shingles = shingleHashList(str);
        var mask = 0x1;
        var simhash = 0x0;
        for(var i = 0; i < 64; i++) {
          var sim = 0;
          for(var s of shingles) {
              sim +=  ((s & mask) == mask) ? 1 : -1;
          }
          simhash |= (sim > 0 ? mask : 0x0);
          mask <<= 1;
        }
        return simhash;
    }

    function jaccardIndex(set1, set2) {
      var total = set1.size + set2.size;
      var intersection = 0;
      for(var shingle of set1 ) {
        if(set2.has(shingle)) {
          intersection++;
        }
      }
      var union = total - intersection;
      return intersection / union;
    }

    function createBinaryString (nMask) {
      for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
           nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
      return sMask;
    }

}.call(this);
