var express = require('express');
var port = process.env.PORT || 3000
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var scraperjs = require('scraperjs');
// mongodb://<dbuser>:<dbpassword>@ds153609.mlab.com:53609/sonali
var collections = ["users", "movies", "votes", "rate"]
var db = mongojs('mongodb://shubhammovieflix:shubhammovieflix@ds151941.mlab.com:51941/shubhammovieflix', collections)
var app = express();
var ObjectId = require('mongodb').ObjectID;
var session = require('client-sessions');
var Client = require('ftp');


function sendEmail(email, subject, title, message){
  var emailBody = '<html><body style="padding:40px;"><header style="background-color: #2196F3; padding: 10px !important; margin:0px !important;"><h1 style="color: #E3F2FD; text-align:center">Prosemedia Search Result</h1></header><div><div style="padding: 3%;"><br><h1>[TITLE]</h1><br>[MESSAGE]<br><br><br>Best, Prosemedia team,<br><br><br><br></div><footer style="background-color: #2196F3; padding: 3px !important; margin:0px !important;color: #E3F2FD; text-align: center; padding: 2%;">&#169; 2017 prosemedia(dot)com. All Rights Reserved.</footer></body></html>';
  emailBody = emailBody.replace("[TITLE]", title);
  emailBody = emailBody.replace("[MESSAGE]", "Hello "+email+"<br><br> "+message+"");
  var mailOptions={from : "prosemedia.se@gmail.com", to : email, subject : subject,  text : "Your Text", html : emailBody, }
      smtpTransport.sendMail(mailOptions, function(error, response){ 
      });
}

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname)));
// body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname)));



