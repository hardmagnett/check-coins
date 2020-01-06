import VuexORM from '@vuex-orm/core';

import Asset from '@/orm/Asset';
import assets from '@/orm/assets';

import Exchange from '@/orm/Exchange';
import exchanges from '@/orm/exchanges';

const database = new VuexORM.Database();
database.register(Asset, assets);
database.register(Exchange, exchanges);

export default database;
