import Join from '../../public/asserts/images/join.svg'
import Header from '../../components/HeaderComponent/Header'
import formStyles from '../../styles/formStyles.module.scss'
import Input from '../../components/FormComponents/Input'

const JoinForm = ({}) => {
    return(
        <div >
            <Header/>
            <div className="purp overflow-hidden">
                <div className="row justify-content-center">
                    <div className={`col-6 mt-5 default-color ${formStyles.form_container}`}>
                        <Join style={{marginLeft: 'calc(50% - 100px)'}} width={200} height={160}/>
                        <Input style={{margin: '20px auto', color: '#fff'}} placeholder="Room id"/>
                        <Input style={{margin: '20px auto', color: '#fff'}} placeholder="Name"/>
                        <button style={{margin: '20px auto'}} className={formStyles.form_button}>Join existing room </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinForm;