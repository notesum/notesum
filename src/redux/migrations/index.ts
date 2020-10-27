import { createMigrate } from 'redux-persist';

import LastOpenedMigration from './20201026-LastOpened';

export default createMigrate({
    0: LastOpenedMigration
}, { debug: true });