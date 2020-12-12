export function socketMiddleware(socket){
    return ({dispatch, getState}) => next => action =>{
        if(typeof action === 'function'){
            return action(dispatch, getState);
        }

        const {promise, type, types, ...rest} = action;

        if(type != 'socket' || !promise){
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({...rest, type: REQUEST});

        return promise(socket)
        .then((result) => {
            if(SUCCESS === 'CONNECT_SUCCESS')
                result = socket.getId();
            return next({ ...rest, result, type: SUCCESS });
        })
        .catch((error) =>{
            return next({ ...rest, error, type: FAILURE });
        });
    }
}

export const loggerMiddleware = ({dispatch, getState}) => next => action =>{
    console.log('dispatching', action);
    let result = next(action);
    console.log('new state', getState())
    return result;
}