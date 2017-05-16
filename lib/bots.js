var fs      = require('fs'),
    path    = require('path'),
    colors  = require('colors'),
    cwd     = path.relative(__dirname, process.cwd());

module.exports = function(botname, botConfig) {
    console.log('loaded bot: '.green + botname);

    return function (req, res, next) {
        var cw      = require('simple-cw-node')(),
            ejs     = require('ejs'),
            bot     = require(cwd + '/bots/' + botname);

        // chatwork client initialize.
        cw.init({ token: botConfig.token });

        // run bot.
        bot({
            name: botname,
            next: next,
            client: cw,
            roomid: req.params.roomid,
            request: req,
            data: req.body,
            render: function(template, json) {
              return ejs.render(template, json).replace(/[\r\n]+$/, '');
            },
            readTemplate: function (filepath) {
                return fs.readFileSync(path.join('./templates/', filepath), 'utf8');
            },
            log: function (s) { console.log('  ' + s); },
            error: function (s) { console.error('  ' + s); },
            post: function (message) {
              var self = this;
              return self.client
                  .post('/rooms/' + self.roomid + '/messages', {
                      body: message
                  })
                  .done(function (res) {
                      self.log('Bot "' + self.name + '" sent to room ' + self.roomid);
                  })
                  .fail(function (err) {
                      self.error('Bot:"' + self.name + '" failed to send to room #' + self.roomid + ': ' + err);
                  });
            }
        });

        res.end(botname);
    };
};
