const path = require('path');

module.exports = {
    SERVER_PORT: 4000,
    SECRET: 'mailing-alcaldia-viota',
    API_KEY_SENDGRID: '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',
    DATABASE_USER: 'gglobhack',
    DATABASE_PASS: 'M0ng0db2020_ab',
    DATABASE_NAME: 'user-system-db',
    //FILES_DIR: path.join(__dirname,'files'),
    FILES_DIR: path.join('/app/src/','files'),
    EMAIL_SERVER: 'smtp.gmail.com',
    EMAIL_USER: 'gglobhack@gmail.com',
    EMAIL_PASS: 'gglobhack#2020', 
    EMAIL_NAME: 'Dirección de Tesorería Alcaldia de Viotá',
    EMAIL_PORT: 587,
    MULTIPLE_EMAIL_SENDER: '/multiple_sender',
    SIMPLE_EMAIL_SENDER: '/simple_sender'
}