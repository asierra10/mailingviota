const path = require('path');

module.exports = {
    SERVER_PORT: 4000,
    SECRET: 'mailing-alcaldia-viota',
    API_KEY_SENDGRID: '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',
    DATABASE_USER: 'gglobhack',
    DATABASE_PASS: 'globhack2020',
    DATABASE_NAME: 'user-system-db',
    FILES_DIR: path.join(__dirname,'files'),
    EMAIL_SERVER: 'smtp.gmail.com',
    EMAIL_USER: 'gglobhack@gmail.com',
    //EMAIL_PASS: 'gglobhack#2020', 
    EMAIL_PASS: 'xavjnclknhdotshz',
    EMAIL_NAME: 'Dirección de Tesorería Alcaldia de Viotá',
    EMAIL_PORT: 587,
    MULTIPLE_EMAIL_SENDER: '/api/multiple_sender',
    SIMPLE_EMAIL_SENDER: '/api/simple_sender',
    GET_ALL_INFORMED_EMAILS: '/api/allInformedEmails',
    GET_ALL_FILENAMES: '/api/allFileNames',
    GET_ALL_INFORMEDCLIENTS_BY_FILENAME: '/api/getAllInformedClientsByFilename/:fileName'
}