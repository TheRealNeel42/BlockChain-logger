#!/bin/bash

echo 'Starting app...'
cd app
node app.js &
cd ..
cd logviewer
node server.js &
cd client 
npm start
