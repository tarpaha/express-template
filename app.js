const port = 3000;
const isProduction = 'production' === process.env.NODE_ENV;

const express = require('express');
const app = express();

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
app.use('/', indexRouter);
app.use('/about', aboutRouter);

function startBrowserSync() {
    const browserSync = require('browser-sync');
    browserSync({
        files: ['views/**/*', 'public/**/*'],
        online: false,
        open: false,
        port: port + 1,
        proxy: 'localhost:' + port,
        ui: false
    });
}

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    if(!isProduction) {
        startBrowserSync();
    }
});
