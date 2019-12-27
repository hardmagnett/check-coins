import VuexORM from '@vuex-orm/core'

import Asset from '@/orm/Asset'
import assets from '@/orm/assets'

const database = new VuexORM.Database()
database.register(Asset, assets)

export default database
