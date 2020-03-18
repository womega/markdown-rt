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
        width_in = toolbar.querySelector("[id=set_width]"),
        height_in = toolbar.querySelector("[id=set_height]"),
        align_btns = toolbar.querySelectorAll("[data-style]"),
        emoji_button = document.querySelector("[id=emoji-button]"),
        fa_button = document.querySelector("[id=fa-button]");

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
        /*if (line.includes("img")) {
            var imge = $(line)[0].firstElementChild;
            width_in.value = imge.width;
            height_in.value = imge.height;
            width_in.disabled = false;
            height_in.disabled = false;
        } else {
            width_in.value = 0;
            height_in.value = 0;
            width_in.disabled = true;
            height_in.disabled = true;
        }*/
    }, 1000);

    editor.on("mousedown", function(cm, e) {
        if (line.includes("img")) {
            var imge = $(line)[0].firstElementChild;
            width_in.value = imge.width;
            height_in.value = imge.height;
            width_in.disabled = false;
            height_in.disabled = false;
        } else {
            width_in.value = 0;
            height_in.value = 0;
            width_in.disabled = true;
            height_in.disabled = true;
        }
    });

    /*document.addEventListener(
        "click",
        function(e) {
            console.log(e);
        },
        false
    );*/

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
            res.style.top = "1.75rem";
            toolbar.style.visibility = "visible";
            ed_wrap.style.top = "2.125rem";
            pre_wrap.style.top = "2.125rem";
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
            if (!type.includes("image")) {
                reader.onload = function(e) {
                    var contents = e.target.result;
                    editor.setValue(contents);
                    editor.focus();
                };
                reader.readAsText(file);
            } else {
                var image = document.getElementById("image_crop");
                reader.onload = function() {
                    var name = file.name.split(".")[0];
                    image.src = reader.result;
                    insertTextAtCursor(
                        doc,
                        cursor,
                        "\n###### " +
                            name +
                            '\n\n<p><img src="' +
                            image.src +
                            /*'" width ="' +
                            image.width +
                            '" height ="' +
                            image.height +*/
                            '"></p>\n\n'
                    );
                    editor.focus();
                };
                reader.readAsDataURL(file);
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

    const picker = new EmojiButton({
        zIndex: 99999
    });

    picker.on("emoji", emoji => {
        insertTextAtCursor(doc, cursor, emoji);
    });

    emoji_button.addEventListener("click", () => {
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
            var cont_div = document.getElementById("cont_div"),
                image_div = document.getElementById("image_crop"),
                conf_btn = document.getElementById("confirm"),
                cancel_btn = document.getElementById("cancel"),
                image = $(line)[0];

            cont_div.style.display = "block";
            cont_div.style.marginLeft = "-" + cont_div.offsetWidth / 2 + "px";
            cont_div.style.marginTop = "-" + cont_div.offsetHeight / 2 + "px";
            image_div.src = image.firstElementChild.src;

            const cropper = new Cropper(image_div, {
                viewMode: 1,
                /*minContainerHeight: 400,
                minContainerWidth: 400,*/
                crop(event) {
                    cont_div.style.marginLeft = "-" + cont_div.offsetWidth / 2 + "px";
                    cont_div.style.marginTop = "-" + cont_div.offsetHeight / 2 + "px";
                    image_div.src = cropper.getCroppedCanvas().toDataURL("image/jpeg");
                }
            });
            img_buttons.querySelectorAll("[data-original-title]").forEach(item => {
                item.addEventListener("click", event => {
                    eval(item.dataset.originalTitle);
                });
            });
            //cropper contains the info about the image, if destroyed, everything about the original image is lost
            conf_btn.onclick = function(e) {
                image.firstElementChild.src = image_div.src;
                replaceLine(doc, image.outerHTML);
                cont_div.style = "display: none";
                cropper.destroy();
                editor.focus();
            };

            cancel_btn.onclick = function(e) {
                cont_div.style = "display: none";
                cropper.destroy();
                editor.focus();
            };

            /*var methods = img_buttons.querySelectorAll('[data-method]')
                    for (var i = 0; i < methods.length; ++i) {
                        (function() {
                            var method_btn = methods[i].querySelector('[data-original-title]');
                            method_btn.addEventListener('click', function() {
                                eval(this.dataset.originalTitle);
                            }, false)
                        }())
                    }*/
        },
        false
    );

    height_in.addEventListener(
        "change",
        function(e) {
            var height = this.value,
                image = $(line)[0],
                image_data = image.firstElementChild;
            image_data.height = height;
            image.firstElementChild = image_data;
            replaceLine(doc, image.outerHTML);
            editor.focus();
        },
        false
    );

    width_in.addEventListener(
        "change",
        function(e) {
            var width = this.value,
                image = $(line)[0],
                image_data = image.firstElementChild;
            image_data.width = width;
            image.firstElementChild = image_data;
            replaceLine(doc, image.outerHTML);
            editor.focus();
        },
        false
    );

    enl_button.addEventListener(
        "click",
        function() {
            var image = $(line)[0],
                image_data = image.firstElementChild;
            image_data.width += 10;
            image_data.height += 10;
            image.firstElementChild = image_data;
            replaceLine(doc, image.outerHTML);
            editor.focus();
        },
        false
    );

    dec_button.addEventListener(
        "click",
        function() {
            var image = $(line)[0],
                image_data = image.firstElementChild;
            image_data.width -= 10;
            image_data.height -= 10;
            image.firstElementChild = image_data;
            replaceLine(doc, image.outerHTML);
            editor.focus();
        },
        false
    );

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

    document.addEventListener(
        "paste",
        function(e) {
            //e.preventDefault();
            //e.stopPropagation();
            handleFiles(e.clipboardData.files);
        },
        false
    );

    /*document.addEventListener(
        "click",
        function(e) {
            console.log(e);
            
        },
        false
    );*/

    /*document.addEventListener(
        "paste",
        function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(e.dataTransfer);
        },
        false
    );*/

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

    //for align images
    for (var i = 0; i < align_btns.length; ++i) {
        (function() {
            var align_btn = align_btns[i];

            align_btn.addEventListener(
                "click",
                function(e) {
                    if (line.includes("img")) {
                        var new_line = $(line)[0];
                        new_line.style = this.dataset.style;
                        replaceLine(doc, new_line.outerHTML);
                    }
                    editor.focus();
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
                        var modal = document.getElementById("image-modal"),
                            conf_link = document.getElementById("conf-link"),
                            conf_code = document.getElementById("conf-code"),
                            close_btn = document.getElementById("close-img"),
                            cancl_btn = document.getElementById("cancel-img");
                        modal.style.display = "block";
                        document.getElementById("img-title").focus();
                        /*setInterval(function() {
                            //title = document.getElementById("img-title").value,;
                            link = document.getElementById("img-link").value;
                            if (link !== "") {
                                console.log(link);
                                /*const fe = fetch(link, { mode: 'no-cors' }).then(function(response) {
                                console.log(response.ok);
                            })
                                //urlCheck(link);
                            }
                        }, 5000);*/

                        conf_link.addEventListener(
                            "click",
                            function() {
                                var title = document.getElementById("img-title").value,
                                    link = document.getElementById("img-link").value;
                                insertTextAtCursor(doc, cursor, "![" + title + "]" + "(" + link + ")");
                                modal.style.display = "none";
                                document.getElementById("img-link").value = "http://";
                                document.getElementById("img-title").value = "";
                                editor.focus();
                            },
                            false
                        );

                        close_btn.onclick = function() {
                            modal.style.display = "none";
                            document.getElementById("img-link").value = "http://";
                            document.getElementById("img-title").value = "";
                            editor.focus();
                        };
                        cancl_btn.onclick = function() {
                            modal.style.display = "none";
                            document.getElementById("img-link").value = "http://";
                            document.getElementById("img-title").value = "";
                            editor.focus();
                        };
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
                    //
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
                editor.setOption("theme", "dracula"); //switch theme of editor
                document.getElementById("theme").href = "styles/themes/dark.css"; //switch theme of preview
                picker.options.theme = "dark"; //switch theme of emoji picker
            } else {
                editor.setOption("theme", "default");
                document.getElementById("theme").href = "styles/themes/default.css";
                picker.options.theme = "light";
            }
            editor.focus();
        },
        false
    );

    var fonts = [
        "fa-500px",
        "fa-address-book",
        "fa-address-book-o",
        "fa-address-card",
        "fa-address-card-o",
        "fa-adjust",
        "fa-adn",
        "fa-align-center",
        "fa-align-justify",
        "fa-align-left",
        "fa-align-right",
        "fa-amazon",
        "fa-ambulance",
        "fa-american-sign-language-interpreting",
        "fa-anchor",
        "fa-android",
        "fa-angellist",
        "fa-angle-double-down",
        "fa-angle-double-left",
        "fa-angle-double-right",
        "fa-angle-double-up",
        "fa-angle-down",
        "fa-angle-left",
        "fa-angle-right",
        "fa-angle-up",
        "fa-apple",
        "fa-archive",
        "fa-area-chart",
        "fa-arrow-circle-down",
        "fa-arrow-circle-left",
        "fa-arrow-circle-o-down",
        "fa-arrow-circle-o-left",
        "fa-arrow-circle-o-right",
        "fa-arrow-circle-o-up",
        "fa-arrow-circle-right",
        "fa-arrow-circle-up",
        "fa-arrow-down",
        "fa-arrow-left",
        "fa-arrow-right",
        "fa-arrow-up",
        "fa-arrows",
        "fa-arrows-alt",
        "fa-arrows-h",
        "fa-arrows-v",
        "fa-asl-interpreting",
        "fa-assistive-listening-systems",
        "fa-asterisk",
        "fa-at",
        "fa-audio-description",
        "fa-automobile",
        "fa-backward",
        "fa-balance-scale",
        "fa-ban",
        "fa-bandcamp",
        "fa-bank",
        "fa-bar-chart",
        "fa-bar-chart-o",
        "fa-barcode",
        "fa-bars",
        "fa-bath",
        "fa-bathtub",
        "fa-battery",
        "fa-battery-0",
        "fa-battery-1",
        "fa-battery-2",
        "fa-battery-3",
        "fa-battery-4",
        "fa-battery-empty",
        "fa-battery-full",
        "fa-battery-half",
        "fa-battery-quarter",
        "fa-battery-three-quarters",
        "fa-bed",
        "fa-beer",
        "fa-behance",
        "fa-behance-square",
        "fa-bell",
        "fa-bell-o",
        "fa-bell-slash",
        "fa-bell-slash-o",
        "fa-bicycle",
        "fa-binoculars",
        "fa-birthday-cake",
        "fa-bitbucket",
        "fa-bitbucket-square",
        "fa-bitcoin",
        "fa-black-tie",
        "fa-blind",
        "fa-bluetooth",
        "fa-bluetooth-b",
        "fa-bold",
        "fa-bolt",
        "fa-bomb",
        "fa-book",
        "fa-bookmark",
        "fa-bookmark-o",
        "fa-braille",
        "fa-briefcase",
        "fa-btc",
        "fa-bug",
        "fa-building",
        "fa-building-o",
        "fa-bullhorn",
        "fa-bullseye",
        "fa-bus",
        "fa-buysellads",
        "fa-cab",
        "fa-calculator",
        "fa-calendar",
        "fa-calendar-check-o",
        "fa-calendar-minus-o",
        "fa-calendar-o",
        "fa-calendar-plus-o",
        "fa-calendar-times-o",
        "fa-camera",
        "fa-camera-retro",
        "fa-car",
        "fa-caret-down",
        "fa-caret-left",
        "fa-caret-right",
        "fa-caret-square-o-down",
        "fa-caret-square-o-left",
        "fa-caret-square-o-right",
        "fa-caret-square-o-up",
        "fa-caret-up",
        "fa-cart-arrow-down",
        "fa-cart-plus",
        "fa-cc",
        "fa-cc-amex",
        "fa-cc-diners-club",
        "fa-cc-discover",
        "fa-cc-jcb",
        "fa-cc-mastercard",
        "fa-cc-paypal",
        "fa-cc-stripe",
        "fa-cc-visa",
        "fa-certificate",
        "fa-chain",
        "fa-chain-broken",
        "fa-check",
        "fa-check-circle",
        "fa-check-circle-o",
        "fa-check-square",
        "fa-check-square-o",
        "fa-chevron-circle-down",
        "fa-chevron-circle-left",
        "fa-chevron-circle-right",
        "fa-chevron-circle-up",
        "fa-chevron-down",
        "fa-chevron-left",
        "fa-chevron-right",
        "fa-chevron-up",
        "fa-child",
        "fa-chrome",
        "fa-circle",
        "fa-circle-o",
        "fa-circle-o-notch",
        "fa-circle-thin",
        "fa-clipboard",
        "fa-clock-o",
        "fa-clone",
        "fa-close",
        "fa-cloud",
        "fa-cloud-download",
        "fa-cloud-upload",
        "fa-cny",
        "fa-code",
        "fa-code-fork",
        "fa-codepen",
        "fa-codiepie",
        "fa-coffee",
        "fa-cog",
        "fa-cogs",
        "fa-columns",
        "fa-comment",
        "fa-comment-o",
        "fa-commenting",
        "fa-commenting-o",
        "fa-comments",
        "fa-comments-o",
        "fa-compass",
        "fa-compress",
        "fa-connectdevelop",
        "fa-contao",
        "fa-copy",
        "fa-copyright",
        "fa-creative-commons",
        "fa-credit-card",
        "fa-credit-card-alt",
        "fa-crop",
        "fa-crosshairs",
        "fa-css3",
        "fa-cube",
        "fa-cubes",
        "fa-cut",
        "fa-cutlery",
        "fa-dashboard",
        "fa-dashcube",
        "fa-database",
        "fa-deaf",
        "fa-deafness",
        "fa-dedent",
        "fa-delicious",
        "fa-desktop",
        "fa-deviantart",
        "fa-diamond",
        "fa-digg",
        "fa-dollar",
        "fa-dot-circle-o",
        "fa-download",
        "fa-dribbble",
        "fa-drivers-license",
        "fa-drivers-license-o",
        "fa-dropbox",
        "fa-drupal",
        "fa-edge",
        "fa-edit",
        "fa-eercast",
        "fa-eject",
        "fa-ellipsis-h",
        "fa-ellipsis-v",
        "fa-empire",
        "fa-envelope",
        "fa-envelope-o",
        "fa-envelope-open",
        "fa-envelope-open-o",
        "fa-envelope-square",
        "fa-envira",
        "fa-eraser",
        "fa-etsy",
        "fa-eur",
        "fa-euro",
        "fa-exchange",
        "fa-exclamation",
        "fa-exclamation-circle",
        "fa-exclamation-triangle",
        "fa-expand",
        "fa-expeditedssl",
        "fa-external-link",
        "fa-external-link-square",
        "fa-eye",
        "fa-eye-slash",
        "fa-eyedropper",
        "fa-fa",
        "fa-facebook",
        "fa-facebook-f",
        "fa-facebook-official",
        "fa-facebook-square",
        "fa-fast-backward",
        "fa-fast-forward",
        "fa-fax",
        "fa-feed",
        "fa-female",
        "fa-fighter-jet",
        "fa-file",
        "fa-file-archive-o",
        "fa-file-audio-o",
        "fa-file-code-o",
        "fa-file-excel-o",
        "fa-file-image-o",
        "fa-file-movie-o",
        "fa-file-o",
        "fa-file-pdf-o",
        "fa-file-photo-o",
        "fa-file-picture-o",
        "fa-file-powerpoint-o",
        "fa-file-sound-o",
        "fa-file-text",
        "fa-file-text-o",
        "fa-file-video-o",
        "fa-file-word-o",
        "fa-file-zip-o",
        "fa-files-o",
        "fa-film",
        "fa-filter",
        "fa-fire",
        "fa-fire-extinguisher",
        "fa-firefox",
        "fa-first-order",
        "fa-flag",
        "fa-flag-checkered",
        "fa-flag-o",
        "fa-flash",
        "fa-flask",
        "fa-flickr",
        "fa-floppy-o",
        "fa-folder",
        "fa-folder-o",
        "fa-folder-open",
        "fa-folder-open-o",
        "fa-font",
        "fa-font-awesome",
        "fa-fonticons",
        "fa-fort-awesome",
        "fa-forumbee",
        "fa-forward",
        "fa-foursquare",
        "fa-free-code-camp",
        "fa-frown-o",
        "fa-futbol-o",
        "fa-gamepad",
        "fa-gavel",
        "fa-gbp",
        "fa-ge",
        "fa-gear",
        "fa-gears",
        "fa-genderless",
        "fa-get-pocket",
        "fa-gg",
        "fa-gg-circle",
        "fa-gift",
        "fa-git",
        "fa-git-square",
        "fa-github",
        "fa-github-alt",
        "fa-github-square",
        "fa-gitlab",
        "fa-gittip",
        "fa-glass",
        "fa-glide",
        "fa-glide-g",
        "fa-globe",
        "fa-google",
        "fa-google-plus",
        "fa-google-plus-circle",
        "fa-google-plus-official",
        "fa-google-plus-square",
        "fa-google-wallet",
        "fa-graduation-cap",
        "fa-gratipay",
        "fa-grav",
        "fa-group",
        "fa-h-square",
        "fa-hacker-news",
        "fa-hand-grab-o",
        "fa-hand-lizard-o",
        "fa-hand-o-down",
        "fa-hand-o-left",
        "fa-hand-o-right",
        "fa-hand-o-up",
        "fa-hand-paper-o",
        "fa-hand-peace-o",
        "fa-hand-pointer-o",
        "fa-hand-rock-o",
        "fa-hand-scissors-o",
        "fa-hand-spock-o",
        "fa-hand-stop-o",
        "fa-handshake-o",
        "fa-hard-of-hearing",
        "fa-hashtag",
        "fa-hdd-o",
        "fa-header",
        "fa-headphones",
        "fa-heart",
        "fa-heart-o",
        "fa-heartbeat",
        "fa-history",
        "fa-home",
        "fa-hospital-o",
        "fa-hotel",
        "fa-hourglass",
        "fa-hourglass-1",
        "fa-hourglass-2",
        "fa-hourglass-3",
        "fa-hourglass-end",
        "fa-hourglass-half",
        "fa-hourglass-o",
        "fa-hourglass-start",
        "fa-houzz",
        "fa-html5",
        "fa-i-cursor",
        "fa-id-badge",
        "fa-id-card",
        "fa-id-card-o",
        "fa-ils",
        "fa-image",
        "fa-imdb",
        "fa-inbox",
        "fa-indent",
        "fa-industry",
        "fa-info",
        "fa-info-circle",
        "fa-inr",
        "fa-instagram",
        "fa-institution",
        "fa-internet-explorer",
        "fa-intersex",
        "fa-ioxhost",
        "fa-italic",
        "fa-joomla",
        "fa-jpy",
        "fa-jsfiddle",
        "fa-key",
        "fa-keyboard-o",
        "fa-krw",
        "fa-language",
        "fa-laptop",
        "fa-lastfm",
        "fa-lastfm-square",
        "fa-leaf",
        "fa-leanpub",
        "fa-legal",
        "fa-lemon-o",
        "fa-level-down",
        "fa-level-up",
        "fa-life-bouy",
        "fa-life-buoy",
        "fa-life-ring",
        "fa-life-saver",
        "fa-lightbulb-o",
        "fa-line-chart",
        "fa-link",
        "fa-linkedin",
        "fa-linkedin-square",
        "fa-linode",
        "fa-linux",
        "fa-list",
        "fa-list-alt",
        "fa-list-ol",
        "fa-list-ul",
        "fa-location-arrow",
        "fa-lock",
        "fa-long-arrow-down",
        "fa-long-arrow-left",
        "fa-long-arrow-right",
        "fa-long-arrow-up",
        "fa-low-vision",
        "fa-magic",
        "fa-magnet",
        "fa-mail-forward",
        "fa-mail-reply",
        "fa-mail-reply-all",
        "fa-male",
        "fa-map",
        "fa-map-marker",
        "fa-map-o",
        "fa-map-pin",
        "fa-map-signs",
        "fa-mars",
        "fa-mars-double",
        "fa-mars-stroke",
        "fa-mars-stroke-h",
        "fa-mars-stroke-v",
        "fa-maxcdn",
        "fa-meanpath",
        "fa-medium",
        "fa-medkit",
        "fa-meetup",
        "fa-meh-o",
        "fa-mercury",
        "fa-microchip",
        "fa-microphone",
        "fa-microphone-slash",
        "fa-minus",
        "fa-minus-circle",
        "fa-minus-square",
        "fa-minus-square-o",
        "fa-mixcloud",
        "fa-mobile",
        "fa-mobile-phone",
        "fa-modx",
        "fa-money",
        "fa-moon-o",
        "fa-mortar-board",
        "fa-motorcycle",
        "fa-mouse-pointer",
        "fa-music",
        "fa-navicon",
        "fa-neuter",
        "fa-newspaper-o",
        "fa-object-group",
        "fa-object-ungroup",
        "fa-odnoklassniki",
        "fa-odnoklassniki-square",
        "fa-opencart",
        "fa-openid",
        "fa-opera",
        "fa-optin-monster",
        "fa-outdent",
        "fa-pagelines",
        "fa-paint-brush",
        "fa-paper-plane",
        "fa-paper-plane-o",
        "fa-paperclip",
        "fa-paragraph",
        "fa-paste",
        "fa-pause",
        "fa-pause-circle",
        "fa-pause-circle-o",
        "fa-paw",
        "fa-paypal",
        "fa-pencil",
        "fa-pencil-square",
        "fa-pencil-square-o",
        "fa-percent",
        "fa-phone",
        "fa-phone-square",
        "fa-photo",
        "fa-picture-o",
        "fa-pie-chart",
        "fa-pied-piper",
        "fa-pied-piper-alt",
        "fa-pied-piper-pp",
        "fa-pinterest",
        "fa-pinterest-p",
        "fa-pinterest-square",
        "fa-plane",
        "fa-play",
        "fa-play-circle",
        "fa-play-circle-o",
        "fa-plug",
        "fa-plus",
        "fa-plus-circle",
        "fa-plus-square",
        "fa-plus-square-o",
        "fa-podcast",
        "fa-power-off",
        "fa-print",
        "fa-product-hunt",
        "fa-puzzle-piece",
        "fa-qq",
        "fa-qrcode",
        "fa-question",
        "fa-question-circle",
        "fa-question-circle-o",
        "fa-quora",
        "fa-quote-left",
        "fa-quote-right",
        "fa-ra",
        "fa-random",
        "fa-ravelry",
        "fa-rebel",
        "fa-recycle",
        "fa-reddit",
        "fa-reddit-alien",
        "fa-reddit-square",
        "fa-refresh",
        "fa-registered",
        "fa-remove",
        "fa-renren",
        "fa-reorder",
        "fa-repeat",
        "fa-reply",
        "fa-reply-all",
        "fa-resistance",
        "fa-retweet",
        "fa-rmb",
        "fa-road",
        "fa-rocket",
        "fa-rotate-left",
        "fa-rotate-right",
        "fa-rouble",
        "fa-rss",
        "fa-rss-square",
        "fa-rub",
        "fa-ruble",
        "fa-rupee",
        "fa-s15",
        "fa-safari",
        "fa-save",
        "fa-scissors",
        "fa-scribd",
        "fa-search",
        "fa-search-minus",
        "fa-search-plus",
        "fa-sellsy",
        "fa-send",
        "fa-send-o",
        "fa-server",
        "fa-share",
        "fa-share-alt",
        "fa-share-alt-square",
        "fa-share-square",
        "fa-share-square-o",
        "fa-shekel",
        "fa-sheqel",
        "fa-shield",
        "fa-ship",
        "fa-shirtsinbulk",
        "fa-shopping-bag",
        "fa-shopping-basket",
        "fa-shopping-cart",
        "fa-shower",
        "fa-sign-in",
        "fa-sign-language",
        "fa-sign-out",
        "fa-signal",
        "fa-signing",
        "fa-simplybuilt",
        "fa-sitemap",
        "fa-skyatlas",
        "fa-skype",
        "fa-slack",
        "fa-sliders",
        "fa-slideshare",
        "fa-smile-o",
        "fa-snapchat",
        "fa-snapchat-ghost",
        "fa-snapchat-square",
        "fa-snowflake-o",
        "fa-soccer-ball-o",
        "fa-sort",
        "fa-sort-alpha-asc",
        "fa-sort-alpha-desc",
        "fa-sort-amount-asc",
        "fa-sort-amount-desc",
        "fa-sort-asc",
        "fa-sort-desc",
        "fa-sort-down",
        "fa-sort-numeric-asc",
        "fa-sort-numeric-desc",
        "fa-sort-up",
        "fa-soundcloud",
        "fa-space-shuttle",
        "fa-spinner",
        "fa-spoon",
        "fa-spotify",
        "fa-square",
        "fa-square-o",
        "fa-stack-exchange",
        "fa-stack-overflow",
        "fa-star",
        "fa-star-half",
        "fa-star-half-empty",
        "fa-star-half-full",
        "fa-star-half-o",
        "fa-star-o",
        "fa-steam",
        "fa-steam-square",
        "fa-step-backward",
        "fa-step-forward",
        "fa-stethoscope",
        "fa-sticky-note",
        "fa-sticky-note-o",
        "fa-stop",
        "fa-stop-circle",
        "fa-stop-circle-o",
        "fa-street-view",
        "fa-strikethrough",
        "fa-stumbleupon",
        "fa-stumbleupon-circle",
        "fa-subscript",
        "fa-subway",
        "fa-suitcase",
        "fa-sun-o",
        "fa-superpowers",
        "fa-superscript",
        "fa-support",
        "fa-table",
        "fa-tablet",
        "fa-tachometer",
        "fa-tag",
        "fa-tags",
        "fa-tasks",
        "fa-taxi",
        "fa-telegram",
        "fa-television",
        "fa-tencent-weibo",
        "fa-terminal",
        "fa-text-height",
        "fa-text-width",
        "fa-th",
        "fa-th-large",
        "fa-th-list",
        "fa-themeisle",
        "fa-thermometer",
        "fa-thermometer-0",
        "fa-thermometer-1",
        "fa-thermometer-2",
        "fa-thermometer-3",
        "fa-thermometer-4",
        "fa-thermometer-empty",
        "fa-thermometer-full",
        "fa-thermometer-half",
        "fa-thermometer-quarter",
        "fa-thermometer-three-quarters",
        "fa-thumb-tack",
        "fa-thumbs-down",
        "fa-thumbs-o-down",
        "fa-thumbs-o-up",
        "fa-thumbs-up",
        "fa-ticket",
        "fa-times",
        "fa-times-circle",
        "fa-times-circle-o",
        "fa-times-rectangle",
        "fa-times-rectangle-o",
        "fa-tint",
        "fa-toggle-down",
        "fa-toggle-left",
        "fa-toggle-off",
        "fa-toggle-on",
        "fa-toggle-right",
        "fa-toggle-up",
        "fa-trademark",
        "fa-train",
        "fa-transgender",
        "fa-transgender-alt",
        "fa-trash",
        "fa-trash-o",
        "fa-tree",
        "fa-trello",
        "fa-tripadvisor",
        "fa-trophy",
        "fa-truck",
        "fa-try",
        "fa-tty",
        "fa-tumblr",
        "fa-tumblr-square",
        "fa-turkish-lira",
        "fa-tv",
        "fa-twitch",
        "fa-twitter",
        "fa-twitter-square",
        "fa-umbrella",
        "fa-underline",
        "fa-undo",
        "fa-universal-access",
        "fa-university",
        "fa-unlink",
        "fa-unlock",
        "fa-unlock-alt",
        "fa-unsorted",
        "fa-upload",
        "fa-usb",
        "fa-usd",
        "fa-user",
        "fa-user-circle",
        "fa-user-circle-o",
        "fa-user-md",
        "fa-user-o",
        "fa-user-plus",
        "fa-user-secret",
        "fa-user-times",
        "fa-users",
        "fa-vcard",
        "fa-vcard-o",
        "fa-venus",
        "fa-venus-double",
        "fa-venus-mars",
        "fa-viacoin",
        "fa-viadeo",
        "fa-viadeo-square",
        "fa-video-camera",
        "fa-vimeo",
        "fa-vimeo-square",
        "fa-vine",
        "fa-vk",
        "fa-volume-control-phone",
        "fa-volume-down",
        "fa-volume-off",
        "fa-volume-up",
        "fa-warning",
        "fa-wechat",
        "fa-weibo",
        "fa-weixin",
        "fa-whatsapp",
        "fa-wheelchair",
        "fa-wheelchair-alt",
        "fa-wifi",
        "fa-wikipedia-w",
        "fa-window-close",
        "fa-window-close-o",
        "fa-window-maximize",
        "fa-window-minimize",
        "fa-window-restore",
        "fa-windows",
        "fa-won",
        "fa-wordpress",
        "fa-wpbeginner",
        "fa-wpexplorer",
        "fa-wpforms",
        "fa-wrench",
        "fa-xing",
        "fa-xing-square",
        "fa-y-combinator",
        "fa-y-combinator-square",
        "fa-yahoo",
        "fa-yc",
        "fa-yc-square",
        "fa-yelp",
        "fa-yen",
        "fa-yoast",
        "fa-youtube",
        "fa-youtube-play",
        "fa-youtube-square"
    ];
    var fonts_1 = [];
    for (var i = 0; i < fonts.length; i++) {
        fonts_1.push({ title: fonts[i], searchTerms: [] });
    }
    $("#fa-button").iconpicker({
        placement: "bottom",
        hideOnSelect: true,
        icons: fonts_1,
        //input: ".CodeMirror",
        container: ".editor-preview",
        fullClassFormatter: function(val) {
            return "fa " + val;
        }
    });
    $("#fa-button").on("iconpickerSelected", function(event) {
        insertTextAtCursor(doc, cursor, " :" + event.iconpickerValue + ": ");
    });
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
