import { menubar } from '@/MenuBar'
import "./_express/main"

const mb = menubar({ showDockIcon: false, showOnAllWorkspaces: true });

mb.on('ready', () => {
  console.log('app is ready');
});
