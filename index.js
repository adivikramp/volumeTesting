const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Create the temp_files directory if it doesn't exist
const tempFolderPath = path.join(__dirname, "temp_files");
if (!fs.existsSync(tempFolderPath)) {
  fs.mkdirSync(tempFolderPath);
  console.log("Created temp_files folder.");
}

// Path to the file inside temp_files directory
const filePath = path.join(tempFolderPath, "example.txt");

// Endpoint to trigger file operations
app.get("/", (req, res) => {
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, create it
      fs.writeFile(filePath, "This is a new file.", (err) => {
        if (err) {
          console.error("Error creating the file:", err);
          res.status(500).send("Error creating the file.");
          return;
        }
        console.log("File created successfully!");
        res.send("File created successfully!");
      });
    } else {
      // File exists, append "updated" to it
      fs.appendFile(filePath, "\nupdated", (err) => {
        if (err) {
          console.error("Error updating the file:", err);
          res.status(500).send("Error updating the file.");
          return;
        }
        console.log("File updated successfully!");
        res.send("File updated successfully!");
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
