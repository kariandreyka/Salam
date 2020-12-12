import socketAPI from "../features/SocketClient"

export const setUser = (name, id, permission) =>{

    return {
        type: 'INIT_USER',
        payload: {
            name,
            id,
            permission
        }
    }
}

export const setRoomID = (roomId) =>{
    return {
        type: 'SET_ROOM_ID',
        payload: roomId
    }
}

export const setUserName = (name) =>{
    return{
        type: 'SET_USER_NAME',
        payload: name
    }
}

export const setOtherUser = (name, id) =>{
    return {
        type: 'SET_OTHER_USER',
        payload: {
            name,
            id
        }
    }
}

export const removeOtherUser = () =>{
    return{
        type: 'REMOVE_OTHER_USER',
        payload: {
            name: '',
            id: null
        }
    }
}