
import {Row, Col} from 'react-bootstrap' ;
import CButton from '../../../Component/CButton' ;
import SearchBar from '../../../Component/SearchBar' ;

function Header(props) {
    const Login = () => {

    }
    const Signup = () => {

    }


    return(
        <div className='page-header'>
            <div className='desktop-header'>
                <div className='header-mark'>
                    <img src="/images/mark.png"/>
                </div>
                <div className='now-time'>
                    Mar 
                </div>
                <SearchBar />
                <div className='sign-field'>
                    <CButton 
                        text='Log In'
                        background='#F5E04D'
                        color='black'
                        fontSize='12px'
                        callBack={Login}
                    />
                    <CButton 
                        text='Sign Up'
                        background='white'
                        color='black'
                        callBack={Signup}
                        marginLeft='5px'
                        fontSize='12px'
                        marginRight='10px'
                    />

                </div>
            </div>
            
        </div>
    ) ;
}
export default Header ;