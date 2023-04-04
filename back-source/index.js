const mysql = require("mysql2");
const express = require("express");
const crypto = require('crypto');
const cors = require('cors');
const http_codes = require('http-status-codes');

const app = express();

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "8000",
  password: "123"
});

const promisePool = pool.promise();

function errorHandler(res) {
  return (err) => {
      console.log(err);
      res.json({
        status: http_codes.StatusCodes.INTERNAL_SERVER_ERROR,
        message: http_codes.ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: {
          error_details: err
        }
      });
  }
}

app.get('/posts', (req, res) => {
  promisePool.query("SELECT * FROM `blog`.`posts` ORDER BY `posts_epoch`")
    .then(([result, fields]) => {
      res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: result
      })
    })
    .catch(errorHandler(res))
    .finally(() => console.log("GET request on /posts!"));
})

app.get('/posts/:id', (req, res) => {
  let query = "SELECT * FROM `blog`.`posts` WHERE `posts_id` = ? ORDER BY `posts_epoch`"
  promisePool.query(query, [req.params.id])
    .then(([result, fields]) => {
      res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: result
      })
    })
    .catch(errorHandler(res))
    .finally(() => console.log("GET request on /posts/" + req.params.id + "!"));
})

const validateSession = function(token) {
  let query = "SELECT `hash`, `user_id` FROM `blog`.`sessions` WHERE `hash` = ?";
  return promisePool.query(query, [token])
    .then(([result, fields]) => { 
      if (result.length < 1) {
        throw "Invalid Token!";
      }
      return result[0]['user_id'];
    })
}

const validatePerms = function(userId, actionPerm) {
  let query = "SELECT `permission` FROM `blog`.`users` WHERE `id` = ?";
  return promisePool.query(query, [userId])
    .then(([result, fields]) => {
      if (result.length < 1) {
        throw "Invalid User Id!";
      }
      if (result[0]['permission'] < actionPerm) {
        throw "You not have permission to do this action!";
      }
      return userId;
    });
}

app.delete('/posts/:id', (req, res) => {
  const token = req.headers["authorization"];
  let query = "DELETE FROM `blog`.`posts` WHERE `posts_id` = ?";
  validateSession(token)
    .then((userId) => validatePerms(userId, 2))
    .then(() => promisePool.query(query, [req.params.id]))
    .then(() => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: null
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("DELETE request on /posts/" + req.params.id + "!"));
})

app.post('/posts', (req, res) => {
  const token = req.headers["authorization"];
  let query = "INSERT INTO `blog`.`posts`(`posts_id`, `posts_name`, `posts_epoch`, `posts_content`) VALUES (NULL,?,?,?)";
  let [name, epoch, content] = [req.body['name'], req.body['epoch'], req.body['content']];
  validateSession(token)
    .then((userId) => validatePerms(userId, 2))
    .then(() => promisePool.query(query, [name, epoch, content]))
    .then(() => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: null
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("POST request on /posts!"));
})

app.put('/posts/:id', (req, res) => {
  const token = req.headers["authorization"];
  let query = "UPDATE `blog`.`posts` SET `posts_name` = ?,`posts_epoch` = ?,`posts_content` = ? WHERE `posts_id` = ?";
  let [id, name, epoch, content] = [req.params.id, req.body['name'], req.body['epoch'], req.body['content']];
  validateSession(token)
    .then((userId) => validatePerms(userId, 2))
    .then(() => promisePool.query(query, [name, epoch, content, id]))
    .then(() => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: null
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("PUT request on /posts/" + req.params.id + "!"));
})

app.get('/posts/search', (req, res) => {
  let query = "SELECT * FROM `blog`.`posts` WHERE `posts_name` LIKE ? ORDER BY `posts_epoch`";
  let search = '%' + req.body['search'] + '%';
    promisePool.query(query, [search])
    .then(([result, fields]) => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: result
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("GET request on /posts/search"));
})

function genRandomString(length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  return randomString;
}

function genSalt() {
  return genRandomString(1);
}

function genSaltedValue(value, salt) {
  let salted = value + salt;
  return crypto.createHash('sha256').update(salted).digest('hex');
}

app.get('/user/info', (req, res) => {
  const token = req.headers["authorization"];
  if(token === undefined) {
    res.json({
        status: http_codes.StatusCodes.INTERNAL_SERVER_ERROR,
        message: http_codes.ReasonPhrases.INTERNAL_SERVER_ERROR,
        data: {
          error_details: "Not logged!"
        }
      });
    return;
  }
  let query = "SELECT `email`, `permission` FROM `blog`.`users` WHERE `id` = ?";
  validateSession(token)
    .then((userId) => promisePool.query(query, [userId]))
    .then(([result, fields]) => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: {
          mail: result[0]['email'],
          perm: result[0]['permission']
        }
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("GET request on /user/info!"));
})

app.post('/user/register', (req, res) => {
  let [mail, pass] = [req.body['mail'], req.body['pass']];
  let salt = genSalt();
  let salted = genSaltedValue(pass, salt);
  let queryMail = "SELECT `id` FROM `blog`.`users` WHERE `email` = ?";
  let query = "INSERT INTO `blog`.`users`(`id`, `email`, `pass`, `salt`, `permission`) VALUES (NULL,?,?,?,?)";
  promisePool.query(queryMail, [mail])
    .then(([result, fields]) => {
      if (result.length > 0) {
        throw "E-mail already on database.";
      }
    })
    .then(() => promisePool.query(query, [mail, salted, salt, 1]))
    .then(() => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: null
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("POST request on /user/register!"));
})

app.post('/user/login', (req, res) => {
  let [mail, pass] = [req.body['mail'], req.body['pass']];
  let queryMail = "SELECT `id`, `salt`, `pass` FROM `blog`.`users` WHERE `email` = ?";
  let query = "INSERT INTO `blog`.`sessions`(`id`, `user_id`, `hash`) VALUES (NULL,?,?)";
  let sessionId = 0;
  promisePool.query(queryMail, [mail])
    .then(([result, fields]) => {
      if (result.length < 1) {
        throw "Not registered!";
      }
      let salted = genSaltedValue(pass, result[0]['salt']);
      if (result[0]['pass'] != salted) {
        throw "Invalid password!";
      }
      return result[0]['id'];
    })
    .then((id) => {
      sessionId = genRandomString(32);
      return promisePool.query(query, [id, sessionId]);
    })
    .then(() => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: {sessionId: sessionId}
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("POST request on /user/login!"));
})

app.post('/user/logout', (req, res) => {
  const token = req.headers["authorization"];
  let query = "DELETE FROM `blog`.`sessions` WHERE `hash` = ?";
  validateSession(token)
    .then(() => promisePool.query(query, [token]))
    .then(() => res.json({
        status: http_codes.StatusCodes.OK,
        message: http_codes.ReasonPhrases.OK,
        data: null
      }))
    .catch(errorHandler(res))
    .finally(() => console.log("POST request on /user/logout!"));
})

app.get('/', (req, res) => {
  return res.send('GET Method!');
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
 
app.listen(3002, () => {
  console.log(`REST API listening on 3002`);
});

