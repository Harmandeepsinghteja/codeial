const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// mongostore is used to store the session cookie in the db
const MongoStore = require('connect-mongo',session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))


app.use(express.urlencoded());

app.use(cookieParser());
// make the upload path availabe to the browser
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'))


// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    
    // old way
    // store: new MongoStore({
        
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
        
    // },
    // function(err){
    //     console.log(err || 'connect-mongodb setup ok');
    // }
    // )

    // New way
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_development'
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
} );