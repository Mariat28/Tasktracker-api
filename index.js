const startupDebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const indexRoutes = require('./routes');
const express = require('express');
const config =  require('config');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

//configuration
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
console.log('Mail Password:' + config.get('mail.password'));


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('morgan enabled...');
}
app.use(logger);
app.use(indexRoutes);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
