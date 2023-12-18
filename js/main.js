import { createLoader, onDataSuccessRecieve, onDataFailedRecieve } from './api.js';

createLoader(onDataSuccessRecieve, onDataFailedRecieve);
