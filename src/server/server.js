// HTTP SERVER
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const controller = require('./controllers');


function setPort(port = 4000) {
    app.set('port', parseInt(port, 10));
}

function listen() {
    const port = app.get('port') || config.port;
    app.listen(port, () => {
        console.log(
            `The server is running and listening at http://localhost:${port}`
        );
    });
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.get(
    '/rotaCalendars/events/list',
    controller.getEvents
);

app.post(
    '/rotaCalendars/events/insert',
    controller.postEvents
);

app.put(
    '/rotaCalendars/events/update',
    controller.updateEvents
)


module.exports = {
    getApp: () => app,
    setPort,
    listen
};