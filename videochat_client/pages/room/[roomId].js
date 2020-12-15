import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinRoom, updateUserList } from '../../actions/api';
import dynamic from 'next/dynamic';

const VideoChat = dynamic(() => import('../../components/VideoChatComponent/VideoChat'), { ssr: false })

const Room = () => {

    const roomId = useSelector(store => store.users.roomId);
    const user = useSelector(store => store.users.user);
    const dispatch = useDispatch();

    useEffect(() =>{
        if(!roomId){
            const url = window.location.pathname.split('/');
            dispatch(joinRoom(url[url.length - 1], user.name));  
        }  
    }, [user]);

    return(
        <VideoChat/>
    )
}

export default Room;