const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser')
// Load config
dotenv.config({ path: './config/config.env' })


// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Passport config
require('./config/passport')(passport)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// // Session
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
// }))

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// setting up static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routing
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth')); 
app.use('/api', require('./routes/api/todos'))

// Templating
// app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', '.hbs');

const PORT = process.env.PORT || 5000;
connectDB();
try {
    app.listen(PORT, () => { console.log(`Server running ${process.env.NODE_ENV} environment at port ${PORT}`) })

} catch (err) {
    console.log(err)
}