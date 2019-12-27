export default {
  /**
   * 128969391747.1576 => '128.97b'
   * @param number
   * @returns {string}
   */
  withSuffix(number){
    let suffix = ''
    let result = number
    const billion = 1000000000
    const million = 1000000
    const thousand = 1000
    if (result >= billion) {
      result = result / billion
      suffix = 'b'
    } else if (result >= million) {
      result = result / million
      suffix = 'm'
    } else if (result >= thousand) {
      result = result / thousand
      suffix = 'k'
    }

    let maximumFractionDigits = this.getFractionByNumber(number)
    result = this.withPunctuation(result, maximumFractionDigits)
    result = `${result}${suffix}`

    return result
  },
  /**
   * '128.98b' => '$ 128.98b'
   * @param string
   * @returns {string}
   */
  withCurrencySign(string){
    return `$ ${string}`
  },

  /**
   * Если число больше 1, то 2 знака после запятой
   * Если число меньше 1, то 8 знаков после запятой
   * @param number
   * @returns {number}
   */
  getFractionByNumber(number){
    return number > 1 ? 2 : 8
  },
  /**
   * 7223.454343291271 => 7,223.45
   * @param number
   * @param fractionQty
   * @returns {string}
   */
  withPunctuation(number, fractionQty){
    let result = number.toLocaleString(
      'en-GB',
      {maximumFractionDigits: fractionQty}
    )
    return result
  }
}
