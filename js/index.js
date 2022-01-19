let editor = CodeMirror.fromTextArea($("#code-editor")[0], {
  lineNumbers: true,
  value: "// Guide the rover!",
  theme: "base16-dark",
  mode: "javascript",
  showCursorWhenSelecting: true,
  autoCloseBrackets: true,
  viewportMargin: Infinity
});

let msg = "Hello world!";

const executeCode = () => {
  // get CodeMirror text
  let code = editor.getValue();
  try {
    Function(`"use strict";${code}`)();
  } catch (err) {
    $("#code-errors").text(err);
  }
}