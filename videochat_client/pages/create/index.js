import Create from '../../public/asserts/images/create.svg'
import Header from '../../components/HeaderComponent/Header'
import formStyles from '../../styles/formStyles.module.scss'
import Input from '../../components/FormComponents/Input';

import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { createRoom } from '../../actions/api'
import { setUserName } from '../../actions/actions'

const CreateForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const room = useSelector((state) => state.roomId);
    const router = useRouter();

    const handleChange = (e) =>{
        setName(e.currentTarget.value);
    }

    const handleClick = () =>{
        dispatch(setUserName(name));
        dispatch(createRoom(name))
    }

    useEffect(() =>{
        if(room)
            router.push(`/room/${room}`);
    }, [room])

    return(
        <div >
            <Header/>
            <div className="container overflow-hidden">
                <div className="row justify-content-center">
                    <div className={`col-6 mt-5 default-color ${formStyles.form_container}`}>
                        <Create style={{marginLeft: 'calc(50% - 100px)'}} width={200} height={160}/>
                        <Input style={{margin: '20px auto'}} defaultColor placeholder="Name" onChange={handleChange}/>
                        <button style={{margin: '20px auto'}} onClick={handleClick} className={formStyles.form_button}>Create New Room </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForm;