import { createTrickling } from 'trickling'
import 'trickling/lib/style.css'

const tricklingProgress = createTrickling({
  showSpinner: false
})

export { tricklingProgress }
