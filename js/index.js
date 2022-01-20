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

let editor = CodeMirror.fromTextArea($("#code-editor")[0], {
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

const executeCode = () => {
  try {
    Function(`"use strict";${editor.getValue()}`)();
  } catch (err) {
    $("#code-errors").text(err);
  }
}