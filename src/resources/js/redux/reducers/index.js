import { combineReducers } from 'redux';
import notepads from './notepads';
import pages from './pages';
import lines from './lines';
import extensions from './extensions';

export default combineReducers({
    notepads,
    pages,
    lines,
    extensions
});
