var //showdown = require ('showdown'),
    //CodeMirror = require('codemirror'),
    //chart = require('chart.js')
    /* requires */
    converter = require("marked"),
    mermaid = require("mermaid"),
    emoji = require("node-emoji"),
    asciimath2latex = require("asciimath-to-latex"),
    /* single elements && arrays */
    mermaidElem = mermaid.mermaidAPI,
    charts = [],
    containers = ["success", "info", "warning", "danger"],
    /* renderers*/
    renderer = new converter.Renderer(), //renderer to be customized
    origins = new converter.Renderer(), //renderer with original settings
    /* configuration objects */
    mermaid_config = {
        startOnLoad: true,
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "cardinal"
        },
        sequence: {
            useMaxWidth: true
        },
        securityLevel: "loose"
    },
    marked_config = {
        pedantic: false,
        gfm: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        xhtml: false
    };

mermaidElem.initialize(mermaid_config);

var onMissing = function(name) {
    //on missing emoji in emojify
    return name;
};

function makeid(len) {
    //used for setting a random ID for UML graph
    var text = new Array(len);
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < len; i++) text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
    return text.join("");
}

renderer.code = function(code, language) {
    var id = makeid(5); //random id for new classes
    if (language === "UML" || language === "uml") {
        //for uml diagrams
        var svg = mermaidElem.render(id, code);
        return '<div class="mermaid" align="center">' + svg + "</div>";
    } else if (language === "katex" || language === "latex") {
        var delim = "$$",
            code_arr = code.split("\n");
        for (var i = 0; i < code_arr.length; i++) {
            var a = code_arr[i];
            code_arr[i] = delim + a + delim;
        }
        var output = code_arr.join("");
        return output;
    } else if (language === "ascii") {
        //for asciimath
        var delim = "$$",
            code_arr = code.split("\n");
        for (var i = 0; i < code_arr.length; i++) {
            var a = asciimath2latex(code_arr[i]);
            code_arr[i] = delim + a + delim;
        }
        var output = code_arr.join("");
        return output;
    } else if (language === "chart") {
        //for charts
        charts.push(JSON.parse(code));
        return '<canvas id="' + id + '" width="400" height="400"></canvas>';
    } else if (containers.includes(language)) {
        //for custom containers
        return '<div class="' + language + '" ><p>' + marked.parse(code) + "</p></div>";
    } else if (language === "" || !Boolean(language)) {
        //if no language is defined or tab is used
        return origins.code(code, "c"); //use c as default
    } else if (language === "htmlmixed") {
        return origins.code(code, "html");
    }
    return origins.code(code, language);
};

renderer.listitem = function(text, task) {
    //to hide bullet point in front of task list
    if (task) {
        return '<li class="task-list-item">' + text + "</li>";
    }
    return origins.listitem(text, task);
};

renderer.codespan = function(code) {
    //to render inline ascii
    if (code[0] === "@" && code.slice(-1) === "@") {
        code = code.slice(1, -1);
        return "$" + asciimath2latex(code) + "$";
    }
    return origins.codespan(code);
};

renderer.text = function(text) {
    //create a special tag for font-awesome
    var txt_arr = text.split(" ");
    for (var i = 0; i < txt_arr.length; i++) {
        var txt = txt_arr[i];
        if (txt.includes(":fa-") && txt.charAt(txt.length - 1) === ":") {
            txt_arr[i] = '<i class="fa ' + txt + '"></i>';
        }
    }
    return origins.text(txt_arr.join(" "));
};

function setLines() {
    //to set lineNumbers for code blocks
    var pre = document.getElementById("markdown").getElementsByTagName("pre"),
        pl = pre.length;
    for (var i = 0; i < pl; i++) {
        pre[i].className += "line-numbers";
    }
}

function load() {
    var markdownArea = document.getElementById("markdown"),
        pad = document.getElementById("pad");
    var previousMarkdownValue, html;

    // convert text area to markdown html
    var convertTextAreaToMarkdown = function() {
        var markdownText = editor.getValue();
        previousMarkdownValue = markdownText;

        /*convert markdown, emojify,
         apply Prism css and put text in area*/
        html = converter(markdownText, {
            renderer: renderer,
            marked_config
        });
        html = emoji.emojify(html, onMissing);
        prismify(); //apply Prism for syntax highlighting
        markdownArea.innerHTML = html;

        //draw charts
        var cvs = document.getElementsByTagName("canvas");
        for (var i = 0; i < cvs.length; i++) {
            var ctx = cvs[i];
            var grph = charts[i]; //string definition of graph
            var myChart = new Chart(ctx, grph);
        }
        //---

        //---math expressions
        renderMathInElement(document.body, {
            displayMode: true,
            throwOnError: false, // allows katex to fail silently
            errorColor: "#ff0000",
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "\\[", right: "\\]", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false }
            ]
        });

        setLines(); //set line numbers in rendererd codeblocks
        editor.save();
        //---
    };

    var didChangeOccur = function() {
        if (previousMarkdownValue != editor.getValue()) {
            charts.splice(0, charts.length); //empty chart objects array to avoid overflow
            return true;
        }
        return false;
    };

    // check every second if the text area has changed
    setInterval(function() {
        if (didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    // ignore if on home page
    /*if(document.location.pathname.length > 1){
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            console.log(pad.value);
            editor.setValue(pad.value);
            editor.refresh();
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });        
    }
    */

    // convert on page load
    convertTextAreaToMarkdown();
}

window.onload = load;
