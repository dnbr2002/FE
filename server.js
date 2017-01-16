var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var ora = require('ora');
var dbFunc = require('./model/database.js');

var port = process.env.PORT || 3000;

var app = express();
var compiler = webpack(config);

var spinner = ora({
  interval: 100
});

function failAndExit(err) {
  spinner.fail();
  console.error(err.stack);
  process.exit(1);
}

app.use(express.static(__dirname + '/public/'));

app.use(morgan('combined'));

app.use(require('webpack-dev-middleware')(compiler, {
 filename: 'bundle.js',
  hot: true,
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));



app.use('/css', express.static(__dirname + '/src/css'));

app.use(stormpath.init(app, {
  // Disable logging until startup, so that we can catch errors
  // and display them nicely.
  debug: 'none',
  web: {
    produces: ['application/json'],
    me: {
      expand: {
        customData: true
      }
    },
    register: {
      form: {
        fields: {
          color: {
            enabled: true,
            label: 'Color',
            placeholder: 'E.g. blue',
            type: 'text'
          }
        }
      }
    }
  }
}));


app.get('/home/:email', function (req, res) {
    console.log("MIDDLE::HOME USER EMAIL"+ JSON.stringify(req.params.email));
    dbFunc.verifyUser(req.params.email, function (data, err) {
      if (data) {
        console.log("MIDDLE::RETURNED SQL - "+JSON.stringify(data))
        res.status(200).send(data);
      }else {
        console.log("GETFAILED");
        res.status(500).send('fail');
      }
    })
})

app.get('/eventers/:tier', function (req, res) {
    console.log("MIDDLE::GET TIER 1 EVENTERS CALLED "+ JSON.stringify(req.params.tier));
    dbFunc.getEventers(req.params.tier, function (data, err) {
      if (data) {
        console.log("MIDDLE::TIER 1 EVENTERS "+JSON.stringify(data))
        res.status(200).send(data);
      }else {
        console.log("MIDDLE::GETFAILED FOR TIER 1 EVENTERS");
        res.status(500).send('fail');
      }
    })
})


app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }

  function saveAccount() {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;
    console.log("REQ USER FROM /ME POST1: "+req.user);

    if ('color' in req.body.customData) {
      req.user.customData.color = req.body.customData.color;
    }

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      console.log("REQ USER FROM /ME POST2: "+req.user);
      res.end();
    });
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password;

      saveAccount();
    });
  } else {
    console.log("REQ USER FROM /ME POST3: "+req.user);
    saveAccount();
  }
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});



spinner.text = 'Starting Dev Sever on port ' + port,
spinner.start();

app.on('error', failAndExit);
app.on('stormpath.error', failAndExit);

app.listen(port, function () {
  spinner.succeed();
  spinner.text = 'Initializing Stormpath';
  spinner.start();
  app.on('stormpath.ready', function () {
    spinner.succeed();
    console.log('\nListening at http://localhost:' + port);
    // Now bring back error logging.
    app.get('stormpathLogger').transports.console.level = 'error';
  });

  // app.get('/me', function(req,res) {
  //    console.log("SP Info: " + JSON.stringify(res.body));
  // })
});

