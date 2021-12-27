const express = require('express')
const env = require('./config/environment')
const cookieParser = require('cookie-parser');
const app = express()
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy')

// mongostore is used to store the session cookie in the db
const MongoStore = require('connect-mongo',session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Setup  the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');
const path = require('path');


app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
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


app.use(express.static(env.asset_path))


// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:env.session_cookie_key,
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