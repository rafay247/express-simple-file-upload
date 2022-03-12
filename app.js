const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

app.use(express.static(__dirname + '/uploads')) // make upload folder  (public)

app.post('/upload', (req, res) => {
  var file = req.files.file // file congfig
  var baseUrl =  `http://localhost:8080/${file.name}`;
  console.log(file);
  console.log(baseUrl);

  file.mv('./uploads/' + file.name, function (err) {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(200).send(
        { message: "file uploaded successfully", url: baseUrl });
    }
  })
});
app.listen(8080, function () {
  console.log("Server running on 8080")
})