/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import Messages from './modules/message/message';
import InputForm from './modules/input_form/input_form';
import Gps from './modules/gps/gps';
import PopUp from './modules/pop_up/pop_up';
import Timer from './modules/timer/timer';

const messagesEl = document.querySelector('.messages');
const inputFormEl = document.querySelector('.inputForm');

const timer = new Timer();
const popUp = new PopUp();
const gps = new Gps(popUp);
const message = new Messages(messagesEl, popUp, gps);
const inputForm = new InputForm(inputFormEl, message, gps, popUp, timer);
export { inputForm, message };
