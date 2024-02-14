import { GET_ALL_USERS, DELETE_USER } from "../actions/action-types";

const initicalState = {
    users:[]
}

export function usersReducer(state = initicalState,action){
    switch (action.type) {
        case GET_ALL_USERS:
            return{...state,users: action.payload};
        case DELETE_USER:
            return{...state,users: state.users.filter(u=>u.id!==action.payload)};
        
        default:
            return state; 
    }
}