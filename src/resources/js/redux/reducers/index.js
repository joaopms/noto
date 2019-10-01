import { combineReducers } from 'redux';
import noto from './noto';
import notepads from './notepads';
import pages from './pages';
import lines from './lines';
import blocks from './blocks';

export default combineReducers({
    noto,
    notepads,
    pages,
    lines,
    blocks,
});
