import Header from '../../components/HeaderComponent/Header';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { joinRoom, updateUserList } from '../../actions/api'
//import { connect }

const Room = () => {
    const roomId = useSelector(store => store.roomId);
    const user = useSelector(store => store.user);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(updateUserList());
        if(!roomId){
            const url = window.location.pathname.split('/');
            dispatch(joinRoom(url[url.length - 1], user.name));
        }
    }, [user])
    return(
        <div>
            <Header/>
        </div>
    )
}

export default Room;