
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

running tests- npm test