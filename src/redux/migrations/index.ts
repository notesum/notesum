import { createMigrate } from 'redux-persist';

import LastOpenedMigration from './20201026-LastOpened';
import RemoveOldReducers from './20201031-RemoveOldReducers';

export default createMigrate({
    0: LastOpenedMigration,
    1: RemoveOldReducers
});