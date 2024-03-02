import { ok } from 'devlop'
import { nameToEmoji } from 'gemoji'
import { codes } from 'micromark-util-symbol'
function gemojiHtml() {
  return {
    enter: {
      gemoji() {
        return void this.tag('<span>')
      }
    },
    exit: {
      gemoji(token) {
        const val = this.sliceSerialize(token)
        ok(val.codePointAt(0) === codes.colon, 'expected `:` start')
        ok(val.codePointAt(val.length - 1) === codes.colon, 'expected `:` end')
        this.raw(nameToEmoji[val.slice(1, -1)] ?? val)
        return void this.tag('</span>')
      }
    }
  }
}
var html_default = gemojiHtml
export {
  html_default as default
}
