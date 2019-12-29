import { Model } from '@vuex-orm/core'
import numberFormatters from '@/helpers/number/formatters'


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
      volumeUsd24Hr: this.number(0),
    }
  }

  get priceUsdHumanReadable () {
    let maximumFractionDigits = numberFormatters.getFractionByNumber(this.priceUsd)
    let result = numberFormatters.withPunctuation(this.priceUsd, maximumFractionDigits)
    result = numberFormatters.withCurrencySign(result)
    return result
  }
  get volumeUsd24HrHumanReadable () {
    if (this.volumeUsd24Hr === 0 ) return '-'
    let result = numberFormatters.withSuffix(this.volumeUsd24Hr)
    result = numberFormatters.withCurrencySign(result)
    return result
  }

  get marketCapUsdHumanReadable () {
    if (this.marketCapUsd === 0 ) return '-'
    let result = numberFormatters.withSuffix(this.marketCapUsd)
    result = numberFormatters.withCurrencySign(result)
    return result
  }
}
