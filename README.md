# gTerminal IP GeoLocation finder

A barebones Node.js app to map IP address to a location

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/markgzhou/gterminal-heroku-ip 
$ cd gterminal-heroku-ip
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

Open another shell, and run
```sh
curl -X POST 'http://localhost:5000/?ip=202.22.12.130'
```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
