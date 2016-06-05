var exec = require('child_process').exec;

exports['Cli shows Help'] = function(test) {
    exec('node lib/cli.js -h', function(error, stdout, stderr) {
        if (error != null) {
            test.ok(false, "cli does not successfully show help");
        }
        test.done();
    })
}

exports['Cli Compare Files'] = function(test) {
    exec('node lib/cli.js test/sample1.txt test/sample2.txt', function(error, stdout, stderr) {
        if (error != null) {
            test.ok(false, "cli does not successfully compare files");
        } else {
            test.ok(stdout.indexOf("Simhash similarity is") != -1, "Failed to display summary");
        }
        test.done();
    })
}

exports['Cli Compare sites'] = function(test) {
    exec('node lib/cli.js https://raw.githubusercontent.com/sjhorn/node-simhash/master/LICENCE https://raw.githubusercontent.com/sjhorn/node-simhash/master/LICENCE', function(error, stdout, stderr) {
        if (error != null) {
            test.ok(false, "cli does not successfully compare pages");
        } else {
            test.ok(stdout.indexOf("Simhash similarity is") != -1, "Failed to display summary");
        }
        test.done();
    })
}
