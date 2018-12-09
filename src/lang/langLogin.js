import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";

export const TEXT_LOG_IN_WITH = 'TEXT_LOG_IN_WITH';
export const TEXT_CREATE_ACCOUNT = 'TEXT_CREATE_ACCOUNT';
export const TEXT_SIGN_IN = 'TEXT_SIGN_IN';
export const TEXT_PASSWORD = 'TEXT_PASSWORD';
export const TEXT_NEW_PASSWORD_EMAIL_SENT = 'TEXT_NEW_PASSWORD_EMAIL_SENT';
export const ERROR_WRONG_CREDENTIALS = 'ERROR_WRONG_CREDENTIALS';
export const ERROR_NOT_VALID_USERNAME = 'ERROR_NOT_VALID_USERNAME';
export const ERROR_NOT_VALID_EMAIL = 'ERROR_NOT_VALID_EMAIL';
export const ERROR_EMAIL_ALREADY_EXISTS = 'ERROR_EMAIL_ALREADY_EXISTS';
export const ERROR_USERNAME_ALREADY_EXISTS = 'ERROR_USERNAME_ALREADY_EXISTS';
export const ERROR_CANT_SEND_EMAIL = 'ERROR_CANT_SEND_EMAIL';

const TEXTS = {
    [POLISH]: {
        [TEXT_NEW_PASSWORD_EMAIL_SENT]: 'Wysłaliśmy do Ciebie wiadomość e-mail z nowym hasłem',
        [TEXT_LOG_IN_WITH]: 'Zaloguj z',
        [TEXT_CREATE_ACCOUNT]: 'Utwórz konto',
        [TEXT_PASSWORD]: 'hasło',
        [TEXT_SIGN_IN]: 'Zaloguj się',
        [ERROR_WRONG_CREDENTIALS]: 'Nieprawidłowe dane do logowania',
        [ERROR_NOT_VALID_USERNAME]: 'Nieprawidłowy użytkownik',
        [ERROR_NOT_VALID_EMAIL]: 'Nieprawidłowy adres e-mail',
        [ERROR_EMAIL_ALREADY_EXISTS]: 'Podany adres e-mail jest już w użyciu',
        [ERROR_USERNAME_ALREADY_EXISTS]: 'Ktoś już używa takiej nazwy użytkownika',
        [ERROR_CANT_SEND_EMAIL]: 'Przepraszamy, problemy techniczne. Spróbuj później',
    },
    [ENGLISH]: {
        [TEXT_NEW_PASSWORD_EMAIL_SENT]: 'We have sent you an e-mail with a new password',
        [TEXT_LOG_IN_WITH]: 'Log in with',
        [TEXT_CREATE_ACCOUNT]: 'Create account',
        [TEXT_PASSWORD]: 'password',
        [TEXT_SIGN_IN]: 'Sign in',
        [ERROR_WRONG_CREDENTIALS]: 'Incorrect credentials',
        [ERROR_NOT_VALID_USERNAME]: 'Incorrect username',
        [ERROR_NOT_VALID_EMAIL]: 'Incorrect e-mail address',
        [ERROR_EMAIL_ALREADY_EXISTS]: 'The email address provided is already in use',
        [ERROR_USERNAME_ALREADY_EXISTS]: 'Someone already uses this username',
        [ERROR_CANT_SEND_EMAIL]: 'We apologize for technical problems. Try later',
    },
};

export function getLoginText(id, lang) {
    return TEXTS[lang || getActiveLang()][id];
}