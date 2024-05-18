import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

export const dancesTableName: string = 'dances';
export const movesTableName: string = 'moves';

export const dbConfig: DBConfig = {
  name: 'FavsDb',
  version: 1,
  objectStoresMeta: [
    {
    store: dancesTableName,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'type', keypath: 'type', options: { unique: false } },
      { name: 'epoch', keypath: 'epoch', options: { unique: false } },
      { name: 'level', keypath: 'level', options: { unique: false } },
      { name: 'globalId', keypath: 'globalId', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  },
  {
    store: movesTableName,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'globalId', keypath: 'globalId', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }
]
};
