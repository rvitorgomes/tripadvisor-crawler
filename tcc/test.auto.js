'use strict';

const Nightmare = require('nightmare');
const fs = require('fs');

const nightmare = Nightmare({
    show: true
});

async function spellCheck(post) {
    return await nightmare.goto('https://www.webspellchecker.net/web-services.html')
    .wait('body .row-box textarea')
    .insert(
        '.row-box textarea',
        false
    )
    .insert(   
        '.row-box textarea',
        post
    )
    //.select('#slang', 'it_IT')
    .select('#slang', 'hu_HU')	
    .click('input.btn-check')
    .wait(500)
    .evaluate(() => document.querySelector('.row-box textarea#result').value)
    .catch(err => (console.log(err), []));
}

/* iterate over the texts and save the results */

const post1 = 'Tutto comincia a fine ottobre, quando trovo un multitratta Lufthansa da Firenze a Helsinki con ritorno da Riga a 200 euro a testa per Pasqua. Mi sembra un buon prezzo e comincio a studiare l’itinerario. Chissà perché, nella mia testa sarebbe stato un tour primaverile, con località poco affollate ma già in risveglio dal freddo inverno. Invece… Il multitratta costa molto meno di a/r, ma ovviamente occorre pianificare per tempo gli spostamenti e arrivare a destinazione finale!  Ho a disposizione 6 giorni e 5 notti, che decido di suddividere in questo modo: una notte a Helsinki, poi nel tardo pomeriggio nave per Tallinn (sito Tallink, spesa 29 euro a testa, viaggio di 2 ore), due notti a Tallinn, poi a metà giornata bus per Riga (sito Lux Espress, spesa 12 euro a testa, viaggio di 4 ore e 20 minuti), due notti a Riga e ritorno.  A posteriori, scelta ben fatta e tempi giusati.  Il prezzo finale della gita sarà di poco più di 700 euro a testa';
const post2 = 'Ciao streghetta e bentornata!Helsinki e Tallinn...viste...anche se solo con scalo in crociera, Riga mi manca...sono tutta orecchi :-)';
const post3 = 'Ciao Gabi! Ricordo che tu hai [fatto la crociera...ti dico la verità: qualche anno fa ero stata tentata di fare la crociera nel Baltico, ma gli scali mi parevano troppo tirati per delle città, così ho deciso di "farla a pezzi". Prima San Pietroburgo con una settimana in Russia. due estati fa, poi Stoccolma lestate scorsa e ora queste. Sinceramente sono contenta della scelta, sai che a me la crociera piace come vacanza, ma questa mi sembrava che sacrificasse un po troppo dei luoghi che meritano molto.';

/* create a collection of posts from italian.posts.txt */

const POSTS = [post1, post2, post3];

async function crawler(posts) {
    console.log('start');
    const results = [];
    const t0 = Date.now();
    
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const response = await spellCheck(post);
        results.push(response);

        console.log(`Parsed ${i+1} of ${posts.length}`);
        console.log(JSON.parse(response));
    }

    const t1 = Date.now();
	console.log(`Total time: ${((t1 - t0) / 60 / 1000)} minutes`);
    //console.log(results);
}

crawler(POSTS);