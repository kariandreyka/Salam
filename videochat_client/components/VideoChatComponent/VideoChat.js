import Header from '../HeaderComponent/Header';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUp from '../PopupComponent/PopUp';
import { makeAnswer, makeOffer, leave } from '../../actions/api'
import styles from './chat.module.scss';
import MicMute from '../../public/asserts/images/mic-m.svg';
import Mic from '../../public/asserts/images/mic.svg';
import Call from '../../public/asserts/images/call.svg';
import Video from '../../public/asserts/images/video.svg';
import { useRouter } from 'next/router';

let peerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.msRTCPeerConnection;

let sessionDescription = window.RTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.msRTCSessionDescription;

const pc = new peerConnection({urls: 'stun:stun.l.google.com:19302'});

let localStream, remoteStream;

const VideoChat = () => {
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const {roomId, user, otherUser} = useSelector(store => store.users);
    const {data, socketId} = useSelector(store => store.session.remoteDescription);
    const dispatch = useDispatch();
    const [popUp, togglePopUp] = useState(false);
    const [mic, toggleMic] = useState(true);
    const [video, toggleVideo] = useState(true);
    const micRef = useRef(null);
    const videoRef = useRef(null);
    const router = useRouter();

    useEffect(() =>{
        navigator.getUserMedia  = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

        navigator.getUserMedia({video: true, audio: true}, (stream) =>{
            localVideo.current.srcObject = stream;
            console.log(stream);
            localStream = stream;
            stream.getAudioTracks()[0].enabled = mic;
            stream.getVideoTracks()[0].enabled = video;
            pc.addStream(stream);
        }, err =>{
            console.error(err.message);
        });
            
            
        console.log(typeof otherUser, popUp);
        if(otherUser && otherUser.id){
            togglePopUp(true);
        }
        if (pc.addTrack !== undefined) {
            pc.ontrack = e => {
                e.streams.forEach(stream => { remoteVideo.current.srcObject = remoteStream = stream });
                //localVideo.current.classList.add(styles.collapse)
            }
        } else {
            pc.onaddstream = e => {
                remoteVideo.srcObject = e.stream;
            }
        }

        pc.onicecandidate = e =>{
            console.log(e.candidate);
            if(e.candidate){
                dispatch(makeOffer({offer: e.candidate, roomId}));
            }
        }
    }, []);

    useEffect(() =>{
        if(data && data.type === 'offer'){

            pc.setRemoteDescription(new RTCSessionDescription(data));
            pc.createAnswer()
            .then(setDesctiption)
            .then(() => dispatch(makeAnswer({answer: pc.localDescription, socketId})));
        }else{
            if(data && data.type === 'answer'){
                pc.setRemoteDescription(new RTCSessionDescription(data));
            }
        }
        if(data && data.candidate){
            console.log('ICE');
            pc.addIceCandidate(new RTCIceCandidate(data), () =>{
                console.log('success');
            }, err =>{
                console.log(err);
            })
        }

    }, [data])

    const setDesctiption = (offer) =>{
        //console.log(offer);
        return pc.setLocalDescription(offer);
    }

    const createOffer = () =>{
        pc.createOffer()
        .then(setDesctiption)
        .then(() => dispatch(makeOffer({offer: pc.localDescription, roomId})));
    }

    const handleMic = () =>{
        localStream.getAudioTracks()[0].enabled = !mic;
        toggleMic(!mic);
    }

    const handleVideo = () =>{
        localStream.getVideoTracks()[0].enabled = !video;
        toggleVideo(!video);
    }

    const handleLeave = () =>{
        localStream.getTracks().forEach(track => track.stop());
        delete localStream.getTracks();
        dispatch(leave(roomId));
        router.push('/');
    }

    return(
        <div style={{position: 'relative', height: '100vh'}}>
            <Header/>
            <div className={styles.chat_container}>
                <div className={`${styles.local_video} ${styles.collapse}`}>
                    <span>{user?.name}</span>
                    <video  ref={localVideo} autoPlay muted></video>
                </div>
                <div className={styles.remote_video}>
                    <span>{otherUser?.name}</span>
                    <video ref={remoteVideo} autoPlay></video>
                </div>
                <div className={styles.buttons}>
                    <a onClick={handleMic} className={mic? null: styles.disabled} ref={micRef}>{mic? <Mic/>: <MicMute/>}</a>
                    <a onClick={handleLeave} className={styles.red}><Call/></a>
                    <a onClick={handleVideo} className={video? null: styles.disabled} ref={videoRef}><Video/></a>
                </div>
            </div>
            {popUp ? 
                <PopUp message={'Confirm if you are ready to join the conference'} onClick={createOffer} toggle={() => togglePopUp(!popUp)}/>
                : null
            }
        </div>
    )
}

export default VideoChat;