const { Router } = require('@angular/router');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('mocks/data.json')
const middlewares = jsonServer.defaults()
const crypto = require('crypto');

function salt(password, login) {
  return "%_-]" + password + ",J|" + login;
}

function generateSession(login) {
  var rand = Math.random();
  var password = (rand * 100).toString();
  return crypto.createHash('md5').update(salt(password, login)).digest("hex");
}

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  if (req.method ==='POST') {
    if (req.body.login) {
      var user = router.db.get("users").getById(req.body.login).value();
      if (user && (user.password == crypto.createHash('md5').update(salt(req.body.password, req.body.login)).digest("hex"))) {
        var sessionId = generateSession(req.body.login);
        var expirationTime = (new Date((new Date()).getTime() + 10*60000)).getTime();
        var sessions = router.db.get("sessions").value();
        sessions.push({"id":sessionId, "userId":req.body.login, "expiration":expirationTime});
        router.db.add("sessions", sessions).value();
        router.db.write();
        res.jsonp({"session":sessionId});
      }
      else {
        res.statusCode = 401;
        res.jsonp({"reason":"login error"});
      }
    }
    else {
      res.statusCode = 401;
      res.jsonp({"reason":"login error"});
    }
  }
  else {
    res.statusCode = 400;
    res.jsonp({"reason":"bad request"});
  }
})

router.render = (req, res) => {
  if (userPath(req) && (res.statusCode < 300)) {
    var sessionId = req.headers['apisession'];
    var session = router.db.get("sessions").getById(sessionId).value();
    session.expiration = (new Date((new Date()).getTime() + 10*60000)).getTime();
    router.db.get("sessions").set(sessionId, session);
    router.db.write();
  }
  var body = res.locals.data;
  var newBody = body;
  if (req.path == '/orders') {
    newBody = [];
    var sessionId = req.headers['apisession'];
    var session = router.db.get("sessions").getById(sessionId).value();
    for (var i in body) {
      if (body[i].userId == session.userId) newBody.push(body[i]);
    }
  }
  if ('password' in body) {
    newBody = {};
    for (var key in body) {
      if (key != "password") newBody[key] = body[key];
    }
  } 
  res.jsonp(newBody);
}

function adminPath(req) {
  if (req.path.startsWith('/sessions')) return true;
  if ((req.path === '/users') && (req.method === 'GET')) return true;
  if (req.path.startsWith('/products') && (req.method !== 'GET')) return true;
  return false;
}

function adminPathAllowed(req, user) {
  if (! user) return false;
  if (user.admin === true) return true;
  return false;
}

function userPath(req) {
  if (req.path.startsWith('/users/')) return true;
  if (req.path.startsWith('/orders')) return true;
  return false;
}

function userPathAllowed(req, user) {
  if (! user) return false;
  if (req.path.startsWith('/users/')) {
    var arr = req.path.split("/", 3);
    if (arr[2] == user.id) return true;
  }
  if (req.path.startsWith('/orders')) {
    if (req.method == 'GET') return true;
    if (req.body.userId === user.id) return true;
  }
  return false;
}

function publicPath(req) {
  if ((req.path === '/users') && (req.method === 'POST')) return true;
  if (req.path.startsWith('/products') && (req.method === 'GET')) return true;
  return false;
}

server.use((req, res, next) => {
  if (req.path.startsWith('/sessions') || req.path.startsWith('/users') || req.path.startsWith('/products') || req.path.startsWith('/orders')) {
    var sessionId = req.headers['apisession'];
    if (publicPath(req) || sessionId) {
      var session = null;
      if (sessionId) session = router.db.get("sessions").getById(sessionId).value();
      if (session && (session.expiration < (new Date).getTime())) {
        res.status(403).jsonp({"reason":"session expired"});           
      }
      else {
        var user = null;
        if (session) user = router.db.get("users").getById(session.userId).value();
        if (publicPath(req) || user) {
          console.log(adminPath(req));
          console.log(userPath(req));
          console.log(publicPath(req));
          if (adminPath(req) && ! adminPathAllowed(req, user)) {
            res.status(403).jsonp({"reason":"access denied 1"});           
          }
          else if (userPath(req) && ! userPathAllowed(req, user)) {
            res.status(403).jsonp({"reason":"access denied 2"});           
          }
          else {
            if (req.method === 'POST') {
              if (req.body.password) req.body.password = crypto.createHash('md5').update(salt(req.body.password, req.body.id)).digest("hex"); 
            }
            console.log(req.body);
            next();
          }
        }
        else {
          res.status(403).jsonp({"reason":"user unknown"});  
        }
      }
    }
    else {
      res.status(403).jsonp({"reason":"not logged in"});  
    }
  }
  else {
    res.status(404).jsonp({"reason":"unknown api"});
  }
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})