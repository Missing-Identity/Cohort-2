const fs = require("fs");

fs.readFile("text.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  data = data.replace(/(\r\n|\n|\r)/gm, ""); // replace all newlines with empty string
  data = data.replace(/\s+/g, " "); // replace all whitespace with single space
  fs.writeFile("text.txt", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log(data);
});
