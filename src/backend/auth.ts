var { Router } = require('express');

// auth API

let ACCOUNTS = {
  'test': 'test'
};

let FAKE_TOKEN = 'test.jwt.token';

let USERS = {
  'test': {
    'username': 'test',
    'firstName': 'Test',
    'lastName': 'User',
    'email': 'test@user.com'
  }
};

export function createAuthApi() {

  var router = Router();

  router.route('/login')
    .get(function(req, res) {
      return res.status(405).json({ error: 'Method not allowed!' });
    })
    .post(function(req, res) {
      var data = req.body;
      if (data) {
        if (ACCOUNTS[data.username] === data.password) {
          return res.json({
            token: FAKE_TOKEN
          });
        }
      }
      return res.status(401).json({ error: 'Invalid credentials!' });
    });

  router.route('/user')
    .get(function(req, res) {
      if (req.headers.authorization) {
        var token = req.headers.authorization;
        if (token === FAKE_TOKEN) {
          return res.status(200).json(USERS[token.split('.')[0]]);
        }
      }
      return res.status(401).json({ error: 'Unauthorized token!' });
    });

  return router;
};
