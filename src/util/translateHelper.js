const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180920T140829Z.03313b4e60fee3d3.27a9bba14cda5a3fb244458544778005d127195f';

function translate(text) {
    return fetch(`${url}&text=${text}&lang=en-pl`)
        .then(value => value.json())
        .then(value => value.text[0]);
}

async function translateMulti(words) {
    const result = [];
    for (let i = 0; i < words.length; i++) {
        const word = await translate(words[i]);
        result.push(word);
    }
    // console.log(result, result.join(','));
    // return Promise.all(words.map(translate))
    //     .then(e => console.log(e, JSON.stringify(e.join(','))));
}

window.translate = translate;
window.translateMulti = translateMulti;