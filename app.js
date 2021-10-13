const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config')

require('./models/User')
require('./models/Score')
require('./models/Movie')
require('./models/Genre')
require('./models/Director')
require('./models/Country')
require('./models/Comment')
require('./models/Actor')
require('./models/CollectionsMovie')

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});

const app = express();

app.use(cors())

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));


// Импорт routes 
const users = require('./routes/users')
const actors = require('./routes/actors')
const directors = require('./routes/directors')
const genres = require('./routes/genres')
const scores = require('./routes/scores')
const countries = require('./routes/countries')
const movies = require('./routes/movies')
const collectionsMovie = require('./routes/collectionsMovie')


// Routes
app.use('/users', users);
app.use('/actors', actors);
app.use('/directors', directors)
app.use('/genres', genres);
app.use('/scores', scores);
app.use('/countries', countries)
app.use('/movies', movies)
app.use('/collectionsMovie', collectionsMovie)

app.use((req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    console.error(err);
});


const port = config.port;
app.listen(port, () => console.log(`Server is listening on port port ${port}.`));