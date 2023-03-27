const mysql = require("mysql2");
const express = require("express");

const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "8000",
  password: "123"
});

const promisePool = pool.promise();

async function selectPosts(res) {
  try {
    let [result, fields] = await promisePool.query("SELECT * FROM `blog`.`posts`");
    res.json({result: result});
  } catch(e) {
    console.error(e);
    res.json({error: e});
    throw e;
  } finally {
    console.log("GET Posts Executed!");
  }
}

app.get('/posts', (req, res) => {
  promisePool.query("SELECT * FROM `blog`.`posts` ORDER BY `posts_epoch`")
    .then(([result, fields]) => {
      res.json({result: result})
    })
    .catch((err) => {
      console.log(err);
      res.json({error: err});
    })
    .finally(() => console.log("GET Posts Executed!"));
})

app.get('/', (req, res) => {
  /* selectPosts(res); */
/*   con.promise().query("SELECT * FROM `blog`.`posts`")
    .then(([result, fields]) => {
      res.json({result: result})
    })
    .catch((err) => {console.log(err); res.json(err)})
    .finally(() => console.log("GET Posts Executed!")); */

  /* con.query("SELECT * FROM `blog`.`posts`", function (err, result, fields) {
    if (err) throw err;
    return res.json({result: result});
  })
  return res.send('GET Method!'); */
});

app.post('/', (req, res) => {
  return res.send('POST Method!');
});

app.put('/', (req, res) => {
  return res.send('PUT Method!');
});

app.delete('/', (req, res) => {
  return res.send('DELETE Method!');
});
 
app.listen(6000, () => {
  console.log(`REST API listening on 6000`);
});

