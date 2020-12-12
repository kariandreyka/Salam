import store from "../store"

const initialState = {
    roomId: null,
    user: { 
        name: '', 
        id: null, 
        permission: {
            audio: false,
            video: false
        }
    },
    otherUser:{
        name: '', 
        id: null, 
        permission: {
            audio: false,
            video: false
        }
    }
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'INIT_USER': {
            return {
                ...state,
                user: action.payload
            }
        };
        case 'SET_USER_NAME':{
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload
                }   
            }
        }
        case 'CONNECT_SUCCESS':{
            return{
                ...state,
                user:{
                    ...state.user,
                    id: action.result
                }
            }
        }
        case 'SET_ROOM_ID': {
            return {
                ...state,
                roomId: action.result
            }
        }
        case 'SET_OTHER_USER' : {
            return {
                ...state,
                otherUser : action.payload
            }
        }
        default: 
            return state;
    }
}