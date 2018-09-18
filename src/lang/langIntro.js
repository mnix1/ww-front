import React from 'react';
import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";
import {
    INTRO_STEP_WELCOME_TEXT_0,
    INTRO_STEP_WELCOME_TEXT_1,
    INTRO_STEP_WELCOME_TEXT_2,
    INTRO_STEP_WELCOME_TEXT_3,
    INTRO_STEP_WELCOME_TEXT_4,
    INTRO_STEP_GO_TO_OPTIONS_TEXT_0,
    INTRO_STEP_GO_TO_PROFILE_TEXT_0,
    INTRO_STEP_OPTIONS_TEXT_0,
    INTRO_STEP_OPTIONS_TEXT_1,
    INTRO_STEP_OPTIONS_TEXT_2,
    INTRO_STEP_GO_TO_WISOR_TEXT_0,
    INTRO_STEP_GO_TO_WISOR_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3,
    INTRO_STEP_GO_TO_WISIES_TEXT_0,
    INTRO_STEP_GO_TO_WISIES_TEXT_1, INTRO_STEP_GO_TO_WISIES_TEXT_2, INTRO_STEP_GO_TO_WISIES_TEXT_3,
} from "../content/intro/introHelper";

export function getIntroText(id) {
    return INTRO_TEXT[getActiveLang()][id];
}

const INTRO_TEXT = {
    [POLISH]: {
        [INTRO_STEP_WELCOME_TEXT_0]: 'Witaj w Wiedzakomanii!',
        [INTRO_STEP_WELCOME_TEXT_1]: 'Pozwól, że oprowadzę Cię po tym miejscu oraz dam kilka cennych wskazówek.',
        [INTRO_STEP_WELCOME_TEXT_2]: 'Oto pierwsza z nich:',
        [INTRO_STEP_WELCOME_TEXT_3]: 'Możesz zawsze powrócić do ekranu głównego klikając nazwę gry, która znajduje się na górze ekranu.',
        [INTRO_STEP_WELCOME_TEXT_4]: 'Jeśli natomiast chcesz powrócić do poprzedniego ekranu, kliknij przysk wstecz przeglądarki internetowej.',

        [INTRO_STEP_GO_TO_OPTIONS_TEXT_0]: 'Proszę kliknij tutaj aby przejść do zakładki ustawień.',

        [INTRO_STEP_OPTIONS_TEXT_0]: 'W ustawieniach możesz zmienić swój nick oraz wiedzora.',
        [INTRO_STEP_OPTIONS_TEXT_1]: 'Jeśli chcesz zmienić swój nick możesz to zrobić teraz.',
        [INTRO_STEP_OPTIONS_TEXT_2]: 'W innym przypadku kliknij kontunuuj.',

        [INTRO_STEP_GO_TO_WISOR_TEXT_0]: 'Proszę kiliknij tutaj, aby przejść do wyboru wiedzora.',
        [INTRO_STEP_GO_TO_WISOR_TEXT_1]: 'Będziesz mógł to zrobić klikając na jego portret.',
        
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0]: 'Bardzo dobrze ;)',
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1]: 'Twój nowy wiedzor pokaże Ci resztę.',
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2]: 'Czeka na Ciebie w menu głównym.',
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3]: 'Powodzenia, miło było Cię poznać :D',

        [INTRO_STEP_GO_TO_WISIES_TEXT_0]: 'Cześć ^_^!',
        [INTRO_STEP_GO_TO_WISIES_TEXT_1]: 'Dziękuję, za Twoje zaufanie :)',
        [INTRO_STEP_GO_TO_WISIES_TEXT_2]: 'Może teraz dowiemy się czegoś o wiedzakach?',
        [INTRO_STEP_GO_TO_WISIES_TEXT_3]: 'Proszę kliknij tutaj, kiedy będziesz gotów.',

        [INTRO_STEP_GO_TO_PROFILE_TEXT_0]: 'Proszę kliknij tutaj, aby przejść do zakładki profilu.',
    },
    [ENGLISH]: {
        [INTRO_STEP_WELCOME_TEXT_0]: 'Leaflet',
    }
};