"use strict";

const Hapi = require('@hapi/hapi');
const Fs = require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');
const constants = require('./constants');
const url = constants.DB_URL;
const service = require('./Service');


//Create Hapi Server
const server = new Hapi.Server({
    port: 8000,
    host: "localhost",
    routes: {
        cors: {
            origin: ['*'] // an array of origins or 'ignore'           
        }
    }
});


//Hookup all the routes....
Fs.readdirSync('./Routes').forEach((file) => {
    _.each(require('./Routes/' + file), (routes) => {
        server.route(routes);
    })
})

//Start Server
const init = async () => {
    //To serve static files
    await server.register(require('inert'))
    await server.start().then(mongoose.connect(url, {
        UseNewUrlParser: true
    }));
    service.email(constants.GMAIL, constants.GMAIL_PASSWORD);
    console.log("Server started successfully! \nPort number : ", server.info.uri);
}

//handle errors
process.on('unhandledRejection', (error) => {
    console.log(error.message);
    process.exit(1);
});

init();

