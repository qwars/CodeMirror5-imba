
(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) define(["codemirror"], mod);
    else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    const htmlsrc = document.createElement("script");
    htmlsrc.src = 'https://unpkg.com/js-yaml/dist/js-yaml.js';
    document.body.appendChild(htmlsrc);
    
    let intrv = setInterval(function(){
        if( !!window.jsyaml && !clearInterval(intrv) ){
            CodeMirror.registerHelper("lint", "yaml", function(text) {
                var found = [];
                try { jsyaml.loadAll(text); }
                catch(e) {
                    var loc = e.mark,
                        from = loc ? CodeMirror.Pos(loc.line, loc.column) : CodeMirror.Pos(0, 0),
                        to = from;
                    found.push({ from: from, to: to, message: e.message });
                }
                return found;
            });
        }
    });
});
