import { combineReducers } from 'redux';
import notepads from './notepads';
import pages from './pages';

export default combineReducers({
    notepads,
    pages
});
