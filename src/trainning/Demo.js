import {createStore} from 'redux'
import {status, sort} from './Actions/index'
import myReducer from './Reducers/index'

const store = createStore(myReducer);
store.dispatch(status());
store.dispatch(sort({
    by : 'name',
    value : -1
}));
console.log(store.getState());  