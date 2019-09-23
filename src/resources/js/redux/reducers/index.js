import { combineReducers } from 'redux';
import notepads from './notepads';
import pages from './pages';
import blocks from './blocks';

export default combineReducers({
    notepads,
    pages,
    blocks
});
