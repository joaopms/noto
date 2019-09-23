import { combineReducers } from 'redux';
import notepads from './notepads';
import pages from './pages';
import blocks from './blocks';
import extensions from './extensions';

export default combineReducers({
    notepads,
    pages,
    blocks,
    extensions
});
