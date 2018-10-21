import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../indexApp";
import {NAME_MAX_LENGTH} from "../content/settings/SettingsPage";
import React from 'react';

export const TEXT_APP_NAME = 'TEXT_APP_NAME';
export const TEXT_MAIL = 'TEXT_MAIL';
export const TEXT_CAMPAIGN_OVER = 'TEXT_CAMPAIGN_OVER';
export const TEXT_CAMPAIGN = 'TEXT_CAMPAIGN';
export const TEXT_NAME_LENGTH = 'TEXT_NAME_LENGTH';
export const TEXT_REQUIREMENT = 'TEXT_REQUIREMENT';
export const TEXT_OPPONENT_SURRENDER = 'TEXT_OPPONENT_SURRENDER';
export const TEXT_YOU_SURRENDER = 'TEXT_YOU_SURRENDER';
export const TEXT_SURRENDER = 'TEXT_SURRENDER';
export const TEXT_OPPONENT_CHOOSING = 'TEXT_OPPONENT_CHOOSING';
export const TEXT_NOT_CHOSEN_TASK_PROPS = 'TEXT_NOT_CHOSEN_TASK_PROPS';
export const TEXT_CONTINUE = 'TEXT_CONTINUE';
export const TEXT_CATEGORY = 'TEXT_CATEGORY';
export const TEXT_DIFFICULT = 'TEXT_DIFFICULT';
export const TEXT_DRAW_WHO_ANSWER = 'TEXT_DRAW_WHO_ANSWER';
export const TEXT_DRAW_CATEGORY = 'TEXT_DRAW_CATEGORY';
export const TEXT_DRAW_DIFFICULT = 'TEXT_DRAW_DIFFICULT';
export const TEXT_CHOOSE_CATEGORY = 'TEXT_CHOOSE_CATEGORY';
export const TEXT_CHOOSE_DIFFICULT = 'TEXT_CHOOSE_DIFFICULT';
export const TEXT_PLAY_AGAIN = 'TEXT_PLAY_AGAIN';
export const TEXT_PLAY = 'TEXT_PLAY';
export const TEXT_TRY_AGAIN = 'TEXT_TRY_AGAIN';
export const TEXT_QUESTION = 'TEXT_QUESTION';
export const TEXT_REMEMBER_DETAILS = 'TEXT_REMEMBER_DETAILS';
export const TEXT_CLICK_ON_ANY_TO_CONTINUE = 'TEXT_CLICK_ON_ANY_TO_CONTINUE';
export const TEXT_CORRECT_ANSWER = 'TEXT_CORRECT_ANSWER';
export const TEXT_TIME = 'TEXT_TIME';
export const TEXT_WAR = 'TEXT_WAR';
export const TEXT_CHOOSE_WHO_ANSWER = 'TEXT_CHOOSE_WHO_ANSWER';
export const TEXT_WRONG_ANSWER = 'TEXT_WRONG_ANSWER';
export const TEXT_IS_WRONG = 'TEXT_IS_WRONG';
export const TEXT_FRIENDS = 'TEXT_FRIENDS';
export const TEXT_ADD_FRIEND = 'TEXT_ADD_FRIEND';
export const TEXT_ENTER_TAG_HERE = 'TEXT_ENTER_TAG_HERE';
export const TEXT_WRONG_TAG = 'TEXT_WRONG_TAG';
export const TEXT_REQUEST_SENT = 'TEXT_REQUEST_SENT';
export const TEXT_ADD_FRIEND_ALREADY = 'TEXT_ADD_FRIEND_ALREADY';
export const TEXT_CHALLENGE_ADD_FRIENDS = 'TEXT_CHALLENGE_ADD_FRIENDS';
export const TEXT_ADD = 'TEXT_ADD';
export const TEXT_ADDED = 'TEXT_ADDED';
export const TEXT_START_CHALLENGE = 'TEXT_START_CHALLENGE';
export const TEXT_SCORE = 'TEXT_SCORE';
export const TEXT_CHALLENGE_OVER = 'TEXT_CHALLENGE_OVER';
export const TEXT_YOUR_SCORE = 'TEXT_YOUR_SCORE';
export const TEXT_POINTS = 'TEXT_POINTS';
export const TEXT_ANSWER_FOR_QUESTION = 'TEXT_ANSWER_FOR_QUESTION';
export const TEXT_QUESTION_PREPARING = 'TEXT_QUESTION_PREPARING';
export const TEXT_NEXT_QUESTION = 'TEXT_NEXT_QUESTION';
export const TEXT_NEXT = 'TEXT_NEXT';
export const TEXT_SUMMARY = 'TEXT_SUMMARY';
export const TEXT_SUGGEST_FRIENDS = 'TEXT_SUGGEST_FRIENDS';
export const TEXT_SUGGESTED_FRIENDS = 'TEXT_SUGGESTED_FRIENDS';
export const TEXT_NONE_FRIENDS = 'TEXT_NONE_FRIENDS';
export const TEXT_ACTUAL_FRIENDS = 'TEXT_ACTUAL_FRIENDS';
export const TEXT_NONE_SUGGESTED_FRIENDS = 'TEXT_NONE_SUGGESTED_FRIENDS';
export const TEXT_NONE_IN_PROGRESS_CHALLENGES = 'TEXT_NONE_IN_PROGRESS_CHALLENGES';
export const TEXT_IN_PROGRESS_CHALLENGES = 'TEXT_IN_PROGRESS_CHALLENGES';
export const TEXT_NO_PRIVATE_CHALLENGES = 'TEXT_NO_PRIVATE_CHALLENGES';
export const TEXT_PRIVATE_CHALLENGES = 'TEXT_PRIVATE_CHALLENGES';
export const TEXT_NONE_CLOSED_CHALLENGES = 'TEXT_NONE_CLOSED_CHALLENGES';
export const TEXT_CLOSED_CHALLENGES = 'TEXT_CLOSED_CHALLENGES';
export const TEXT_INVITES = 'TEXT_INVITES';
export const TEXT_CREATED = 'TEXT_CREATED';
export const TEXT_IN_PROGRESS = 'TEXT_IN_PROGRESS';
export const TEXT_POSITION = 'TEXT_POSITION';
export const TEXT_WAITING_FOR_RESPONSE = 'TEXT_WAITING_FOR_RESPONSE';
export const TEXT_WAITING = 'TEXT_WAITING';
export const TEXT_BATTLE = 'TEXT_BATTLE';
export const TEXT_CHALLENGE = 'TEXT_CHALLENGE';
export const TEXT_DELETE = 'TEXT_DELETE';
export const TEXT_INVITED_TO_BATTLE_BY = 'TEXT_INVITED_TO_BATTLE_BY';
export const TEXT_INVITED_TO_WAR_BY = 'TEXT_INVITED_TO_WAR_BY';
export const TEXT_INVITE_TO_BATTLE = 'TEXT_INVITE_TO_BATTLE';
export const TEXT_INVITE_TO_WAR = 'TEXT_INVITE_TO_WAR';
export const TEXT_SEARCHING_OPPONENT = 'TEXT_SEARCHING_OPPONENT';
export const TEXT_ACCEPT = 'TEXT_ACCEPT';
export const TEXT_REJECT = 'TEXT_REJECT';
export const TEXT_CANCEL = 'TEXT_CANCEL';
export const TEXT_CLEAR = 'TEXT_CLEAR';
export const TEXT_SAVE = 'TEXT_SAVE';
export const TEXT_FOR = 'TEXT_FOR';
export const TEXT_WAIT = 'TEXT_WAIT';
export const TEXT_OPPONENT_CORRECT_ANSWER = 'TEXT_OPPONENT_CORRECT_ANSWER';
export const TEXT_OPPONENT_WRONG_ANSWER = 'TEXT_OPPONENT_WRONG_ANSWER';
export const TEXT_BATTLE_OVER = 'TEXT_BATTLE_OVER';
export const TEXT_THE_WINNER_IS = 'TEXT_THE_WINNER_IS';
export const TEXT_DRAW = 'TEXT_DRAW';
export const TEXT_ANSWER = 'TEXT_ANSWER';
export const TEXT_YOU = 'TEXT_YOU';
export const TEXT_OWNED_WISIES = 'TEXT_OWNED_WISIES';
export const TEXT_NOT_OWNED_WISIES = 'TEXT_NOT_OWNED_WISIES';
export const TEXT_ANSWERED = 'TEXT_ANSWERED';
export const TEXT_NO_ANSWER = 'TEXT_NO_ANSWER';
export const TEXT_CHANGE_TASK_ACCEPTED = 'TEXT_CHANGE_TASK_ACCEPTED';
export const TEXT_CORRECT = 'TEXT_CORRECT';
export const TEXT_WRONG = 'TEXT_WRONG';
export const TEXT_READ = 'TEXT_READ';
export const TEXT_STOP_READING = 'TEXT_STOP_READING';
export const TEXT_DISCARD = 'TEXT_DISCARD';
export const TEXT_CLAIM_REWARD = 'TEXT_CLAIM_REWARD';
export const TEXT_AVAILABLE_RESOURCES = 'TEXT_AVAILABLE_RESOURCES';
export const TEXT_BOOKSHELF = 'TEXT_BOOKSHELF';
export const TEXT_EMPTY_BOOKSHELF = 'TEXT_EMPTY_BOOKSHELF';
export const TEXT_BUY = 'TEXT_BUY';
export const TEXT_POSSIBLE_REWARD = 'TEXT_POSSIBLE_REWARD';
export const TEXT_REWARD = 'TEXT_REWARD';
export const TEXT_SEASON_REWARDS = 'TEXT_SEASON_REWARDS';
export const TEXT_BOUGHT = 'TEXT_BOUGHT';
export const TEXT_TIME_LEFT = 'TEXT_TIME_LEFT';
export const TEXT_READ_FINISHED = 'TEXT_READ_FINISHED';
export const TEXT_EXPERIMENT = 'TEXT_EXPERIMENT';
export const TEXT_EXPERIMENT_SUCCESS = 'TEXT_EXPERIMENT_SUCCESS';
export const TEXT_WISIE_DISCOVERED = 'TEXT_WISIE_DISCOVERED';
export const TEXT_COST = 'TEXT_COST';
export const TEXT_SKILL = 'TEXT_SKILL';
export const TEXT_SHOW = 'TEXT_SHOW';
export const TEXT_HIDE = 'TEXT_HIDE';
export const TEXT_WISIES_TEAM = 'TEXT_WISIES_TEAM';
export const TEXT_EDIT = 'TEXT_EDIT';
export const TEXT_ALREADY_IN_TEAM = 'TEXT_ALREADY_IN_TEAM';
export const TEXT_TEAM_ADD = 'TEXT_TEAM_ADD';
export const TEXT_TEAM_REMOVE = 'TEXT_TEAM_REMOVE';
export const TEXT_SHOW_DETAILS = 'TEXT_SHOW_DETAILS';
export const TEXT_WAR_OVER = 'TEXT_WAR_OVER';
export const TEXT_YOUR_TEAM = 'TEXT_YOUR_TEAM';
export const TEXT_OPPONENT_TEAM = 'TEXT_OPPONENT_TEAM';
export const TEXT_CHOOSE_WISOR = 'TEXT_CHOOSE_WISOR';
export const TEXT_CHANGE_NICK = 'TEXT_CHANGE_NICK';
export const TEXT_CHANGE_WISOR = 'TEXT_CHANGE_WISOR';
export const TEXT_FILTER = 'TEXT_FILTER';
export const TEXT_RANKING = 'TEXT_RANKING';
export const TEXT_NO_PLAYERS_YET = 'TEXT_NO_PLAYERS_YET';
export const TEXT_SEASON = 'TEXT_SEASON';
export const TEXT_READ_NOW = 'TEXT_READ_NOW';
export const TEXT_START = 'TEXT_START';
export const TEXT_EXIT = 'TEXT_EXIT';
export const TEXT_CLAIM_AND_EXIT = 'TEXT_CLAIM_AND_EXIT';
export const TEXT_CHOOSE_TYPE = 'TEXT_CHOOSE_TYPE';
export const TEXT_CHOOSE_DESTINATION = 'TEXT_CHOOSE_DESTINATION';
export const TEXT_CHOOSE_TEAM = 'TEXT_CHOOSE_TEAM';
export const TEXT_LOGIN = 'TEXT_LOGIN';
export const TEXT_LOGOUT = 'TEXT_LOGOUT';
export const TEXT_RECONNECT = 'TEXT_RECONNECT';
export const TEXT_CONNECTING = 'TEXT_CONNECTING';
export const TEXT_CHOOSE_WISIES = 'TEXT_CHOOSE_WISIES';
export const TEXT_THIS_WINDOW = 'TEXT_THIS_WINDOW';
export const TEXT_YOUR_REWARD = 'TEXT_YOUR_REWARD';
export const TEXT_GUARANTEED_REWARD = 'TEXT_GUARANTEED_REWARD';
export const TEXT_NO_REWARDS = 'TEXT_NO_REWARDS';
export const TEXT_WISDOM = 'TEXT_WISDOM';
export const TEXT_MENTALITY = 'TEXT_MENTALITY';
export const TEXT_CREATE_CHALLENGE = 'TEXT_CREATE_CHALLENGE';
export const TEXT_CREATE = 'TEXT_CREATE';
export const TEXT_LOCK = 'TEXT_LOCK';
export const TEXT_UNLOCK = 'TEXT_UNLOCK';
export const TEXT_CHALLENGE_JOIN_COST = 'TEXT_CHALLENGE_JOIN_COST';
export const TEXT_CHALLENGE_JOIN_AND_NEXT_APPROACH_COST = 'TEXT_CHALLENGE_JOIN_AND_NEXT_APPROACH_COST';
export const TEXT_ACCESS = 'TEXT_ACCESS';
export const TEXT_POSSIBLE_APPROACHES = 'TEXT_POSSIBLE_APPROACHES';
export const TEXT_ONE = 'TEXT_ONE';
export const TEXT_MANY = 'TEXT_MANY';
export const TEXT_DURATION = 'TEXT_DURATION';
export const TEXT_CREATOR = 'TEXT_CREATOR';
export const TEXT_JOIN = 'TEXT_JOIN';
export const TEXT_PARTICIPANTS = 'TEXT_PARTICIPANTS';
export const TEXT_CREATION_DATE = 'TEXT_CREATION_DATE';
export const TEXT_CLOSE_DATE = 'TEXT_CLOSE_DATE';
export const TEXT_FREE_ENTRY = 'TEXT_FREE_ENTRY';
export const TEXT_PRIZE_POOL = 'TEXT_PRIZE_POOL';
export const TEXT_GLOBAL_CHALLENGE = 'TEXT_GLOBAL_CHALLENGE';
export const TEXT_CHALLENGE_CLOSED = 'TEXT_CHALLENGE_CLOSED';
export const TEXT_ENTER_CREATOR_PROFILE_TAG_TO_JOIN = 'TEXT_ENTER_CREATOR_PROFILE_TAG_TO_JOIN';
export const TEXT_APPROACHES = 'TEXT_APPROACHES';
export const TEXT_NO_MAIL = 'TEXT_NO_MAIL';

