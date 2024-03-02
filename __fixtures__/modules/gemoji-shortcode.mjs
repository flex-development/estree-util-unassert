import { ok as assert } from 'devlop'
import { asciiAlphanumeric } from 'micromark-util-character'
import { codes } from 'micromark-util-symbol'
function previous(code) {
  return code !== codes.backslash && code !== codes.colon
}
var shortcode_default = {
  name: 'gemoji',
  previous,
  tokenize(effects, ok, nok) {
    function inside(code) {
      switch (true) {
        case code === codes.colon:
          effects.consume(code)
          effects.exit('gemoji')
          return ok
        case asciiAlphanumeric(code):
        case code === codes.dash:
        case code === codes.plusSign:
        case code === codes.underscore:
          effects.consume(code)
          return inside
        default:
          return nok(code)
      }
    }
    function begin(code) {
      switch (code) {
        case codes.eof:
        case codes.colon:
          return nok(code)
        default:
          effects.consume(code)
          return inside
      }
    }
    const start = code => {
      assert(code === codes.colon, 'expected `:`')
      assert(previous.call(this, this.previous), 'expected correct previous')
      effects.enter('gemoji')
      effects.consume(code)
      return begin
    }
    return start
  }
}
export {
  shortcode_default as default
}
