import Join from '../../public/asserts/images/join.svg'
import Header from '../../components/HeaderComponent/Header'
import formStyles from '../../styles/formStyles.module.scss'
import Input from '../../components/FormComponents/Input'
import { useState, useEffect } from 'react'

import { setUserName } from '../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { joinRoom } from '../../actions/api'
import { useRouter } from 'next/router'

const JoinForm = () => {
    const [name, setName] = useState('');
    const [roomInput, setRoomInput] = useState('');
    const room = useSelector(state => state.roomId);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick = () =>{
        dispatch(setUserName(name));
        dispatch(joinRoom(roomInput, name))
    }
    
    useEffect(() =>{
        if(room)
            router.push(`/room/${room}`);
    }, [room])

    return(
        <div >
            <Header/>
            <div className="purp overflow-hidden">
                <div className="row justify-content-center">
                    <div className={`col-6 mt-5 default-color ${formStyles.form_container}`}>
                        <Join style={{marginLeft: 'calc(50% - 100px)'}} width={200} height={160}/>
                        <Input 
                            style={{margin: '20px auto', color: '#fff'}} 
                            placeholder="Room id"
                            onChange={(e) => setRoomInput(e.currentTarget.value)}
                        />
                        <Input 
                            style={{margin: '20px auto', color: '#fff'}} 
                            placeholder="Name"
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                        <button 
                            style={{margin: '20px auto'}} 
                            className={formStyles.form_button}
                            onClick={handleClick}
                        >
                            Join existing room 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinForm;