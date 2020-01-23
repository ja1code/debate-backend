const mysql = require("mysql")
let con = mysql.createConnection({
  host: 'host',
  user: 'user',
  password: 'pwd',
  database: 'db'
});
module.exports.topico = (res) => {
  let a = new Date()
  let hoje = a.getDate() + '/' + a.getMonth
  let query = "SELECT * FROM `topicos` WHERE `data` = '"+hoje+"'"
  con.query(query, (err, results, fields) => {
    if (err) {
      let answer = {
        status: 'error',
        desc: 'database error'
      }
      res.send(answer)
    } else {
      if (results.length > 0) {
        let answer = {
          status: 'success',
          body: results[0]
        }
        res.send(answer)
      } else {
        let answer = {
          status: 'success',
          body: []
        }
        res.send(answer)
      }

    }
  }) 
}

module.exports.feed = (req, res) => {
  //
}
