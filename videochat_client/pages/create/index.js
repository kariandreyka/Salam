import Create from '../../public/asserts/images/create.svg'
import Header from '../../components/HeaderComponent/Header'
import formStyles from '../../styles/formStyles.module.scss'
import Input from '../../components/FormComponents/Input'

const CreateForm = () => {
    return(
        <div >
            <Header/>
            <div className="container overflow-hidden">
                <div className="row justify-content-center">
                    <div className={`col-6 mt-5 default-color ${formStyles.form_container}`}>
                        <Create style={{marginLeft: 'calc(50% - 100px)'}} width={200} height={160}/>
                        <Input style={{margin: '20px auto'}} defaultColor placeholder="Name"/>
                        <button style={{margin: '20px auto'}} className={formStyles.form_button}>Create New Room </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForm;