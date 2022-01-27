
(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) define(["codemirror"], mod);
    else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    const htmlsrc = document.createElement("script");
    htmlsrc.src = 'http://www.coffeelint.org/js/coffeelint.js';
    document.body.appendChild(htmlsrc);
    
    let intrv = setInterval(function(){
        if( !!window.coffeelint && !clearInterval(intrv) ){
            CodeMirror.registerHelper("lint", "coffeescript", function(text) {
                var found = [];
                var parseError = function(err) {
                    var loc = err.lineNumber;
                    found.push({from: CodeMirror.Pos(loc-1, 0),
                                to: CodeMirror.Pos(loc, 0),
                                severity: err.level,
                                message: err.message});
                };
                try {
                    var res = coffeelint.lint(text);
                    for(var i = 0; i < res.length; i++) {
                        parseError(res[i]);
                    }
                } catch(e) {
                    found.push({from: CodeMirror.Pos(e.location.first_line, 0),
                                to: CodeMirror.Pos(e.location.last_line, e.location.last_column),
                                severity: 'error',
                                message: e.message});
                }
                return found;
            });
        }
    });
});
