const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use(bodyP.json());
app.use(
  "/node_modules/codemirror",
  express.static("C:/Users/divya/html p/node_modules/codemirror")
);
app.use("/", express.static("C:/Users/divya/html p/"));

app.get("/", function (req, res) {
  compiler.flush(function(){
  console.log("Deleted temporary files");
  })
  res.sendFile("C:/Users/divya/html p/index.html");
});

app.get("/compiler.html", function (req, res) {
  compiler.flush(function(){
    console.log("Deleted temporary files");
    })
  res.sendFile("C:/Users/divya/html p/compiler.html");
});


app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "cpp") {
      var envData = { OS: "windows", cmd: "g++" ,options:{timeout : 10000}};
      if (!input) {
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
          
        });
      } else {
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "java") {
      var envData = { OS: "windows" };
      if (!input) {
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "python") {
      var envData = { OS: "windows" };
      if (!input) {
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
  
});


app.listen(8000);
