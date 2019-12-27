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

      priceUSD: this.number(0),
      marketCapUSD: this.number(0),
      vwap24Hr: this.number(0),
    }
  }
}
