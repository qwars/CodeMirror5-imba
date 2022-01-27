
(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) define(["codemirror"], mod);
    else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    CodeMirror.registerHelper("lint", "imba", function(text, cm) {
        var found = [];
        const ImbaCompiler = require('imba/src/compiler/compiler');
        function itRegionError(e) {
            const terminator = e._options.tokens.filter(function(item){ return  ['TERMINATOR','INDENT'].includes( item._type ) })
            found.push({
                from: CodeMirror.Pos(0, 0),
                to: CodeMirror.Pos(2, 0),
                severity: 'error',
                message: e.message
            });
        }
        function itMetaError(e) {
            const terminator = e._options.tokens.slice(0, e._options.pos).filter(function(item){ return  ['TERMINATOR','INDENT'].includes( item._type ) })
            found.push({
                from: CodeMirror.Pos(terminator.length ? terminator.length - 1 : 0, 0),
                to: CodeMirror.Pos(terminator.length, 15),
                severity: 'error',
                message: e.message.split(/\]\:/)[1]
            });
        }
        try {
            let filename = 'Methods';
            let source = text;
            if ( text.match(/def\s+initialize/) ){
                filename = 'Class';
                text = 'class ClassCompilerCodeMirrorStateTemp\n\t' + text.replace(/\n/g, "\n\t");
            }
            else {
                if( text.match(/def\s+render/) ){ filename = 'Tag'; }
                else text += '\ndef render\n\t<self>'
                text = 'tag TagCompilerCodeMirrorStateTemp\n\t' + text.replace(/\n/g, "\n\t");
            }
            let compiled = ImbaCompiler.compile( text, { filename: filename } );
            if ( Imba ) {
                let cm = Imba.root().querySelector('.CodeMirror :focus');
                while( cm ) {
                    if( cm._dom.CodeMirror ) {
                        cm._dom.CodeMirror.compiled = Object.assign(
                            ( cm._dom.CodeMirror.compiled || {} ),
                            {
                                imba: Object.assign( compiled, { compiler: ImbaCompiler.compile } )
                            });
                        cm._dom.CodeMirror.compiled.imba.sourceCode = cm._dom.CodeMirror.getValue();
                        break;
                    }
                    cm = cm.parent();
                }
                Imba.commit();
            }
        }
        catch(e) {
            console.log(e)
            if (e.region) itRegionError(e)
            else itMetaError(e)
        }
        return found;
    });

});
