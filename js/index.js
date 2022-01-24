let editor;

$("document").ready(() => {
  let selector = window.innerWidth < 992 ? "#md-code-editor" : "#code-editor";
  editor = createCodeMirror(selector);
});

// special syntax highlighting for keywords
CodeMirror.defineOption("keyword", {}, function(cm, val, prev) {
  if (prev == CodeMirror.Init) prev = false;
  if (prev && !val)
    cm.removeOverlay("keyword");
  else if (!prev && val)
    cm.addOverlay({
      token: function(stream) {
        for (var key in cm.options.keyword) {
          if (stream.match(key, true)) {return cm.options.keyword[key];}
        }
        stream.next();
      },
      name: "keyword"
    });
});

const createCodeMirror = (selector) => {
  let cm = CodeMirror.fromTextArea($(selector)[0], {
    lineNumbers: true,
    theme: "base16-dark",
    mode: "javascript",
    showCursorWhenSelecting: true,
    autoCloseBrackets: true,
    viewportMargin: Infinity,
    keyword: {
      "moveUp": "style1",
      "moveDown": "style1",
      "moveLeft": "style1",
      "moveRight": "style1"
    }
  });

  // programmatically change font size
  $(".CodeMirror").addClass("fs-5 rounded-3 shadow");

  return cm;
}

let oldWindowSize = window.innerWidth;
window.onresize = () => {
  // lg window gets resized to md
  if (window.innerWidth < 992 && oldWindowSize >= 992) {
    // store code
    let code = editor.getValue();
    // remove old CodeMirror
    $(".CodeMirror").remove();
    // create new codeMirror
    editor = createCodeMirror("#md-code-editor");
    // add code
    editor.setValue(code);
    oldWindowSize = window.innerWidth;
  } else if (window.innerWidth >= 992 && oldWindowSize < 992) {
    // md window gets resized to lg
    // store code
    let code = editor.getValue();
    // remove old CodeMirror
    $(".CodeMirror").remove();
    // create new codeMirror
    editor = createCodeMirror("#code-editor");
    // add code
    editor.setValue(code);
    oldWindowSize = window.innerWidth;
  }
}

const executeCode = () => {
  showErrors(false);
  try {
    window.Function(`"use strict";${editor.getValue()};game.resetPlayer();game.disableButtons(true);loop();`)();
  } catch (err) {
    showErrors(true);
    $("#code-errors").text(err);
  }
}

const showErrors = (state) => {
  if (state) {
    $("#errors-button").removeClass("d-none");
    $("#errors-button").addClass("d-block");
  } else {
    $("#errors-button").removeClass("d-block");
    $("#errors-button").addClass("d-none");
  }
}