import type { App, FunctionDirective, ObjectDirective } from 'vue'
import { auth } from './auth'

const directivesMap: Record<string, FunctionDirective | ObjectDirective> = {
  auth
}

const installDirectives = (app: App) => {
  Object.keys(directivesMap).forEach((name) => {
    app.directive(name, directivesMap[name])
  })
}

export { installDirectives }
