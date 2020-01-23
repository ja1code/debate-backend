const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const db = require("./mysql-worker")
const jwt = require("jsonwebtoken")
const secret = "64c4481fbf134342fb21888e68d6c5ef"

const app = express()
app.use(bp.json())
app.use(cors())

app.get('/topico',(req, res) => {
  db.topico(res)
})

app.get('/feed',(req,res) => {
  if (req.params.type == "unauth") {
    db.unfeed(res)
  } else {
    auth(res, req.header('token'), db.feed)
  }
})

app.listen(8888, () => {
  console.log("Listening @8888")
})

function auth (req, res, token, callback) {
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.send({
          status: 'error',
          desc: "Token inválido para esta operação"
        })
      } else {
        callback(req, res)
      }
    });
  } else {
    res.send({
      status: 'error',
      desc: "é necessário um Token para realizar esta operação"
    })
  }
}