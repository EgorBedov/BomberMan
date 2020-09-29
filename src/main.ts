import './main.scss';
import Designer from 'Core/designer';

const base = document.querySelector('#application');

base.innerHTML = '<h1>HElllo!</h1>';

const d = new Designer(null, null, null, null, null);
d._initCanvas(null, null, null, null, null);
