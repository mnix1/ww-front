import './indexApp';
import Auto from './auto/Auto';
import {prepareAuto} from './auto/autoHelper';
window.prepareAuto = prepareAuto;
window.auto = Auto;

