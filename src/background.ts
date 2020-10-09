import {menubar} from './MenuBar/index'

const mb =  menubar();

mb.on('ready', () => {
  console.log('app is ready');
});