import { Model } from '@vuex-orm/core'

export default class Exchange extends Model {
  static entity = 'exchanges'

  static fields() {
    return {
      id: this.string(''),
      exchangeId: this.string(''),
      name: this.string(''),
      socket: this.boolean(false),
    }
  }
}
