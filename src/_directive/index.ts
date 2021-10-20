import { App } from 'vue'
import ToolTip from './ToolTip'

const install = function (app: App<Element>): void {
  app.directive('tooltip', ToolTip)
}

export default install;