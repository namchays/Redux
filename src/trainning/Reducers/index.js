import sort from './sort'
import status from './status'
import {combineReducers} from 'redux'

const myReducer = combineReducers({
    status : status,
    sort : sort
})

export default myReducer