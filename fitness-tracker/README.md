
To run the app use command.  Nodemon is used within this command to watch for changes.
```
npm start
```

To run the app for debugging purposes, run the following command which will tell nodejs to turn on logging
```
DEBUG=fitnesstracker:* npm start
```
The * in fitnesstracker:* means to see all the internal logs used in Express.
If you only want to see the logs from the router implementation, then set the value of DEBUG to fitnesstracker:router. Likewise, to see logs only from the application implementation set the value of DEBUG to fitnesstracker:application, and so on.


The app structure created by express-generator:

├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files

To run Jest unit tests, use:
```
npm test
```

Endpoints
Get all workouts at:
```
http://localhost:3000
```
Post new workout to:
```
http://localhost:3000
```
With a workout in the format
```
{
    "items":{"user_name":"testname", "workout_type":"testtype", "workout_date":"01/03/2022"}
}
```

Get filtered workouts by month and year
```
http://localhost:3000/filter?month=03&year=2022
```