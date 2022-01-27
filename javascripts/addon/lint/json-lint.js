
(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) define(["codemirror"], mod);
    else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    const htmlsrc = document.createElement("script");
    htmlsrc.src = 'https://unpkg.com/jsonlint/web/jsonlint.js';
    document.body.appendChild(htmlsrc);
    
    let intrv = setInterval(function(){
        if( !!window.jsonlint && !clearInterval(intrv) ){
            CodeMirror.registerHelper("lint", "json", function(text) {
                var found = [];
                var jsonlint = window.jsonlint.parser || window.jsonlint
                jsonlint.parseError = function(str, hash) {
                    var loc = hash.loc;
                    found.push({from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
                                to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
                                message: str});
                };
                try { jsonlint.parse(text); }
                catch(e) {}
                return found;
            });
        }
    });
});
