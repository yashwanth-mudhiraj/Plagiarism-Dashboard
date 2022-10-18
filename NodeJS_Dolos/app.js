const express = require("express");
var cors = require('cors')
const fs = require('fs');

const app = express()
const nodemailer = require("nodemailer");

app.use(cors())

const dolos = require("@dodona/dolos-lib");
const doo = new dolos.Dolos()

app.get("/getData", (req, res) => {
  var fileNames = []
  fs.readdir(req.query.fileNames, (err, files) => {
    if (err || files.length==0) {
      res.send("error")
    } else {
      files.forEach(file => {
        fileNames.push(req.query.fileNames + "/" + file)
      });

      const report = doo.analyzePaths(fileNames);
      report.then(function (result) {
        let totalSimScore = 0
        let noOfCombinations = result.scored.length
        result.scored.forEach(file=> {
          totalSimScore = totalSimScore + file.similarity
        })
        var simResult = {
          "scored" : result.scored,
          "assgnName" : req.query.assgnName,
          "avgSimScore": totalSimScore/noOfCombinations
        }
        res.send(JSON.stringify(simResult))
      })
    }

  });

})

app.get("/sendEmail", (req, res) => {

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "",
      pass: ""
    }
  });

 let mailOptions = {
  from: 'new-assignment@csus.edu',
  to: req.query.emailList,
  subject: 'New Assignment Posted',
  text: 'Please check attachment',
  attachments : [{
    filename: req.query.fileName, path: "C:/YASH/Masters Proj/backendDash/media" + "/" + req.query.fileName
 }]
}

 transporter.sendMail(mailOptions, function(err, info){
  if(err){
    console.log('error: ',err);
  }
  else{
    console.log('Message Sent')
    res.send("Message sent successfully")
  }
 })

})



app.listen(3000, () => {
  console.log("Server Running")
})
