var editor = CodeMirror.fromTextArea(document.getElementById("pad"), {
    lineNumbers: true,
    mode: {
        name: "gfm",
        highlightFormatting: true
    },
    //fixedGutter: true,
    cursorHeight: 0.85,
    //placeholder: "Enjoy Markdown Writing ...",
    indentWithTabs: true,
    autofocus: true,
    lineSeparator: "\n",
    lineWrapping: true,

    autoCloseTags: true,
    matchTags: { bothTags: true },

    autoCloseBrackets: {
        pairs: "\"\"**//__()[]{}''``$$",
        triples: "`",
        explode: "[]{}",
        override: true
    },
    matchBrackets: true,

    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
    styleSelectedText: true,
    scrollbarStyle: "overlay",
    styleActiveLine: true,

    extraKeys: {
        "Ctrl-Q": function(editor) {
            editor.foldCode(editor.getCursor());
        },
        "Ctrl-J": "toMatchingTag",
        Enter: "newlineAndIndentContinueMarkdownList"
    },
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});

/*editor.on("mousedown", function(cm, e) {
    console.log(cm.getDoc().getCursor());
});*/
