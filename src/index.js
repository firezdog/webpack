import {ComponentService} from './app/component.service'
import {AlertService} from './app/alert.service'
import {main} from './app/app';
import style from './main.css';

const component = new ComponentService();
const alert = new AlertService();

main(component, alert);