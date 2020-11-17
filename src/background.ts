import {menubar} from './MenuBar/index'

const mb =  menubar({showDockIcon:false,showOnAllWorkspaces:true});

mb.on('ready', () => {
  console.log('app is ready');
});
