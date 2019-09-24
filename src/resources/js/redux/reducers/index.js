import { combineReducers } from 'redux';
import notepads from './notepads';
import pages from './pages';
import lines from './lines';
import blocks from './blocks';

export default combineReducers({
    notepads,
    pages,
    lines,
    blocks
});
