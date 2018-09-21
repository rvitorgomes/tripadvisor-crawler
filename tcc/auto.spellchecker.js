'use strict';

const fs = require('fs');
const axios = require('axios');
const utf8 = require('utf8');
const keyBy = require('lodash/keyBy');
const pickBy = require('lodash/pickBy');
const uniqBy = require('lodash/uniqBy');
const filter = require('lodash/filter');
const map = require('lodash/map');

/* const posts = fs.readFileSync('./italian_posts.txt', { encoding: 'utf8' });
const lines = posts
    .split(/\n/)
    .filter(v => (!!v && v !== '==============================================================================='));

console.log('Will check', lines.length, 'lines...');

const customerid = decodeURI('1%3AncttD3-fIoSf2-huzwE4-Y5muI2-mD0Tt-kG9Wz-UEDFC-tYu243-1Uq474-d9Z2l3&');

let i = 0;

const check_spelling = async (text) => {
    return axios.get(
        'https://www.webspellchecker.net/spellcheck3/script/ssrv.cgi?cmd=check_spelling'+
        '&customerid=' + customerid +
        '&text=' + encodeURI(text) +
        '&slang=it_IT&format=json&out_type=words' +
        '&ignore_domain_names=1' +
        '&ignore_words_with_numbers=1',
    {
        headers: { 'Referer': 'https://www.webspellchecker.net/web-services.html', 'Origin': 'https://www.webspellchecker.net/web-services.html' }
    }
    )
    .then(data => {
        i++;
        console.log(i, ((i * 100)/ (lines.length)), "%");
        return data;
    })
    .then(({ data }) => data[0])
    .catch(err => {})
}

Promise.all(lines.map((text) => text ? check_spelling(text) : {}))
    .then(response => {
        fs.writeFileSync('auto.spellchecker.results.json', JSON.stringify(response, null, 2));
    });
 */

const false_spellcheckings = [
    'albums',
    'am',
    'American',
    'american',
    'AR',
    'Arenal',
    'arenal',
    'ATM',
    'atm',
    'Attraction',
    'Auckland',
    'audioguide',
    'Avenida',
    'avenida',
    'Avenue',
    'avenue',
    'Aviv',
    'azulejos',
    'back',
    'Bagan',
    'Bahamas',
    'Baker',
    'Balaton',
    'Balos',
    'bancomat',
    'Bank',
    'Barrio',
    'Bat',
    'bat',
    'Bathala',
    'Bath',
    'bath',
    'Bay',
    'Bayahibe',
    'Beb',
    'Beijing',
    'Belej',
    'Brugge',
    'Bryce',
    'Buckingham',
    '�',
    'zloty',
    'youtube',
    'Yosemite',
    'YC',
    'xyzeta',
    'Xyzeta',
    'xchè'
];

const results = JSON.parse(fs.readFileSync('./auto.spellchecker.results.json'));
const results_parsed = filter(keyBy(uniqBy(results.filter(v => !!v), 'word'), 'word'), (item) => 
    Array.isArray(item.suggestions) && 
    item.suggestions.length &&
    false_spellcheckings.indexOf(item.word) === -1
)
console.log(results_parsed);

fs.writeFileSync('auto.spellchecker.results.filtered.json', JSON.stringify(results_parsed, null, 2));