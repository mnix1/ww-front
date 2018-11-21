import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";
import {
    INTRO_STEP_EDIT_TEAM_TEXT_0,
    INTRO_STEP_EDIT_TEAM_TEXT_1,
    INTRO_STEP_EXPERIMENT_TEXT_0,
    INTRO_STEP_EXPERIMENT_TEXT_1,
    INTRO_STEP_EXPERIMENT_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_0,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_3,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_4,
    INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_0,
    INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_1,
    INTRO_STEP_GO_TO_OPTIONS_TEXT_0,
    INTRO_STEP_GO_TO_WISIES_TEXT_0,
    INTRO_STEP_GO_TO_WISIES_TEXT_1,
    INTRO_STEP_GO_TO_WISIES_TEXT_2,
    INTRO_STEP_GO_TO_WISIES_TEXT_3,
    INTRO_STEP_GO_TO_WISOR_TEXT_0,
    INTRO_STEP_GO_TO_WISOR_TEXT_1,
    INTRO_STEP_NEW_WISIE_TEXT_0,
    INTRO_STEP_NEW_WISIE_TEXT_1,
    INTRO_STEP_NEW_WISIE_TEXT_2,
    INTRO_STEP_NEW_WISIE_TEXT_3,
    INTRO_STEP_OPTIONS_TEXT_0,
    INTRO_STEP_OPTIONS_TEXT_1,
    INTRO_STEP_OPTIONS_TEXT_2,
    INTRO_STEP_WELCOME_TEXT_0,
    INTRO_STEP_WELCOME_TEXT_1,
    INTRO_STEP_WELCOME_TEXT_2,
    INTRO_STEP_WELCOME_TEXT_3,
    INTRO_STEP_WELCOME_TEXT_4,
    INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_0,
    INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_1,
    INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_2,
    INTRO_STEP_WISIE_DETAILS_TEXT_0,
    INTRO_STEP_WISIE_DETAILS_TEXT_1,
    INTRO_STEP_WISIE_DETAILS_TEXT_2,
    INTRO_STEP_WISIE_DETAILS_TEXT_3,
    PICK_WISIE_COUNT,
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
        [INTRO_STEP_OPTIONS_TEXT_2]: 'Wpisz swoje nick i kliknij',

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

        [INTRO_STEP_EXPERIMENT_TEXT_0]: 'Wiedzaki to Twoi uczniowie, których możesz rozwijać i uczyć nowych rzeczy.',
        [INTRO_STEP_EXPERIMENT_TEXT_1]: 'Zdobywa się je przeprowadzając eksperymenty naukowe.',
        [INTRO_STEP_EXPERIMENT_TEXT_2]: 'Wykonaj teraz jeden z nich.',

        [INTRO_STEP_NEW_WISIE_TEXT_0]: 'Gratulacje! Oto Twój pierwszy wiedzak ;)',
        [INTRO_STEP_NEW_WISIE_TEXT_1]: 'W prawym górnym rogu znajdują się jego zainteresowania.',
        [INTRO_STEP_NEW_WISIE_TEXT_2]: 'Natomiast po lewej stronie średnia wartość jego statystyk.',
        [INTRO_STEP_NEW_WISIE_TEXT_3]: 'Proszę kliknij na niego żeby zobaczyć szczegóły.',

        [INTRO_STEP_WISIE_DETAILS_TEXT_0]: 'Widzimy teraz statystyki Twojego wiedzaka.',
        [INTRO_STEP_WISIE_DETAILS_TEXT_1]: 'W tym miejscu możesz je ulepszać za cenę punktów wiedzy.',
        [INTRO_STEP_WISIE_DETAILS_TEXT_2]: 'Aby to zrobić kliknij proszę na znak',
        [INTRO_STEP_WISIE_DETAILS_TEXT_3]: 'lub jeśli nie chcesz nic ulepszać, kliknij przycisk "Kontynuuj".',

        [INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_0]: 'Przejdziemy teraz do wyboru reszty wiedzaków do Twojej drużyny.',
        [INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_1]: `Będziesz mógł wybrać ${PICK_WISIE_COUNT}, która najbardziej Ci się podoba.`,
        [INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_2]: 'Proszę kliknij tutaj w celu zamknięcia okna statystyk.',

        [INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_0]: 'Gratulacje! Udało Ci się zdobyć wystarczającą ilość wiedzaków do utworzenia drużyny.',
        [INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_1]: 'Proszę kliknij tutaj, aby przejść do ekranu edycji drużyny.',

        [INTRO_STEP_EDIT_TEAM_TEXT_0]: 'Teraz możesz utworzyć swoją drużynę.',
        [INTRO_STEP_EDIT_TEAM_TEXT_1]: 'Proszę wybierz 4 wiedzaki, a następnie kliknij przycisk "Zapisz".',

        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_0]: 'Twoja drużyna została utworzona i ma się dobrze ;)',
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_1]: 'Czeka na Was wiele przygód. Możecie udać się na kampanię lub wojnę, aby konkurować z innymi.',
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_2]: 'Dziękuję Ci za cierpliwość i współpracę :D',
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_3]: 'Póki co to wszystko co mam Ci do pokazania.',
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_4]: 'Do zobaczenia wkrótce ;)',
    },
    [ENGLISH]: {
        [INTRO_STEP_WELCOME_TEXT_0]: "Welcome in Wisiemania Game!",
        [INTRO_STEP_WELCOME_TEXT_1]: "Let me show you around and give you some tips.",
        [INTRO_STEP_WELCOME_TEXT_2]: "Here comes the first one:",
        [INTRO_STEP_WELCOME_TEXT_3]: "To go to the main menu just click Wisiemania at the top of the screen whenever you want.",
        [INTRO_STEP_WELCOME_TEXT_4]: "If you want previous page just press back button in your explorer or device.",

        [INTRO_STEP_GO_TO_OPTIONS_TEXT_0]: "Click here to open the settings page.",

        [INTRO_STEP_OPTIONS_TEXT_0]: "In Settings you can change your nickname and your Wisor.",
        [INTRO_STEP_OPTIONS_TEXT_1]: "You can change your nickname right now if you wish.",
        [INTRO_STEP_OPTIONS_TEXT_2]: "Enter your nickname and click",

        [INTRO_STEP_GO_TO_WISOR_TEXT_0]: "Please click here to choose your Wisor.",
        [INTRO_STEP_GO_TO_WISOR_TEXT_1]: "You can do it by pressing it's photo.",

        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0]: "Very nice ;)",
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1]: "Your Wisor will guide you further.",
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2]: "Wisor awaits you in main menu.",
        [INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3]: "Good luck, nice meeting you :D",

        [INTRO_STEP_GO_TO_WISIES_TEXT_0]: "Hi ^_^!",
        [INTRO_STEP_GO_TO_WISIES_TEXT_1]: "Thanks for the trust :)",
        [INTRO_STEP_GO_TO_WISIES_TEXT_2]: "How about learning some stuff about Wisies?",
        [INTRO_STEP_GO_TO_WISIES_TEXT_3]: "Press here once you're ready.",

        [INTRO_STEP_EXPERIMENT_TEXT_0]: "Wisies are your students, you can train them and teach new skills.",
        [INTRO_STEP_EXPERIMENT_TEXT_1]: "To gather more and more Wisies you do scientific experiments.",
        [INTRO_STEP_EXPERIMENT_TEXT_2]: "Let's run one experiment now.",

        [INTRO_STEP_NEW_WISIE_TEXT_0]: "Congrats! That's your first Wisie ;)",
        [INTRO_STEP_NEW_WISIE_TEXT_1]: "In the top right corner are Wisie's interests.",
        [INTRO_STEP_NEW_WISIE_TEXT_2]: "On the left is mean value fo Wisie's statistics.",
        [INTRO_STEP_NEW_WISIE_TEXT_3]: "Click on Wisie for more details.",

        [INTRO_STEP_WISIE_DETAILS_TEXT_0]: "Now you can see all your Wisie's statistics.",
        [INTRO_STEP_WISIE_DETAILS_TEXT_1]: "Here you can upgrade them in exchange for Wisdom Points.",
        [INTRO_STEP_WISIE_DETAILS_TEXT_2]: "To do so, please click",
        [INTRO_STEP_WISIE_DETAILS_TEXT_3]: "or just press 'Continue'.",

        [INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_0]: "Now let's choose the rest of Wisies for your Team.",
        [INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_1]: `You select those ${PICK_WISIE_COUNT} you prefer.`,
        [INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_2]: "Press here to close statistics window.",

        [INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_0]: "Congrats! You have enough Wisies to make a Team.",
        [INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_1]: "Press to edit your Team.",

        [INTRO_STEP_EDIT_TEAM_TEXT_0]: "Now you can set up the Team.",
        [INTRO_STEP_EDIT_TEAM_TEXT_1]: "Select 4 Wisies and press 'Save'.",

        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_0]: "Your Team has been set up and is doing well ;)",
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_1]: "There are plenty adventures waiting for you guys. You can go to campain or war to compete with others.",
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_2]: "It's a pleasure working with you :D",
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_3]: "That's all I wanted to show you for now.",
        [INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_4]: "See you ;)",
    }
};