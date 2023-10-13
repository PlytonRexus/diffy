var config = {};

config.host = process.env.DIFFY_WEB_HOST || '127.0.0.1';
config.port = parseInt(process.env.DIFFY_WEB_PORT) || 3000;

config.session_collection = 'sessions';
config.session_secret = process.env.DIFFY_SESSION_SECRET || 'not-that-secret';

config.GA_ANALITYCS_KEY = process.env.DIFFY_GA_ANALYTICS_KEY || 'fake key';
config.GA_DIFFY_API_KEY = "diffApi";
config.GA_API_DEFAULT_KEY = "<no_ga_cookie>";

config.MAX_DIFF_SIZE = '1mb';
config.DIFF_REPO = {
    type: "double_write",
    primary: {
        type: "mongo",
        db_host: process.env.DIFFY_DB_HOST || '127.0.0.1',
        db_port: process.env.DIFFY_DB_PORT || '27017',
        db_name: 'diffy',
    },
    secondary: {
        type: "google"
    }
};

module.exports = config;
