$("document").ready(() => {
  let dataText = ["The future needs you."];

  // writes a str in dataText
  const typeWriter = (currentStr, text, i, cb, isRed) => {
    if (i < text.length) {
      if (text[i] === " ") {
        // cant add nbsp bc line won't break
        // add two punctuation spaces for fix
        currentStr += "&#8200;";
      } else if (text[i] === "y") {
        // flag red if y
        isRed = true;
        currentStr += `<em style="color: red;">` + text[i];
      } else if (text[i] === ".") {
        // turn off flag for .
        isRed = false;
        currentStr += `</em>` + text[i];
      } else {
        // add letter
        currentStr += text[i];
      }

      // update the html
      $(".typewriter").html(`${currentStr}${isRed ? "</em>" : ""}<span id="cursor" aria-hidden="true"></span>`);

      // wait and recurse for next char
      setTimeout(() => typeWriter(currentStr, text, i + 1, cb, isRed), 100);
    } else if (typeof cb == "function") {
      // execute cb after finishing str
      setTimeout(cb, 700);
    }
  }

  // start a typewriter animation for a text in the dataText array
  const StartTextAnimation = (i, dataText) => {
    // loop if we finish everything in dataText
    if (typeof dataText[i] == 'undefined')
       setTimeout(() => StartTextAnimation(0, dataText), 10000);

    // start typewriter for the current string with cb as next string
    if (i < dataText.length)
      typeWriter("", dataText[i], 0, () => StartTextAnimation(i + 1, dataText), false);
  }

  // start the text animation
  StartTextAnimation(0, dataText);
});