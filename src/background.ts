import {menubar} from '@/MenuBar'

const mb =  menubar({showDockIcon:false,showOnAllWorkspaces:true});

mb.on('ready', () => {
  console.log('app is ready');
});
