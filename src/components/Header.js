import '../style/header.css'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoOnly from '../assets/logoOnly.png'
//import logoName from '../assets/nameOnly.png'


const Header = () => {
    const create = useRef(null)
    const view = useRef(null)
    const [createClicked, setCreateClick] = useState(true)
    const [viewClicked, setViewClick] = useState(false)
    const { pathname } = useLocation()

    // check for url.pathname to set right button nav color
    useEffect(() => {
        if (pathname.split('/')[1] === 'view') {
            setViewClick(true)
            setCreateClick(false)
        }
    }, [pathname])

    // when click on a button => display in white, the others pass to green
    function setBtnBackground(e) {
        if (e.target.className.includes('create')) {
            setCreateClick(true)
            setViewClick(false)
        } else {
            setViewClick(true)
            setCreateClick(false)
        }
    }

    return (
        <nav className='App-header'>
            { /* logo */ }
            <img className='logo' src={logoOnly} alt='logo' />
            <p>
            <span className='name'>WEALTH HEALTH</span>
            </p>
           { /* <img className='logo_name' src={logoName} alt='logoName' /> */ }
            <div className='nav-btns'>
                <Link to='/' className={`create-button ${createClicked && 'active'}`} onClick={setBtnBackground} ref={create}>CREATE EMPLOYEE</Link>
                <Link to='/view' className={`view-button ${viewClicked && 'active'}`} onClick={setBtnBackground} ref={view}>CURRENT EMPLOYEES</Link>
            </div>
        </nav>
    )
}

export default Header