app.use(function(req, res, next) {
  if (req.session && req.session.users) {
    User.findOne({ email: req.session.users.email }, function(err, users) {
      if (users) {
        req.users = users;
        delete req.users.password; // delete the password from the session
        req.session.users = users;  //refresh the session value
        res.locals.currentuser = users;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

app.use(function(req, res, next){
  res.locals.session = req.session
  res.locals.currentuser = req.user;
  next();
})

function requireLogin (req, res, next) {
  if (!req.session.users) {
      res.render("login.ejs",{message: 'Sorry... Login required.'});
  } else {
    next();
  }
};

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.get('/logout/', function(req, res) {
  req.session.reset();
  res.redirect('/');
});



app.get('/', function(req, res){
  if(req.session.users) console.log(req.session.users.email);
  else console.log("LOGIN NOT PRESENT");
  res.render("index.ejs");
});

app.post('/newuser', function(req, res){
    console.log()
    var newUser = req.body;
    var datetime = new Date();
    var email = req.body.email;
    db.users.findOne({ email: req.body.email }, function(err, users) {
      if (!users) {
        db.users.insert(newUser, function(err, result){
          if(err){console.log(err);}
          req.session.users = newUser;
          res.send("User Created");
        });
      } else {
          res.send("DUPLICATE USER");
      }
    });
  });


app.post('/login', function(req, res) {
  console.log(req.body.email);
  db.users.findOne({ email: req.body.email }, function(err, users) {
    if (!users) {
      res.send("ENR"); 
    } else {
      if (req.body.password === users.password) {
        req.session.users = users;
        res.send(users);
      } else {
       res.send("PW");
      }
    }
  });
});

app.get('/checkLogin', function(req, res) {
  if(req.session.users) return res.send(req.session.users);
  else{ return res.send("nologin"); }
});

app.get('/getMovies/:pageNo', function(req, res) {
  var pageNo = req.params.pageNo;
  var skip = pageNo*9;
  db.movies.find({}).skip(skip).limit(9).toArray(function (err, movies) {
    res.send(movies);
  })
});

app.get('/getTopRatedMovies', function(req, res) {
  db.movies.find({type: "movie"}).skip(0).sort({imdbRating: -1}).limit(9).toArray(function (err, movies) {
    res.send(movies);
  })
});

app.get('/getTopRatedSeries', function(req, res) {
  db.movies.find({type: "series"}).skip(0).sort({imdbRating: -1}).limit(9).toArray(function (err, movies) {
    res.send(movies);
  })
});



app.get('/getPaginationData/:pageNo', function(req, res) {
  var pageNo = Number(req.params.pageNo);
  db.movies.find({}).toArray(function (err, movies) {
    var totalPages = Math.ceil(movies.length/9);
    var first = 0;
    var prev = pageNo-1;
    if(prev<0) prev = 0;
    var next = pageNo+1;
    var last = totalPages-1;
    var pager = [];
    for (var i = 0; i<totalPages; i++) {
      var obj = {no: i};
      pager.push(obj);
    }
    if(pageNo===0) p=0;
    var pageData = {first: first, prev: prev, curr: pageNo, pager: pager, next:next, last:last }
    console.log(pageData);
    res.send(pageData);
  })
});


app.get('/getLatestMovies', function(req, res) {
  db.movies.find({}).skip(0).limit(4).toArray(function (err, movies) {
    res.send(movies);
  })
});

app.get('/getMovie/:id', function(req, res) {
   var id = ObjectId(req.params.id);
   db.movies.findOne({_id: id}, function(err, movie){
    console.log("MOVIE OBJECT: "+movie);
    res.send(movie);
  });
});

app.get('/voteUp/:id', function(req, res) {
    var id = req.params.id.split("-");
    var movId = ObjectId(id[0]);
    var userId = ObjectId(id[1]);
    var newVote = {movId: movId, userId: userId }
    db.votes.findOne({movId: movId, userId: userId}, function(err, vote) {
      db.movies.findOne({_id: movId}, function(err, movie) {
        // vote++ in movie
        // insert entry in votes
        if (!vote) {
          db.movies.update({_id: movId},{$set : {"imdbVotes": movie.imdbVotes+1}},{upsert:true,multi:false});
            db.votes.insert(newVote, function(err, voteinsert){
              db.movies.findOne({_id: movId}, function(err, updatedMovie) {
                res.send(updatedMovie);
              });
            });
        }else{
          // vote-- in movie
          // delete entry in vote
          db.movies.update({_id: movId},{$set : {"imdbVotes": movie.imdbVotes-1}},{upsert:true,multi:false});
            db.votes.remove({movId: movId, userId: userId}, function(err, voteinsert){
              db.movies.findOne({_id: movId}, function(err, updatedMovie) {
                res.send(updatedMovie);
              });
            });
        }
      });  
    });  
    console.log("/voteUp/:id = "+movId+", "+userId);
});

app.get('/rateUp/:id', function(req, res) {
    var id = req.params.id.split("-");
    var movId = ObjectId(id[0]);
    var userId = ObjectId(id[1]);
    var rate = id[2];
    var newRate = {movId: movId, userId: userId, rate: rate }
    db.rate.findOne({movId: movId, userId: userId}, function(err, rate) {
      db.movies.findOne({_id: movId}, function(err, movie) {
        // update movie in any case
        db.movies.update({_id: movId},{$set : {"imdbRating": movie.imdbRating+0.1}},{upsert:true,multi:false});

        // if rate found update it 
        // if no rating found insert rating

        if (!rate) {
            db.rate.insert(newRate, function(err, rateinsert){
              db.movies.findOne({_id: movId}, function(err, updatedMovie) {
                res.send(updatedMovie);
              });
            });
        }else{
          db.rate.update({_id: movId},{$set : {"imdbRating": movie.imdbRating+0.1}},{upsert:true,multi:false});
            db.movies.findOne({_id: movId}, function(err, updatedMovie) {
              res.send(updatedMovie);
            });
        }
      });  
    });  
    console.log("/rateUp/:id = "+movId+", "+userId);
});

app.listen(port, function() {
  console.log('Listening on port ' + port)
});