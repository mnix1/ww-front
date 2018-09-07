import {ENGLISH, POLISH} from "./langText";
import {
    DESTINATION_EASY,
    DESTINATION_HARD,
    DESTINATION_NORMAL, TYPE_CELEBRITY_LIFE, TYPE_SPACE_EXPEDITION, TYPE_UNDERWATER_WORLD
} from "../util/campaignHelper";
import _ from 'lodash';

export function getCampaignLabel(type, destination, phase) {
    const t = CAMPAIGN_LABELS[window.activeLang][type];
    const d = t[destination];
    if (_.isNil(phase)) {
        return d;
    }
    return d[phase];
}

const CAMPAIGN_LABELS = {
    [POLISH]: {
        [TYPE_SPACE_EXPEDITION]: {
            label: 'Kosmiczna wyprawa',
            description: 'Wraz ze swoją drużyną macie szansę przejść do historii jako bohaterowie. Waszym zadaniem jest opuszczenie Ziemii i udanie się do innych ciał niebieskich naszego układu planetarnego, a następnie pobranie próbek i bezpieczny powrót do domu. Powodzenia! Będzie Wam potrzebne...',
            [DESTINATION_EASY]: {
                label: 'Księżyc',
                0: 'Budowa statku',
                1: 'Wylot',
                2: 'Podróż',
                3: 'Lądowanie',
                4: 'Pobranie próbek',
                5: 'Powrót',
            },
            [DESTINATION_NORMAL]: {
                label: 'Mars',
                0: 'Budowa statku',
                1: 'Wylot',
                2: 'Podróż',
                3: 'Lądowanie',
                4: 'Pobranie próbek',
                5: 'Powrót',
            },
            [DESTINATION_HARD]: {
                label: 'Słońce',
                0: 'Budowa statku',
                1: 'Wylot',
                2: 'Podróż',
                3: 'Lądowanie',
                4: 'Pobranie próbek',
                5: 'Powrót',
            },
        },
        [TYPE_UNDERWATER_WORLD]: {
            label: 'Podwodny świat',
            description: 'Życie pod wodą posiada w sobie wiele tajemnic. Czas to zmienić! Udajcie się wgłąb ziemskich zbiorników wodnych w celu ich zbadania. Kto wie co uda Wam się tam odkryć?',
            [DESTINATION_EASY]: 'Jezioro',
            [DESTINATION_NORMAL]: 'Morze',
            [DESTINATION_HARD]: 'Ocean',
        },
        [TYPE_CELEBRITY_LIFE]: {
            label: 'Celebryckie życie',
            description: 'Bycie gwiazdą potrafi być męczące. Ciągłe spotkania z fanami, brak prywatności i stres naprawdę potrafią dać w kość. Jednak są też plusy bycia idolem nastolatków. Ty i Twoje wiedzaki musicie pokonać innych celebrytów podczas różnych okazji. Czy jesteście na to gotowi?',
            [DESTINATION_EASY]: 'Sylwester',
            [DESTINATION_NORMAL]: 'Premiera spektaklu',
            [DESTINATION_HARD]: 'Gala nagród',
        },
    },
    [ENGLISH]: {
        [TYPE_SPACE_EXPEDITION]: {
            label: 'Space expedition',
            description: 'Together with your team, you have the chance to go down in history as heroes. Your goal is to leave the Earth and go to other celestial bodies of our planetary system in order to take samples, and then safely return home. Good luck! You will need it...',
            [DESTINATION_EASY]: {
                label: 'Moon',
                0: 'Ship construction',
                1: 'Start',
                2: 'Flight',
                3: 'Landing',
                4: 'Sampling',
                5: 'Homecoming',
            },
            [DESTINATION_NORMAL]: {
                label: 'Mars',
                0: 'Ship construction',
                1: 'Start',
                2: 'Flight',
                3: 'Landing',
                4: 'Sampling',
                5: 'Homecoming',
            },
            [DESTINATION_HARD]: {
                label: 'Sun',
                0: 'Ship construction',
                1: 'Start',
                2: 'Flight',
                3: 'Landing',
                4: 'Sampling',
                5: 'Homecoming',
            },
        },
        [TYPE_UNDERWATER_WORLD]: {
            label: 'Underwater world',
            description: 'Life under water has many secrets. Time to change it! Go deeper into the earth\'s water reservoirs to study them. Who knows what you can discover there?',
            [DESTINATION_EASY]: 'Lake',
            [DESTINATION_NORMAL]: 'Sea',
            [DESTINATION_HARD]: 'Ocean',
        },
        [TYPE_CELEBRITY_LIFE]: {
            label: 'Celebrity life',
            description: 'Being a star can be tiring. Constant meetings with fans, lack of privacy and stress are not nice. However, there are also pluses of being an idol of teenagers. You and your wisies must defeat other celebrities on various occasions. Are you ready for it?',
            [DESTINATION_EASY]: "New Year's eve",
            [DESTINATION_NORMAL]: 'Performance premiere',
            [DESTINATION_HARD]: 'Film Awards',
        },
    }
};