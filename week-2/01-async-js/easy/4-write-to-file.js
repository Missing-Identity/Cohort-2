const fs = require("fs");

fs.writeFile("text.txt", "New Line", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("file created");
});
