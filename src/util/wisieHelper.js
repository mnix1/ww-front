import ant from '../media/image/wisie/ant.svg';
import bee from '../media/image/wisie/bee.svg';
import catBlue from '../media/image/wisie/catBlue.png';
import gorilla from '../media/image/wisie/gorilla.png';
import sheep from '../media/image/wisie/sheep.png';
import lion from '../media/image/wisie/lion.png';
import snake from '../media/image/wisie/snake.png';
import eagle from '../media/image/wisie/eagle.png';
import horse from '../media/image/wisie/horse.png';
import raccoon from '../media/image/wisie/raccoon.svg';
import aurochs from '../media/image/wisie/aurochs.png';
import rabbit from '../media/image/wisie/rabbit.png';
import dragon from '../media/image/wisie/dragon.png';
import shark from '../media/image/wisie/shark.svg';
import wolf from '../media/image/wisie/wolf.png';
import elephant from '../media/image/wisie/elephant.png';
import turkey from '../media/image/wisie/turkey.png';
import parrot from '../media/image/wisie/parrot.png';
import catTeacher from '../media/image/wisie/catTeacher.png';
import fox from '../media/image/wisie/fox.png';
import bear from '../media/image/wisie/bear.svg';
import turtle from '../media/image/wisie/turtle.svg';
import kangaroo from '../media/image/wisie/kangaroo.png';
import tiger from '../media/image/wisie/tiger.png';
import catPresenter from '../media/image/wisie/catPresenter.png';
import bull from '../media/image/wisie/bull.svg';
import ostrich from '../media/image/wisie/ostrich.png';
import crocodile from '../media/image/wisie/crocodile.png';
import polarBear from '../media/image/wisie/polarBear.svg';
import dog from '../media/image/wisie/dog.png';
import bulldog from '../media/image/wisie/bulldog.svg';
import camel from '../media/image/wisie/camel.png';
import dogFat from '../media/image/wisie/dogFat.png';
import dragonBlue from '../media/image/wisie/dragonBlue.png';
import dragonFat from '../media/image/wisie/dragonFat.png';
import foxMan from '../media/image/wisie/foxMan.png';
import pandaEat from '../media/image/wisie/pandaEat.png';
import lampard from '../media/image/wisie/lampard.png';
import dragonRed from '../media/image/wisie/dragonRed.png';
import dogSweet from '../media/image/wisie/dogSweet.png';
import squirrel from '../media/image/wisie/squirrel.png';
import frog from '../media/image/wisie/frog.svg';
import owl from '../media/image/wisie/owl.png';
import penguin from '../media/image/wisie/penguin.svg';
import walrus from '../media/image/wisie/walrus.svg';
import octopus from '../media/image/wisie/octopus.png';
import stork from '../media/image/wisie/stork.svg';
import chick from '../media/image/wisie/chick.svg';
import elephantChild from '../media/image/wisie/elephantChild.svg';
import owlHappy from '../media/image/wisie/owlHappy.svg';
import alligator from '../media/image/wisie/alligator.png';
import giraffe from '../media/image/wisie/giraffe.png';
import koala from '../media/image/wisie/koala.svg';
import monkey from '../media/image/wisie/monkey.svg';
import raccoonBrown from '../media/image/wisie/raccoonBrown.png';
import worm from '../media/image/wisie/worm.png';
import {getName} from "../lang/langText";
import _ from 'lodash';

