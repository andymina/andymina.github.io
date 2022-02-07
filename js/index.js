let editor;

$(document).ready(() => {
  // init editor
  let selector = window.innerWidth < 992 ? "#md-code-editor" : "#code-editor";
  editor = createCodeMirror(selector);
  editor.refresh();

  let today = new Date();
  let tmrw = new Date();
  tmrw.setDate(today.getDate() + 1);

  // init datepicker
  $("#date-picker").datepicker({
    todayHighlight: true,
    format: 'mm/dd/yyyy',
    container: "date-picker-container",
    endDate: tmrw
  }).on("changeDate", (e) => getAPOD(e.date));
  // select today
  $("#date-picker").datepicker("setDate", today);
  // center it
  $(".datepicker").addClass("mx-auto");
  // get NASA APOD
  getAPOD(today);

  // disable loader
  $("#loader-container").addClass("d-none");
  
  // show content
  $("#content").removeClass("d-none");

  setTimeout(() => $("#parallax-vid").css("opacity", 1), 500);
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
  let newPrefix;
  let oldPrefix;
  let resize = false;

  if (window.innerWidth < 992 && oldWindowSize >= 992) { // lg -> md
    newPrefix = "#md-";
    oldPrefix = "#"
    resize = true;
  } else if (window.innerWidth >= 992 && oldWindowSize < 992) { // md -> lg
    newPrefix = "#";
    prefix = "#md-";
    resize = true;
  }

  // only run if we've hit the bp
  if (resize) {
    // store code
    let code = editor.getValue();
    // remove old CodeMirror
    $(".CodeMirror").remove();
    // create new codeMirror
    editor = createCodeMirror(newPrefix + "code-editor");
    // add code
    editor.setValue(code);

    // store old errors
    let errs = $(oldPrefix + "code-errors").text();
    // clear old errors
    $(oldPrefix+"code-errors").text("");
    // move errors
    $(newPrefix+"code-errors").text(errs);

    // update old window size
    oldWindowSize = window.innerWidth;
  }
}

const executeCode = () => {
  showErrors(false);
  try {
    window.Function(`"use strict";${editor.getValue()};game.resetPlayer();game.disableButtons(true);loop();`)();
  } catch (err) {
    let selector = window.innerWidth < 992 ? "#md-code-errors" : "#code-errors";
    showErrors(true);
    $(selector).text(err);
  }
}

const showErrors = (state) => {
  if (state) {
    $(".errors-button").removeClass("d-none");
    $(".errors-button").addClass("d-block");
  } else {
    $(".errors-button").removeClass("d-block");
    $(".errors-button").addClass("d-none");
  }
}