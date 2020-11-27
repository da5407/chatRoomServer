const { runInNewContext } = require('vm');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use('/api', (req, res, next) => {
    // //console.log(req.headers.origin);
    // var allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://127.0.0.1:3000', 'http://localhost:3000'];
    // var origin = req.headers.origin;
    // //console.log(req.headers.origin);
    // if (allowedOrigins.indexOf(origin) > -1) {
    //     res.header('Access-Control-Allow-Origin', origin);
    // }
    //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,PATCH,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => res.send('hello!'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});