const WISIE = {
    'ALLIGATOR': {imgSrc: alligator, namePolish: 'Ali', nameEnglish: 'Ali'},
    'ANT': {imgSrc: ant, namePolish: 'Mrówkacz', nameEnglish: 'Anton'},
    'AUROCHS': {imgSrc: aurochs, namePolish: 'Żubrowar', nameEnglish: 'Biz-on'},
    'BEE': {imgSrc: bee, namePolish: 'Żądłolot', nameEnglish: 'Beellie'},
    'BEAR': {imgSrc: bear, namePolish: 'Dźwiedzior', nameEnglish: 'Teddo'},
    'BULL': {imgSrc: bull, namePolish: 'Byku', nameEnglish: 'Bullo'},
    'BULLDOG': {imgSrc: bulldog, namePolish: 'Pudziuś', nameEnglish: 'Athlete'},
    'CAMEL': {imgSrc: camel, namePolish: 'Wielobłąd', nameEnglish: 'Cameleoman'},
    'CAT_BLUE': {imgSrc: catBlue, namePolish: 'Mruczka', nameEnglish: 'Frisky'},
    'CAT_PRESENTER': {imgSrc: catPresenter, namePolish: 'Kituś', nameEnglish: 'Kit-O'},
    'CAT_TEACHER': {imgSrc: catTeacher, namePolish: 'Kicia', nameEnglish: 'Kitty'},
    'CHICK': {imgSrc: chick, namePolish: 'Piskacz', nameEnglish: 'Shyriek'},
    'CROCODILE': {imgSrc: crocodile, namePolish: 'Kroczek', nameEnglish: 'Gator'},
    'DOG': {imgSrc: dog, namePolish: 'Bystruś', nameEnglish: 'Smartie'},
    'DOG_FAT': {imgSrc: dogFat, namePolish: 'Pulszek', nameEnglish: 'Cuddle'},
    'DOG_SWEET': {imgSrc: dogSweet, namePolish: 'Słodzik', nameEnglish: 'Cutie'},
    'DRAGON': {imgSrc: dragon, namePolish: 'Pikełło', nameEnglish: 'Scary-Gary'},
    'DRAGON_BLUE': {imgSrc: dragonBlue, namePolish: 'Supełło', nameEnglish: 'Kink-knot'},
    'DRAGON_FAT': {imgSrc: dragonFat, namePolish: 'Grubełło', nameEnglish: 'Chubbo'},
    'DRAGON_RED': {imgSrc: dragonRed, namePolish: 'Smakełło', nameEnglish: 'Foodie'},
    'EAGLE': {imgSrc: eagle, namePolish: 'Orłuś', nameEnglish: 'Tomeagle'},
    'ELEPHANT': {imgSrc: elephant, namePolish: 'Trąbcia', nameEnglish: 'Bugber'},
    'ELEPHANT_CHILD': {imgSrc: elephantChild, namePolish: 'Słoniu', nameEnglish: 'Ellie'},
    'FOX': {imgSrc: fox, namePolish: 'Lisiczka', nameEnglish: 'Foxy-Roxy'},
    'FOX_MAN': {imgSrc: foxMan, namePolish: 'Lizuś', nameEnglish: 'Brownosie'},
    'FROG': {imgSrc: frog, namePolish: 'Żabcia', nameEnglish: 'Missfroggie'},
    'GIRAFFE': {imgSrc: giraffe, namePolish: 'Rafcia', nameEnglish: 'Giralla'},
    'GORILLA': {imgSrc: gorilla, namePolish: 'Goruś', nameEnglish: 'Strongie'},
    'HORSE': {imgSrc: horse, namePolish: 'Rumo', nameEnglish: 'Pony'},
    'KANGAROO': {imgSrc: kangaroo, namePolish: 'Skoczka', nameEnglish: 'Cheerful'},
    'KOALA': {imgSrc: koala, namePolish: 'Kolo', nameEnglish: 'Bro'},
    'LAMPARD': {imgSrc: lampard, namePolish: 'Pardzio', nameEnglish: 'Lurk'},
    'LION': {imgSrc: lion, namePolish: 'Bujnogrzyw', nameEnglish: 'Lux-mane'},
    'MONKEY': {imgSrc: monkey, namePolish: 'Mały', nameEnglish: 'Shortie'},
    'OCTOPUS': {imgSrc: octopus, namePolish: 'Ośmiornik', nameEnglish: 'Octopush'},
    'OSTRICH': {imgSrc: ostrich, namePolish: 'Strusior', nameEnglish: 'Ost-rich'},
    'OWL': {imgSrc: owl, namePolish: 'Sowcia', nameEnglish: 'Owlie'},
    'OWL_HAPPY': {imgSrc: owlHappy, namePolish: 'Mądruś', nameEnglish: 'Bighead'},
    'PANDA_EAT': {imgSrc: pandaEat, namePolish: 'Pandziu', nameEnglish: 'Pandice'},
    'PARROT': {imgSrc: parrot, namePolish: 'Zgapka', nameEnglish: 'Sloppy'},
    'PENGUIN': {imgSrc: penguin, namePolish: 'Pinguś', nameEnglish: 'Pengpong'},
    'POLAR_BEAR': {imgSrc: polarBear, namePolish: 'Misiaczek', nameEnglish: 'Littlebear'},
    'RABBIT': {imgSrc: rabbit, namePolish: 'Kicek', nameEnglish: 'Kitter'},
    'RACCOON': {imgSrc: raccoon, namePolish: 'Szopuś', nameEnglish: 'Racco'},
    'RACCOON_BROWN': {imgSrc: raccoonBrown, namePolish: 'Wędrek', nameEnglish: 'Walker'},
    'SHARK': {imgSrc: shark, namePolish: 'Ząbek', nameEnglish: 'Bittero'},
    'SHEEP': {imgSrc: sheep, namePolish: 'Wełnuś', nameEnglish: 'Woolly'},
    'SNAKE': {imgSrc: snake, namePolish: 'Jaduś', nameEnglish: 'Snakiee'},
    'STORK': {imgSrc: stork, namePolish: 'Bociek', nameEnglish: 'Storkie'},
    'SQUIRREL': {imgSrc: squirrel, namePolish: 'Wiewcia', nameEnglish: 'Speedo'},
    'TIGER': {imgSrc: tiger, namePolish: 'Zdzigrys', nameEnglish: 'Petiger'},
    'TURKEY': {imgSrc: turkey, namePolish: 'Induś', nameEnglish: 'Turk'},
    'TURTLE': {imgSrc: turtle, namePolish: 'Skorupny', nameEnglish: 'Shello'},
    'WALRUS': {imgSrc: walrus, namePolish: 'Morsu', nameEnglish: 'Walrus'},
    'WORM': {imgSrc: worm, namePolish: 'Robcio', nameEnglish: 'Robo'},
    'WOLF': {imgSrc: wolf, namePolish: 'Wilku', nameEnglish: 'Wolfart'},
};

export const WISIE_TEAM_COUNT = 4;

export const WISIE_MAX_HOBBY_COUNT = 3;

export function getWisieImgSrc(wisieType) {
    return WISIE[wisieType].imgSrc;
}

export function getWisieName(wisieType, lang) {
    return getName(WISIE[wisieType], lang);
}

export const WISIES = _.map(WISIE, (v, k) => k);

const MIN_WISIE_WIDTH = 150;
export const MAX_WISIE_WIDTH = 230;

const wisieWidthCache = {};

export function calculateWisieWidth(contentWidth) {
    const cacheValue = wisieWidthCache[contentWidth];
    if (cacheValue) {
        return cacheValue;
    }
    let minCount = Math.floor(contentWidth / MAX_WISIE_WIDTH);
    let maxCount = Math.floor(contentWidth / MIN_WISIE_WIDTH);
    if (minCount === maxCount) {
        return MAX_WISIE_WIDTH;
    }
    if (maxCount - minCount > 1) {
        return contentWidth / ((maxCount + minCount) / 2);
    }
    if (minCount === 1) {
        return contentWidth / maxCount;
    }
    if (minCount === 0) {
        return MIN_WISIE_WIDTH;
    }
    return contentWidth / minCount;
}