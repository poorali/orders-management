const en = require('./en.json');

const messages = {
    en
};

function lang(key){
    return messages[process.env.SITE_LANG][key] || `[${key} not found]`;
}

module.exports = {lang}