
(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) define(["codemirror"], mod);
    else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    const htmlsrc = document.createElement("script");
    htmlsrc.src = 'https://unpkg.com/csslint/dist/csslint.js';
    document.body.appendChild(htmlsrc);
    
    let intrv = setInterval(function(){
        if( !!window.CSSLint && !clearInterval(intrv) ){
            CodeMirror.registerHelper("lint", "css", function(text, options) {
                let found = [];
                let results = CSSLint.verify(text, options)
                let messages = results.messages
                let message = null;
                for ( var i = 0; i < messages.length; i++) {
                    message = messages[i];
                    let startLine = message.line -1;
                    let endLine = message.line -1;
                    let startCol = message.col -1;
                    let endCol = message.col;
                    found.push({
                        from: CodeMirror.Pos(startLine, startCol),
                        to: CodeMirror.Pos(endLine, endCol),
                        message: message.message,
                        severity : message.type
                    });
                }
                if ( !found.length ) {
                    let cm = document.querySelector('.CodeMirror :focus');
                    while( cm ) {
                        if( cm.CodeMirror ){
                            cm.CodeMirror.compiled = Object.assign( ( cm.CodeMirror.compiled || {} ), { css: { sourceCode: text } } );
                            break;
                        }
                        cm = cm.parentElement;
                    }
                    if ( Imba ) Imba.commit();
                }
                return found;
            });

        }
    });
});
