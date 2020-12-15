const initialState = {
    remoteDescription:{
        data: null,
        socketId: null
    }
}

export default function sessionReducer(state = initialState, action){
    if(action.type === 'SET_ANSWER'){       
        return{
            remoteDescription:{
                ...action.payload
            }
        }
    }else{
        return state;
    }
}