const TEXTS = {
    [POLISH]: {
        [TEXT_APP_NAME]: 'Wiedzakomania',
        [TEXT_NO_MAIL]: 'Nie masz wiadomości',
        [TEXT_MAIL]: 'Poczta',
        [TEXT_TRY_AGAIN]: 'Spróbuj ponownie',
        [TEXT_ONE]: 'Jedna',
        [TEXT_MANY]: 'Wiele',
        [TEXT_POSSIBLE_APPROACHES]: 'Możliwe próby',
        [TEXT_CHALLENGE_CLOSED]: 'Wyzwanie zakończone',
        [TEXT_GLOBAL_CHALLENGE]: 'Wyzwanie globalne',
        [TEXT_CREATED]: 'Utworzone',
        [TEXT_ENTER_CREATOR_PROFILE_TAG_TO_JOIN]: <span>To wyzwanie jest zabezpieczone.<br/>Aby do niego dołączyć podaj tag twórcy.</span>,
        [TEXT_IN_PROGRESS]: 'W trakcie',
        [TEXT_PRIZE_POOL]: 'Pula nagród',
        [TEXT_PLAY]: 'Graj',
        [TEXT_FREE_ENTRY]: 'Darmowy wstęp',
        [TEXT_CLOSE_DATE]: 'Data zakończenia',
        [TEXT_CREATION_DATE]: 'Data utworzenia',
        [TEXT_PARTICIPANTS]: 'Uczestnicy',
        [TEXT_APPROACHES]: 'Próby',
        [TEXT_JOIN]: 'Dołącz',
        [TEXT_CREATOR]: 'Twórca',
        [TEXT_PRIVATE_CHALLENGES]: 'Prywatne wyzwania',
        [TEXT_NO_PRIVATE_CHALLENGES]: 'Brak prywatnych wyzwań',
        [TEXT_DURATION]: 'Czas trwania',
        [TEXT_ACCESS]: 'Dostęp',
        [TEXT_CHALLENGE_JOIN_COST]: 'Koszt dołączenia',
        [TEXT_CHALLENGE_JOIN_AND_NEXT_APPROACH_COST]: 'Koszt dołączenia i następnej próby',
        [TEXT_LOCK]: 'Zamknięty',
        [TEXT_UNLOCK]: 'Otwarty',
        [TEXT_CREATE_CHALLENGE]: 'Utwórz wyzwanie',
        [TEXT_CREATE]: 'Utwórz',
        [TEXT_NO_PLAYERS_YET]: 'Jeszcze nikt nie został sklasyfikowany',
        [TEXT_SEASON]: 'Sezon',
        [TEXT_CHANGE_TASK_ACCEPTED]: 'Wniosek o zmianę pytania zaakceptowany',
        [TEXT_WISDOM]: 'Wiedza',
        [TEXT_MENTALITY]: 'Mentalność',
        [TEXT_GUARANTEED_REWARD]: 'Gwarantowana nagroda',
        [TEXT_NO_REWARDS]: 'Brak nagród',
        [TEXT_CONNECTING]: 'Łączenie',
        [TEXT_CLAIM_AND_EXIT]: 'Odbierz i wyjdź',
        [TEXT_POSSIBLE_REWARD]: 'Możliwa nagroda',
        [TEXT_YOUR_REWARD]: 'Twoja nagroda',
        [TEXT_THIS_WINDOW]: 'To okienko',
        [TEXT_CHOOSE_WISIES]: 'Wybierz wiedzaki',
        [TEXT_LOGOUT]: 'Wyloguj',
        [TEXT_RECONNECT]: 'Połącz ponownie',
        [TEXT_LOGIN]: 'Zaloguj się',
        [TEXT_CAMPAIGN]: 'Kampania',
        [TEXT_CAMPAIGN_OVER]: 'Zakończono etap kampanii',
        [TEXT_EXIT]: 'Wyjście',
        [TEXT_CHOOSE_TEAM]: 'Wybór drużyny',
        [TEXT_CHOOSE_TYPE]: 'Wybierz typ',
        [TEXT_CHOOSE_DESTINATION]: 'Wybierz cel',
        [TEXT_READ_NOW]: 'Przyspiesz',
        [TEXT_RANKING]: 'Ranking',
        [TEXT_FILTER]: 'filtr',
        [TEXT_NAME_LENGTH]: `długość 2-${NAME_MAX_LENGTH} znaków`,
        [TEXT_CHANGE_NICK]: 'Zmień nick',
        [TEXT_CHANGE_WISOR]: 'Zmień wiedzora',
        [TEXT_CHOOSE_WISOR]: 'Wybierz swojego wiedzora',
        [TEXT_REQUIREMENT]: 'Wymaganie',
        [TEXT_CHOOSE_WHO_ANSWER]: 'Wybierz odpowiadającego',
        [TEXT_YOUR_TEAM]: 'Twoja drużyna',
        [TEXT_OPPONENT_TEAM]: 'Drużyna przeciwnika',
        [TEXT_DRAW_WHO_ANSWER]: 'Losowanie odpowiadającego',
        [TEXT_WAR]: 'Wojna',
        [TEXT_WAR_OVER]: 'Koniec wojny!',
        [TEXT_SAVE]: 'Zapisz',
        [TEXT_CLEAR]: 'Wyczyść',
        [TEXT_TEAM_ADD]: 'Dodaj do drużyny',
        [TEXT_TEAM_REMOVE]: 'Usuń z drużyny',
        [TEXT_SHOW_DETAILS]: 'Pokaż szczegóły',
        [TEXT_ALREADY_IN_TEAM]: 'Jest w drużynie',
        [TEXT_EDIT]: 'Edytuj',
        [TEXT_WISIES_TEAM]: 'Drużyna wiedzaków',
        [TEXT_SHOW]: 'Pokaż',
        [TEXT_HIDE]: 'Ukryj',
        [TEXT_SKILL]: 'Umiejętności',
        [TEXT_COST]: 'Koszt',
        [TEXT_EXPERIMENT_SUCCESS]: 'Eksperyment się udał',
        [TEXT_WISIE_DISCOVERED]: 'Odkryto wiedzaka',
        [TEXT_EXPERIMENT]: 'Eksperyment naukowy',
        [TEXT_READ_FINISHED]: 'Przeczytano książkę',
        [TEXT_TIME_LEFT]: 'Pozostało',
        [TEXT_BUY]: 'Kup',
        [TEXT_BOUGHT]: 'Kupiono',
        [TEXT_AVAILABLE_RESOURCES]: 'Dostępne zasoby',
        [TEXT_BOOKSHELF]: 'Dostępne książki',
        [TEXT_EMPTY_BOOKSHELF]: 'Brak dostępnych książek',
        [TEXT_READ]: 'Czytaj',
        [TEXT_STOP_READING]: 'Przestań czytać',
        [TEXT_DISCARD]: 'Wyrzuć',
        [TEXT_CLAIM_REWARD]: 'Odbierz nagrodę',
        [TEXT_YOU_SURRENDER]: 'Poddałeś się',
        [TEXT_DRAW]: 'Remis',
        [TEXT_OPPONENT_SURRENDER]: 'Przeciwnik się poddał',
        [TEXT_SURRENDER]: 'Poddaj się',
        [TEXT_OPPONENT_CHOOSING]: 'Przeciwnik wybiera kategorię i trudność',
        [TEXT_NOT_CHOSEN_TASK_PROPS]: 'Nie wybrano kategorii i trudności',
        [TEXT_OWNED_WISIES]: 'Twoje wiedzaki',
        [TEXT_NOT_OWNED_WISIES]: 'Wiedzaki do odkrycia',
        [TEXT_SEARCHING_OPPONENT]: 'Wyszukiwanie godnego przeciwnika',
        [TEXT_QUESTION_PREPARING]: 'Przygotowywanie',
        [TEXT_DRAW_CATEGORY]: 'Losowanie kategorii',
        [TEXT_DRAW_DIFFICULT]: 'Losowanie trudności',
        [TEXT_ANSWER]: 'Odpowiedz',
        [TEXT_ANSWERED]: 'Odpowiada',
        [TEXT_CORRECT]: 'Poprawnie',
        [TEXT_WRONG]: 'Błędnie',
        [TEXT_CONTINUE]: 'Kontynuuj',
        [TEXT_CATEGORY]: 'Kategoria',
        [TEXT_DIFFICULT]: 'Trudność',
        [TEXT_CHOOSE_CATEGORY]: 'Wybierz kategorię',
        [TEXT_CHOOSE_DIFFICULT]: 'Wybierz trudność',
        [TEXT_PLAY_AGAIN]: 'Zagraj ponownie',
        [TEXT_QUESTION]: 'Pytanie',
        [TEXT_REMEMBER_DETAILS]: 'Zapamiętaj szczegóły obiektów',
        [TEXT_CLICK_ON_ANY_TO_CONTINUE]: 'Kliknij na dowolny aby kontynuować',
        [TEXT_CORRECT_ANSWER]: 'Gratulacje! Poprawna odpowiedź',
        [TEXT_TIME]: 'Czas',
        [TEXT_WRONG_ANSWER]: 'Niestety, błędna odpowiedź...',
        [TEXT_IS_WRONG]: 'jest błędna',
        [TEXT_FRIENDS]: 'Znajomi',
        [TEXT_ADD_FRIEND]: 'Dodaj znajomego',
        [TEXT_ENTER_TAG_HERE]: 'wpisz tag tutaj',
        [TEXT_WRONG_TAG]: 'nieistniejący tag',
        [TEXT_REQUEST_SENT]: 'wysłano',
        [TEXT_ADD_FRIEND_ALREADY]: 'już wysłano prośbę o dodanie',
        [TEXT_CHALLENGE_ADD_FRIENDS]: 'Dodaj znajomych do wyzwania',
        [TEXT_ADD]: 'Dodaj',
        [TEXT_ADDED]: 'Dodano',
        [TEXT_START_CHALLENGE]: 'Rozpocznij wyzwanie!',
        [TEXT_SCORE]: 'Wynik',
        [TEXT_CHALLENGE_OVER]: 'Koniec wyzwania',
        [TEXT_YOUR_SCORE]: 'Twój wynik',
        [TEXT_POINTS]: 'pkt',
        [TEXT_ANSWER_FOR_QUESTION]: 'Odpowiedź dla pytania',
        [TEXT_NEXT_QUESTION]: 'Następne pytanie',
        [TEXT_SUMMARY]: 'Podsumowanie',
        [TEXT_SUGGEST_FRIENDS]: 'Zaproponuj znajomych',
        [TEXT_SUGGESTED_FRIENDS]: 'Proponowani znajomi',
        [TEXT_NONE_FRIENDS]: 'Nie masz znajomych',
        [TEXT_ACTUAL_FRIENDS]: 'Twoi znajomi',
        [TEXT_NONE_SUGGESTED_FRIENDS]: 'Nie możemy zaproponować więcej znajomych',
        [TEXT_NONE_IN_PROGRESS_CHALLENGES]: 'Nie masz aktywnych wyzwań',
        [TEXT_NONE_CLOSED_CHALLENGES]: 'Nie miałeś jeszcze wyzwań',
        [TEXT_IN_PROGRESS_CHALLENGES]: 'Aktywne wyzwania',
        [TEXT_CLOSED_CHALLENGES]: 'Niedawne wyzwania',
        [TEXT_INVITES]: 'Zaproszenia',
        [TEXT_POSITION]: 'Pozycja',
        [TEXT_WAITING_FOR_RESPONSE]: 'Oczekiwanie na odpowiedź',
        [TEXT_WAITING]: 'Oczekiwanie',
        [TEXT_BATTLE]: 'Bitwa',
        [TEXT_CHALLENGE]: 'Wyzwanie',
        [TEXT_DELETE]: 'Usuń',
        [TEXT_INVITED_TO_BATTLE_BY]: 'Zostałeś zaproszony do bitwy przez',
        [TEXT_INVITED_TO_WAR_BY]: 'Zostałeś zaproszony do wojny przez',
        [TEXT_INVITE_TO_BATTLE]: 'Zaprosiłeś do bitwy',
        [TEXT_INVITE_TO_WAR]: 'Zaprosiłeś do wojny',
        [TEXT_ACCEPT]: 'Akceptuj',
        [TEXT_REJECT]: 'Odrzuć',
        [TEXT_CANCEL]: 'Anuluj',
        [TEXT_FOR]: 'za',
        [TEXT_WAIT]: 'Poczekaj',
        [TEXT_OPPONENT_CORRECT_ANSWER]: 'Przeciwnik zaznaczył dobrą odpowiedź',
        [TEXT_OPPONENT_WRONG_ANSWER]: 'Przeciwnik zaznaczył złą odpowiedź',
        [TEXT_BATTLE_OVER]: 'Koniec bitwy!',
        [TEXT_THE_WINNER_IS]: 'Zwycięża',
        [TEXT_NEXT]: 'Następne',
        [TEXT_YOU]: 'Ty',
        [TEXT_NO_ANSWER]: 'Nie udzielono odpowiedzi',
        [TEXT_REWARD]: 'Nagroda',
        [TEXT_SEASON_REWARDS]: 'Nagrody za sezon',
        [TEXT_START]: 'Rozpocznij',
    },
    [ENGLISH]: {
        [TEXT_APP_NAME]: 'Wisiemania',
        [TEXT_NO_MAIL]: 'You have no message',
        [TEXT_MAIL]: 'Mail',
        [TEXT_TRY_AGAIN]: 'Try again',
        [TEXT_ONE]: 'One',
        [TEXT_MANY]: 'Many',
        [TEXT_POSSIBLE_APPROACHES]: 'Possible approaches',
        [TEXT_CHALLENGE_CLOSED]: 'Challenge closed',
        [TEXT_GLOBAL_CHALLENGE]: 'Global challenge',
        [TEXT_CREATED]: 'Created',
        [TEXT_ENTER_CREATOR_PROFILE_TAG_TO_JOIN]: <span>This challenge is secured.<br/>To join it, enter the creator tag.</span>,
        [TEXT_IN_PROGRESS]: 'In progress',
        [TEXT_PRIZE_POOL]: 'Prize pool',
        [TEXT_PLAY]: 'Play',
        [TEXT_FREE_ENTRY]: 'Free entry',
        [TEXT_CLOSE_DATE]: 'Close date',
        [TEXT_CREATION_DATE]: 'Creation date',
        [TEXT_PARTICIPANTS]: 'Participants',
        [TEXT_APPROACHES]: 'Approaches',
        [TEXT_JOIN]: 'Join',
        [TEXT_CREATOR]: 'Creator',
        [TEXT_PRIVATE_CHALLENGES]: 'Private challenges',
        [TEXT_NO_PRIVATE_CHALLENGES]: 'No private challenges',
        [TEXT_DURATION]: 'Duration',
        [TEXT_ACCESS]: 'Access',
        [TEXT_CHALLENGE_JOIN_COST]: 'Cost of join',
        [TEXT_CHALLENGE_JOIN_AND_NEXT_APPROACH_COST]: 'Cost of join and next approach',
        [TEXT_LOCK]: 'Locked',
        [TEXT_UNLOCK]: 'Unlocked',
        [TEXT_CREATE_CHALLENGE]: 'Create challenge',
        [TEXT_CREATE]: 'Create',
        [TEXT_NO_PLAYERS_YET]: 'Nobody has been classified yet',
        [TEXT_SEASON]: 'Season',
        [TEXT_CHANGE_TASK_ACCEPTED]: 'Request for changing the question accepted',
        [TEXT_WISDOM]: 'Wisdom',
        [TEXT_MENTALITY]: 'Mentality',
        [TEXT_GUARANTEED_REWARD]: 'Guaranteed reward',
        [TEXT_NO_REWARDS]: 'No rewards',
        [TEXT_CONNECTING]: 'Connecting',
        [TEXT_CLAIM_AND_EXIT]: 'Claim and exit',
        [TEXT_YOUR_REWARD]: 'Your reward',
        [TEXT_POSSIBLE_REWARD]: 'Possible reward',
        [TEXT_THIS_WINDOW]: 'This window',
        [TEXT_CHOOSE_WISIES]: 'Choose wisies',
        [TEXT_LOGOUT]: 'Sign out',
        [TEXT_RECONNECT]: 'Reconnect',
        [TEXT_LOGIN]: 'Sign in',
        [TEXT_CAMPAIGN]: 'Campaign',
        [TEXT_CAMPAIGN_OVER]: 'Campaign stage ended',
        [TEXT_EXIT]: 'Exit',
        [TEXT_CHOOSE_TEAM]: 'Choose team',
        [TEXT_CHOOSE_TYPE]: 'Choose type',
        [TEXT_CHOOSE_DESTINATION]: 'Choose destination',
        [TEXT_READ_NOW]: 'Read now',
        [TEXT_RANKING]: 'Ranking',
        [TEXT_FILTER]: 'filter',
        [TEXT_NAME_LENGTH]: `length 2-${NAME_MAX_LENGTH} chars`,
        [TEXT_CHANGE_NICK]: 'Change nick',
        [TEXT_CHANGE_WISOR]: 'Change wisor',
        [TEXT_CHOOSE_WISOR]: 'Choose your wisor',
        [TEXT_REQUIREMENT]: 'Requirement',
        [TEXT_CHOOSE_WHO_ANSWER]: 'Choose responder',
        [TEXT_DRAW_WHO_ANSWER]: 'Drawing of the responder',
        [TEXT_WAR]: 'War',
        [TEXT_WAR_OVER]: 'War is over',
        [TEXT_SAVE]: 'Save',
        [TEXT_CLEAR]: 'Clear',
        [TEXT_TEAM_ADD]: 'Add to team',
        [TEXT_TEAM_REMOVE]: 'Remove from team',
        [TEXT_SHOW_DETAILS]: 'Show details',
        [TEXT_ALREADY_IN_TEAM]: 'Already in team',
        [TEXT_EDIT]: 'Edit',
        [TEXT_WISIES_TEAM]: 'Wisies team',
        [TEXT_SHOW]: 'Show',
        [TEXT_HIDE]: 'Hide',
        [TEXT_SKILL]: 'Skill',
        [TEXT_COST]: 'Cost',
        [TEXT_EXPERIMENT_SUCCESS]: 'Experiment finished with success',
        [TEXT_WISIE_DISCOVERED]: 'Wisie discovered',
        [TEXT_EXPERIMENT]: 'Science experiment',
        [TEXT_READ_FINISHED]: 'The book has been read',
        [TEXT_TIME_LEFT]: 'Time left',
        [TEXT_BUY]: 'Buy',
        [TEXT_BOUGHT]: 'Bought',
        [TEXT_AVAILABLE_RESOURCES]: 'Available resources',
        [TEXT_BOOKSHELF]: 'Available books',
        [TEXT_EMPTY_BOOKSHELF]: 'There are no available books',
        [TEXT_READ]: 'Read',
        [TEXT_STOP_READING]: 'Stop reading',
        [TEXT_DISCARD]: 'Discard',
        [TEXT_CLAIM_REWARD]: 'Claim reward',
        [TEXT_YOU_SURRENDER]: 'You surrender',
        [TEXT_DRAW]: 'Draw',
        [TEXT_OPPONENT_SURRENDER]: 'Your opponent has surrender',
        [TEXT_SURRENDER]: 'Surrender',
        [TEXT_OPPONENT_CHOOSING]: 'The opponent chooses the category and difficulty',
        [TEXT_NOT_CHOSEN_TASK_PROPS]: 'Category and difficulty were not selected',
        [TEXT_OWNED_WISIES]: 'Owned wisies',
        [TEXT_NOT_OWNED_WISIES]: 'Wisies to discover',
        [TEXT_SEARCHING_OPPONENT]: 'Searching for worthy opponent',
        [TEXT_QUESTION_PREPARING]: 'Preparing',
        [TEXT_DRAW_CATEGORY]: 'Drawing category',
        [TEXT_DRAW_DIFFICULT]: 'Drawing difficult',
        [TEXT_ANSWER]: 'Answer',
        [TEXT_ANSWERED]: 'Answered',
        [TEXT_CORRECT]: 'Correct',
        [TEXT_WRONG]: 'Wrong',
        [TEXT_CONTINUE]: 'Continue',
        [TEXT_CATEGORY]: 'Category',
        [TEXT_DIFFICULT]: 'Difficult',
        [TEXT_CHOOSE_CATEGORY]: 'Choose category',
        [TEXT_CHOOSE_DIFFICULT]: 'Choose difficult',
        [TEXT_PLAY_AGAIN]: 'Play again',
        [TEXT_QUESTION]: "Question",
        [TEXT_REMEMBER_DETAILS]: 'Remember the details of the objects',
        [TEXT_CLICK_ON_ANY_TO_CONTINUE]: 'Click on any to continue',
        [TEXT_CORRECT_ANSWER]: 'Congratulations! Correct answer',
        [TEXT_TIME]: 'Time',
        [TEXT_WRONG_ANSWER]: 'Unfortunately, the wrong answer ...',
        [TEXT_IS_WRONG]: 'is wrong',
        [TEXT_FRIENDS]: 'Friends',
        [TEXT_ADD_FRIEND]: 'Add friend',
        [TEXT_ENTER_TAG_HERE]: 'enter tag here',
        [TEXT_WRONG_TAG]: 'not existing tag',
        [TEXT_REQUEST_SENT]: 'sent',
        [TEXT_ADD_FRIEND_ALREADY]: 'already requested',
        [TEXT_CHALLENGE_ADD_FRIENDS]: 'Add friends to challenge',
        [TEXT_ADD]: 'Add',
        [TEXT_ADDED]: 'Added',
        [TEXT_START_CHALLENGE]: 'Start challenge!',
        [TEXT_SCORE]: 'Score',
        [TEXT_CHALLENGE_OVER]: 'Challenge is over',
        [TEXT_YOUR_SCORE]: 'Your score',
        [TEXT_POINTS]: 'pt',
        [TEXT_ANSWER_FOR_QUESTION]: 'Answer for question',
        [TEXT_NEXT_QUESTION]: 'Next question',
        [TEXT_SUMMARY]: 'Summary view',
        [TEXT_SUGGEST_FRIENDS]: 'Suggest friends',
        [TEXT_SUGGESTED_FRIENDS]: 'Suggested friends',
        [TEXT_NONE_FRIENDS]: 'You do not have friends',
        [TEXT_ACTUAL_FRIENDS]: 'Actual friends',
        [TEXT_NONE_SUGGESTED_FRIENDS]: 'We can not recommend more friends',
        [TEXT_NONE_IN_PROGRESS_CHALLENGES]: 'You do not have active challenges',
        [TEXT_NONE_CLOSED_CHALLENGES]: 'You do not have any challenges yet',
        [TEXT_IN_PROGRESS_CHALLENGES]: 'Active challenges',
        [TEXT_CLOSED_CHALLENGES]: 'Recent challenges',
        [TEXT_INVITES]: 'Invites',
        [TEXT_POSITION]: 'Position',
        [TEXT_WAITING_FOR_RESPONSE]: 'Waiting for response',
        [TEXT_WAITING]: 'Waiting',
        [TEXT_BATTLE]: 'Battle',
        [TEXT_CHALLENGE]: 'Challenge',
        [TEXT_DELETE]: 'Delete',
        [TEXT_INVITED_TO_BATTLE_BY]: 'You have been invited to battle with',
        [TEXT_INVITED_TO_WAR_BY]: 'You have been invited to war with',
        [TEXT_INVITE_TO_BATTLE]: 'You invited to battle',
        [TEXT_INVITE_TO_WAR]: 'You invited to war',
        [TEXT_ACCEPT]: 'Accept',
        [TEXT_REJECT]: 'Reject',
        [TEXT_CANCEL]: 'Cancel',
        [TEXT_FOR]: 'for',
        [TEXT_WAIT]: 'Wait',
        [TEXT_OPPONENT_CORRECT_ANSWER]: 'The opponent marked a correct answer',
        [TEXT_OPPONENT_WRONG_ANSWER]: 'The opponent marked a wrong answer',
        [TEXT_BATTLE_OVER]: 'Battle is over',
        [TEXT_THE_WINNER_IS]: 'The winner is',
        [TEXT_NEXT]: 'Next',
        [TEXT_YOU]: 'You',
        [TEXT_NO_ANSWER]: 'No answer',
        [TEXT_REWARD]: 'Reward',
        [TEXT_SEASON_REWARDS]: 'Season rewards',
        [TEXT_START]: 'Start',
    },
};

export function getText(id, lang) {
    return TEXTS[lang || getActiveLang()][id];
}

export function getName(e, lang) {
    const activeLang = lang || getActiveLang();
    if (activeLang === POLISH) {
        return e.namePolish;
    }
    if (activeLang === ENGLISH) {
        return e.nameEnglish;
    }
    return null;
}

export function getTextContent(obj) {
    const activeLang = getActiveLang();
    if (activeLang === POLISH) {
        return obj.textContentPolish;
    }
    if (activeLang === ENGLISH) {
        return obj.textContentEnglish;
    }
    throw new Error('UNKNOWN LANGUAGE');
}