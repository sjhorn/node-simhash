void function() {
    'use strict';
    var simhash = require('./simhash.js');
    var fetch = require('node-fetch');
    var fs = require('fs');
    var argv = require('yargs')
        .usage('Usage: $0 <command> [options]')
        .demand(2)
        .example('$0 file1.htm http://t.com/file2.htm')
        .help('h')
        .alias('h', 'help')
        .argv;

    var f1 = argv._.shift();
    var f2 = argv._.shift();

    if(f1.startsWith("http") && f2.startsWith("http")) {
        console.log("Downloading files to compare...");
        fetch(f1).then(r1 => r1.text()).then(t1 => {
          fetch(f2).then(r2 => r2.text()).then(t2 => {
              simhash.summary(t1, t2);
          }).catch(e => console.error("Failed to download "+f2+" "+e))
        }).catch(e => console.error("Failed to download "+f1+" "+e));
    } else if(f1.startsWith("http") && !f2.startsWith("http")) {
        console.log("Downloading file to compare...");
        fetch(f1).then(r1 => r1.text()).then(t1 => {
          simhash.summary(t1, fs.readFileSync(f2, "utf8"));
        }).catch(e => console.error("Failed to download "+f1+" "+e));
    } else if(!f1.startsWith("http") && f2.startsWith("http")) {
        console.log("Downloading file to compare...");
        fetch(f2).then(r2 => r2.text()).then(t2 => {
          simhash.summary(fs.readFileSync(f1, "utf8"),t2);
        }).catch(e => console.error("Failed to download "+f2+" "+e));
    } else {
        simhash.summary(fs.readFileSync(f1, "utf8"), fs.readFileSync(f2, "utf8"));
    }
}.call(this);
