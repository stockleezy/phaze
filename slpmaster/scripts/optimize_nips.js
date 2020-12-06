"use strict";
var args = process.argv;
if (args.length > 2) {
    var script = args[2];
    console.log("script length: " + script.length / 2);
    var index = script.search(args[3]);
    console.log("index at " + index);
    var count = (script.length - index - 2) / 2;
    var orgStr = script.slice(index);
    var newStr = args[3].slice(0, 2) + "6b";
    console.log(count);
    if (count > 3) {
        var isOdd = count % 2;
        count -= isOdd;
        while (count > 0) {
            count -= 2;
            newStr = newStr.concat("6d");
        }
        if (isOdd) {
            newStr = newStr.concat("75");
        }
        newStr = newStr.concat("6c");
        console.log(script.replace(orgStr, newStr));
    }
    else {
        console.log("No optimization made.");
    }
}
//# sourceMappingURL=optimize_nips.js.map