(function(){
    var express = require('express');
    var api = require('./api.js');

    var app = express();
    var server;

    //API routing
    app.use('/api', api.routes);

    //Paths to static resources
    app.use('/js', express.static(__dirname + '/../dist/js'));
    app.use('/css', express.static(__dirname + '/../dist/css'));
    app.use('/views', express.static(__dirname + '/../dist/views'));
    //app.use('/dist', express.static(__dirname + '/dist'));

    //Fallthrough to AngularJS App
    app.get('/*', function(req, res){
        res.sendFile('index.html', { root: __dirname+'/../dist'});
    });

    function start(){
        server = app.listen(3000, function(){
            console.log('Web server started on %s:%s', server.address().host, server.address().port);
        });
    }

    module.exports = {
        start: start
    }
})();
