import { Model } from '@vuex-orm/core'

export default class Exchange extends Model {
  static entity = 'exchanges'

  static fields() {
    return {
      id: this.string(''),

      // предполагаю что по этому значению нужно коннектиться к сокету
      exchangeId: this.string(''),
      name: this.string(''),
      socket: this.string(''),
    }
  }
}
