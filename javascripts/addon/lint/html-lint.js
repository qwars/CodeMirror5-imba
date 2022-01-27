(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) define(["codemirror"], mod);
    else mod(CodeMirror, window.HTMLHint);
})(function(CodeMirror) {
    "use strict";

    var defaultRules = {
        "tagname-lowercase": true,
        "attr-lowercase": true,
        "attr-value-double-quotes": true,
        "doctype-first": false,
        "tag-pair": true,
        "spec-char-escape": true,
        "id-unique": true,
        "src-not-empty": true,
        "attr-no-duplication": true
    };

    const htmlsrc = document.createElement("script");
    htmlsrc.src = 'https://unpkg.com/htmlhint/dist/htmlhint.js';
    document.body.appendChild(htmlsrc);

    let intrv = setInterval(function(){
        if ( !!window.HTMLHint && !clearInterval( intrv ) ) {
            CodeMirror.registerHelper("lint", "html", function(text, options) {
                var found = [];
                if (!HTMLHint) HTMLHint = window.HTMLHint;
                if (HTMLHint && !HTMLHint.verify) {
                    if(typeof HTMLHint.default !== 'undefined') {
                        HTMLHint = HTMLHint.default;
                    } else {
                        HTMLHint = HTMLHint.HTMLHint;
                    }
                }
                console.log( 'HTMLHint.verify', HTMLHint.verify )
                var messages = HTMLHint.verify(text, options && options.rules || defaultRules);
                for (var i = 0; i < messages.length; i++) {
                    var message = messages[i];
                    var startLine = message.line - 1, endLine = message.line - 1, startCol = message.col - 1, endCol = message.col;
                    found.push({
                        from: CodeMirror.Pos(startLine, startCol),
                        to: CodeMirror.Pos(endLine, endCol),
                        message: message.message,
                        severity : message.type
                    });
                }
                return found;
            });
        }
    });    
});
