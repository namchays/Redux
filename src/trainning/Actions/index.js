import * as type from  '../constants/actionType'
export const status = () =>{
    return {
        type : type.TOGGLE_STATUS
    }
}
export const sort = (sort) =>{
    return {
        type : type.SORT,
        sort //sort : sort
    }
}