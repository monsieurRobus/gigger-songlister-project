const REGISTER_USER = "REGISTER_USER"
const LOGIN_USER = "LOGIN_USER"
const UPDATE_USER = "UPDATE_USER"
const GET_USER = "GET_USER"
const GET_ALL_USERS = "GET_ALL_USERS"
const DELETE_USER = "DELETE_USER"
const VALIDATE_USER = "VALIDATE_USER"


const loginUser = (credentials) => {
    return {
        type: LOGIN_USER,
        payload: {
            credentials
        }
    }
}

export const userReducer = (state=[], action) => {

    switch(action.type){

        case LOGIN_USER:
            return 

        default: 
            return state
    }
} 