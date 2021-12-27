

const development = {
    name: 'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db: 'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user: '',
            pass: ''
        }
    },
    google_client_id: "59976620273-ng82o98pisv72ik18mqtjt4f3g6pa777.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
}


const production = {
    name: 'production',
}


module.exports = development;