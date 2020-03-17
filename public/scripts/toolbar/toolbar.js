window.addEventListener("load", function() {
    const toolbar = document.getElementById("toolbar"),
        res = document.getElementsByClassName("resizer")[0],
        ed_wrap = document.getElementsByClassName("editor-wrap")[0],
        pre_wrap = document.getElementsByClassName("preview-wrap")[0],
        img_buttons = document.getElementsByClassName("docs-buttons")[0];
    /*var options = {
        aspectRatio: 16 / 9,
        //preview: '.img-preview',
        ready: function(e) {
            console.log(e.type);
        },
        cropstart: function(e) {
            console.log(e.type, e.detail.action);
        },
        cropmove: function(e) {
            console.log(e.type, e.detail.action);
        },
        cropend: function(e) {
            console.log(e.type, e.detail.action);
        },
        crop: function(e) {
            var data = e.detail;

            console.log(e.type);
            dataX.value = Math.round(data.x);
            dataY.value = Math.round(data.y);
            dataHeight.value = Math.round(data.height);
            dataWidth.value = Math.round(data.width);
            dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
            dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
            dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function(e) {
            console.log(e.type, e.detail.ratio);
        }
    }*/

    const undo_btn = toolbar.querySelector("[id=undo]"),
        redo_btn = toolbar.querySelector("[id=redo]"),
        search_btn = toolbar.querySelector("[id=search]"),
        erase_btn = toolbar.querySelector("[id=erase]"),
        modifiers = toolbar.querySelectorAll("[data-modifier]"),
        headings = toolbar.querySelectorAll("[data-level]"),
        hr_btn = toolbar.querySelector("[id=horizontal-rule]"),
        prefixes = toolbar.querySelectorAll("[data-prefix]"),
        code_btn = toolbar.querySelector("[id=code-icon]"),
        samples = toolbar.querySelectorAll("[data-sample]"),
        mode_btn = toolbar.querySelector("[id=switch-mode]"),
        hide_tool = toolbar.querySelector("[id=toggle-toolbar]"),
        toggle_ed = toolbar.querySelector("[id=toggle-editor]"),
        toggle_prev = toolbar.querySelector("[id=toggle-preview]"),
        import_btn = toolbar.querySelector("[id=import]"),
        download_btn = toolbar.querySelector("[id=download]"),
        resizer_btn = document.getElementById("resizer"),
        crop_button = toolbar.querySelector("[id=crop_tool]"),
        enl_button = toolbar.querySelector("[id=inc-size]"),
        dec_button = toolbar.querySelector("[id=dec-size]"),
        emoji_button = document.querySelector("[id=emoji-button]");

    var selection = "",
        doc = editor.getDoc(),
        cursor,
        line,
        pos;

    setInterval(function() {
        selection = editor.getSelection();
        doc = editor.getDoc();
        cursor = doc.getCursor(); // gets the line number in the cursor position
        line = doc.getLine(cursor.line); // get the line contents
        pos = {
            line: cursor.line
        };
    }, 1000);

    function show_hide_tb(e) {
        //for toolbar
        var top = res.style.top;
        if (top !== "0px") {
            res.style.top = "0";
            toolbar.style.visibility = "hidden";
            ed_wrap.style.top = "0.375rem";
            pre_wrap.style.top = "0.375rem";
            res.querySelector("[id=resizer]").title = "Show Toolbar";
        } else {
            res.style.top = "1.375rem";
            toolbar.style.visibility = "visible";
            ed_wrap.style.top = "1.75em";
            pre_wrap.style.top = "1.75em";
            res.querySelector("[id=resizer]").title = "Hide Toolbar";
        }
    }

    function toggle(button) {
        if (button === "toggle_prev") {
            ed_wrap.style.visibility = "visible";
            if (ed_wrap.style.width === "50%") {
                ed_wrap.style.width = "100%";
                pre_wrap.style.visibility = "hidden";
            } else {
                ed_wrap.style.width = "50%";
                pre_wrap.style.width = "50%";
                pre_wrap.style.visibility = "visible";
            }
        } else {
            pre_wrap.style.visibility = "visible";
            if (pre_wrap.style.width === "50%") {
                pre_wrap.style.width = "100%";
                ed_wrap.style.visibility = "hidden";
            } else {
                pre_wrap.style.width = "50%";
                ed_wrap.style.width = "50%";
                ed_wrap.style.visibility = "visible";
            }
        }
        editor.focus();
    }

    function handleFiles(files) {
        var file = files[0];
        if (!file) {
            return;
        } else {
            var type = file.type;
            var reader = new FileReader();
            if (type !== "image/jpeg") {
                reader.onload = function(e) {
                    var contents = e.target.result;
                    editor.setValue(contents);
                    editor.focus();
                };
                reader.readAsText(file);
            } else {
                var cont_div = document.getElementById("cont_div"),
                    image = document.getElementById("image_crop"),
                    conf_btn = document.getElementById("confirm"),
                    cancel_btn = document.getElementById("cancel");
                if (confirm("Do you want to edit this picture?")) {
                    reader.onload = function() {
                        cont_div.style.display = "block";
                        image.src = reader.result;
                        const cropper = new Cropper(image, {
                            crop(event) {
                                cont_div.style.marginLeft = "-" + cont_div.offsetWidth / 2 + "px";
                                cont_div.style.marginTop = "-" + cont_div.offsetHeight / 2 + "px";
                                image.src = cropper.getCroppedCanvas().toDataURL("image/jpeg");
                            }
                        });
                        /*var methods = img_buttons.querySelectorAll('[data-method]')
                        for (var i = 0; i < methods.length; ++i) {
                            (function() {
                                var method_btn = methods[i].querySelector('[data-original-title]');
                                method_btn.addEventListener('click', function() {
                                    eval(this.dataset.originalTitle);
                                }, false)
                            }())
                        }*/

                        img_buttons.querySelectorAll("[data-original-title]").forEach(item => {
                            item.addEventListener("click", event => {
                                eval(item.dataset.originalTitle);
                            });
                        });

                        conf_btn.onclick = function(e) {
                            insertTextAtCursor(doc, cursor, '\n###### Image\n\n<p><img src="' + image.src + '"></p>\n\n');
                            cont_div.style = "display: none";
                            cropper.destroy();
                            editor.focus();
                        };

                        cancel_btn.onclick = function(e) {
                            cont_div.style = "display: none";
                            cropper.destroy();
                            editor.focus();
                        };
                    };
                    reader.readAsDataURL(file);
                } else {
                    reader.onload = function() {
                        image.src = reader.result;
                        insertTextAtCursor(doc, cursor, '\n###### Image\n\n<p><img src="' + image.src + '"></p>\n\n');
                        editor.focus();
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    }

    function crop_image(img) {
        var cont_div = document.getElementById("cont_div"),
            image = document.getElementById("image_crop"),
            conf_btn = document.getElementById("confirm"),
            cancel_btn = document.getElementById("cancel");
        cont_div.style.display = "block";

        const cropper = new Cropper(img, {
            crop(event) {}
        });
    }

    //function emoji_modal(){}
    console.log(emoji_button);

    const picker = new EmojiButton();
    console.log(picker);

    picker.on("emoji", emoji => {
        //document.querySelector("input").value += emoji;
        insertTextAtCursor(doc, cursor, emoji);
    });

    emoji_button.addEventListener("click", () => {
        console.log(this);

        picker.togglePicker(emoji_button);
    });

    /*if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;
          uploadedImageName = file.name;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };*/

    function download(e) {
        // your CodeMirror textarea ID
        var textToWrite = document.getElementById("pad").value;

        // preserving line breaks
        var textToWrite = textToWrite.replace("/\n/g", "\r\n");

        var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });

        // filename to save as
        var fileNameToSaveAs = "download.md";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;

        // hidden link title name
        //downloadLink.innerHTML = "Downl";

        window.URL = window.URL || window.webkitURL;

        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        editor.focus();
    }

    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }

    function insertTextAtCursor(doc, cursor, text) {
        doc.replaceRange(text, cursor);
        editor.focus();
    }

    function replaceSelection(doc, text) {
        doc.replaceSelection(text);
        editor.focus();
    }

    function replaceLine(doc, text) {
        doc.replaceRange(text, { line: pos.line, ch: 0 }, { line: pos.line });
    }

    function insertTextAtCursorLine(doc, ch, text) {
        var cursor = doc.getCursor(); // gets the line number in the cursor position
        var line = doc.getLine(cursor.line); // get the line contents
        var pos = {
            ch: ch, //position on the line
            line: cursor.line //line on which the cursor is
        };
        // add the text
        doc.replaceRange(text, pos);
        editor.focus();
    }

    function insertText(doc, cursor, line, text) {
        if (line.length === 0 && doc.getLine(cursor.line - 1).length === 0) {
            // check if the current & previous lines are empty
            // add the text
            doc.replaceRange(text + "\n\n", pos);
        } else if (line.length === 0 && doc.getLine(cursor.line - 1).length !== 0) {
            // add a new line and the text
            doc.replaceRange("\n" + text + "\n\n", pos);
        } else {
            doc.replaceRange("\n\n" + text + "\n\n", pos);
        }
        editor.focus();
    }

    resizer_btn.addEventListener(
        "click",
        function() {
            show_hide_tb(event);
        },
        false
    );
    hide_tool.addEventListener(
        "click",
        function() {
            console.log(0);

            show_hide_tb(event);
        },
        false
    );

    toggle_ed.addEventListener(
        "click",
        function() {
            toggle("toggle_ed");
        },
        false
    );
    toggle_prev.addEventListener(
        "click",
        function() {
            toggle("toggle_prev");
        },
        false
    );
    erase_btn.addEventListener(
        "click",
        function() {
            editor.setValue("");
            //editor.clearHistory();
            editor.focus();
        },
        false
    );
    redo_btn.addEventListener(
        "click",
        function() {
            editor.redo();
            editor.focus();
        },
        false
    );
    undo_btn.addEventListener(
        "click",
        function() {
            editor.undo();
            editor.focus();
        },
        false
    );
    search_btn.addEventListener(
        "click",
        function() {
            editor.execCommand("find");
        },
        false
    );
    download_btn.addEventListener(
        "click",
        function() {
            download(event);
        },
        false
    );

    crop_button.addEventListener(
        "click",
        function() {
            if (true) {
                var cont_div = document.getElementById("cont_div"),
                    image = document.getElementById("image_crop"),
                    conf_btn = document.getElementById("confirm"),
                    cancel_btn = document.getElementById("cancel"),
                    img_data = $(line);
                console.log(img_data[0].firstElementChild.src);
                cont_div.style.display = "block";
                cont_div.style.marginLeft = "-" + cont_div.offsetWidth / 2 + "px";
                cont_div.style.marginTop = "-" + cont_div.offsetHeight / 2 + "px";
                image.src = img_data[0].firstElementChild.src;

                const cropper = new Cropper(image, {
                    crop(event) {
                        cont_div.style.marginLeft = "-" + cont_div.offsetWidth / 2 + "px";
                        cont_div.style.marginTop = "-" + cont_div.offsetHeight / 2 + "px";
                        image.src = cropper.getCroppedCanvas().toDataURL("image/jpeg");
                    }
                });
            }
            /*var methods = img_buttons.querySelectorAll('[data-method]')
                    for (var i = 0; i < methods.length; ++i) {
                        (function() {
                            var method_btn = methods[i].querySelector('[data-original-title]');
                            method_btn.addEventListener('click', function() {
                                eval(this.dataset.originalTitle);
                            }, false)
                        }())
                    }*/

            img_buttons.querySelectorAll("[data-original-title]").forEach(item => {
                item.addEventListener("click", event => {
                    eval(item.dataset.originalTitle);
                });
            });

            conf_btn.onclick = function(e) {
                replaceLine(doc, '<p><img src="' + image.src + '"></p>');
                cont_div.style = "display: none";
                cropper.destroy();
                editor.focus();
            };

            cancel_btn.onclick = function(e) {
                cont_div.style = "display: none";
                cropper.destroy();
                editor.focus();
            };
        },
        false
    );

    enl_button.addEventListener(
        "click",
        function() {
            var img = "";
        },
        false
    );

    dec_button.addEventListener("click", function() {}, false);
    import_btn.addEventListener(
        "change",
        function(e) {
            handleFiles(import_btn.files);
        },
        false
    );

    document.addEventListener(
        "dragover",
        function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        false
    );

    document.addEventListener(
        "drop",
        function(e) {
            e.preventDefault();
            e.stopPropagation();

            handleFiles(e.dataTransfer.files);
        },
        false
    );

    //for Bold, italic, striketrough...
    for (var i = 0; i < modifiers.length; ++i) {
        (function() {
            var modifier_btn = modifiers[i];
            modifier_btn.addEventListener(
                "click",
                function() {
                    var modifier_val = this.dataset.modifier;
                    if (Boolean(selection)) {
                        replaceSelection(doc, modifier_val + selection + modifier_val);
                    } else {
                        insertTextAtCursor(doc, cursor, modifier_val);
                    }
                },
                false
            );
        })();
    }

    //for headings
    for (var i = 0; i < headings.length; ++i) {
        (function() {
            var heading_btn = headings[i];
            heading_btn.addEventListener(
                "click",
                function() {
                    var heading_val = parseInt(this.dataset.level);
                    for (var j = 0; j < heading_val; j++) {
                        (function() {
                            insertTextAtCursorLine(doc, 0, "#");
                        })();
                    }
                    insertTextAtCursorLine(doc, heading_val, " ");
                },
                false
            );
        })();
    }

    //for new hr
    hr_btn.addEventListener(
        "click",
        function() {
            insertText(doc, cursor, line, "---");
        },
        false
    );

    //for the prefixes
    for (var i = 0; i < prefixes.length; ++i) {
        (function() {
            var prefix_btn = prefixes[i];
            prefix_btn.addEventListener(
                "click",
                function() {
                    var prefix_val = this.dataset.prefix;
                    if (Boolean(selection)) {
                        {
                            var lines = selection.split("\n");
                            for (var j = 0; j < lines.length; j++) {
                                (function() {
                                    if (lines[j] !== "") {
                                        replaceSelection(doc, prefix_val + lines[j] + "\n");
                                    }
                                })();
                            }
                        }
                    } else {
                        insertTextAtCursorLine(doc, 0, prefix_val);
                    }
                },
                false
            );
        })();
    }

    //for code button
    code_btn.addEventListener(
        "click",
        function() {
            if (Boolean(selection)) {
                replaceSelection(doc, "\n```\n" + selection + "\n```\n");
            } else {
                insertTextAtCursor(doc, cursor, "\n```\n\n```\n");
            }
        },
        false
    );

    //for links, images, tables
    for (var i = 0; i < samples.length; ++i) {
        (function() {
            var sample_btn = samples[i];
            //link = ('[' + selection + ']' + '(' + sample_url + ')'),
            //image = ('![' + selection + ']' + '(' + sample_url + ')');
            sample_btn.addEventListener(
                "click",
                function() {
                    var sample_type = this.dataset.sample;
                    if (sample_type === "link") {
                        sample_url = this.dataset.sampleUrl;
                        if (Boolean(selection)) {
                            replaceSelection(doc, "[" + selection + "]" + "(" + sample_url + ")");
                        } else {
                            insertTextAtCursor(doc, cursor, "[link]" + "(" + sample_url + ")");
                        }
                    } else if (sample_type === "image") {
                        sample_url = this.dataset.sampleUrl;
                        var link = "",
                            modal = document.getElementById("image-modal"),
                            conf_link = document.getElementById("conf-link"),
                            conf_code = document.getElementById("conf-code"),
                            close_btn = document.getElementById("close-img"),
                            cancl_btn = document.getElementById("cancel-img");
                        modal.style.display = "block";

                        setInterval(function() {
                            //title = document.getElementById("img-title").value,;
                            link = document.getElementById("img-link").value;
                            if (link !== "") {
                                console.log(link);
                                /*const fe = fetch(link, { mode: 'no-cors' }).then(function(response) {
                                console.log(response.ok);
                            })*/
                                urlCheck(link);
                            }
                        }, 5000);

                        conf_link.addEventListener(
                            "click",
                            function() {
                                var title = document.getElementById("img-title").value;
                                insertTextAtCursor(doc, cursor, "![" + title + "]" + "(" + link + ")");
                                modal.style.display = "none";
                                document.getElementById("img-link").value = "";
                                document.getElementById("img-title").value = "";
                            },
                            false
                        );

                        close_btn.onclick = function() {
                            modal.style.display = "none";
                            document.getElementById("img-link").value = "";
                            document.getElementById("img-title").value = "";
                        };
                        cancl_btn.onclick = function() {
                            modal.style.display = "none";
                            document.getElementById("img-link").value = "";
                            document.getElementById("img-title").value = "";
                        };
                        /*if (Boolean(selection)) {
                            replaceSelection(doc, '![' + selection + ']' + '(' + sample_url + ')');
                        } else {
                            
                        }*/
                    } else {
                        sample_val = this.dataset.value;
                        if (sample_type === "math") {
                            if (Boolean(selection)) {
                                replaceSelection(doc, "\n```katex\n" + selection + "\n```\n");
                            } else {
                                insertTextAtCursor(doc, cursor, "\n```katex\n" + sample_val + "\n```\n");
                            }
                        } else if (sample_type === "mermaid") {
                            if (Boolean(selection)) {
                                replaceSelection(doc, "\n```uml\n" + selection + "\n```");
                            } else {
                                insertTextAtCursor(doc, cursor, "\n```uml\n" + sample_val + "\n```\n");
                            }
                        } else {
                            insertTextAtCursor(doc, cursor, "\n\n" + sample_type + "\n");
                        }
                    }
                },
                false
            );
        })();
    }

    //for theme button
    mode_btn.addEventListener(
        "click",
        function() {
            var ed_curr = editor.getOption("theme");
            if (ed_curr === "default") {
                editor.setOption("theme", "dracula");
                document.getElementById("theme").href = "styles/themes/dark.css";
            } else {
                editor.setOption("theme", "default");
                document.getElementById("theme").href = "styles/themes/default.css";
            }
            editor.focus();
        },
        false
    );
});

/*function insertText(text) {
        var doc = editor.getDoc();
        var cursor = doc.getCursor(); // gets the line number in the cursor position
        var line = doc.getLine(cursor.line); // get the line contents
        var pos = {
            line: cursor.line
        };
        if (line.length === 0) {
            // check if the line is empty
            // add the text
            doc.replaceRange(text, pos);
        } else {
            // add a new line and the text
            doc.replaceRange("\n" + text, pos);
        }
    }*/
