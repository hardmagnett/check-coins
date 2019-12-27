import { Model } from '@vuex-orm/core'

/**
 * Фактически asset - это и есть конкретная криптовалюта.
 * Название asset-для того чтобы название было как в api
 */
export default class Asset extends Model {
  static entity = 'assets'

  //The argument is the default value
  static fields () {
    return {
      // например `bitcoin`
      id: this.string(''),
      // по этому параметру упорядочиваются валюты на coincap
      rank: this.number(0),
      // код,например BTC или USD
      symbol: this.string(''),
      // Читабельное название
      name: this.string(''),

      priceUsd: this.number(0),
      marketCapUsd: this.number(0),
      vwap24Hr: this.number(0),
    }
  }
  // todo: такой-же расчет должен быть для vwap24Hr
  get priceUsdHumanReadable () {
    let result = this.priceUsd > 1
      ? this.priceUsd.toLocaleString('en-GB',{maximumFractionDigits: 2})
      : this.priceUsd.toLocaleString('en-GB',{maximumFractionDigits: 8})
    result = `$ ${result}`
    return result
  }
  get marketCapUsdHumanReadable () {
    let suffix = ''
    let result = this.marketCapUsd
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
    let maximumFractionDigits = this.marketCapUsd > 1 ? 2 : 8
    result = result.toLocaleString('en-GB',{maximumFractionDigits})
    result = `$ ${result}${suffix}`

    return result
  }
}
