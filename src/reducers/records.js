import { combineReducers } from 'redux';
import { records } from '../constants/records';

//pulling records from '/constant' folder
const recordStoreReducer = (state = records, action) => {
    return state;
};

const selectRecordReducer = (state = '', action) => {
    switch (action.type) {
        case 'SELECT_RECORD':
            state = action.record;
            return state;
        case 'DESELECT_RECORD':
            state = '';
            return state;
        default:
            return state;
    }
}

const recordReducer = combineReducers({
    recordStore: recordStoreReducer,
    selectedRecord: selectRecordReducer
});

export default recordReducer;