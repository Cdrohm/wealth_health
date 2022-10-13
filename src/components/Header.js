import '../style/header.scss'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


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
            <div className='nav-btns'>
                <Link to='/' className={`create-button ${createClicked && 'active'}`} onClick={setBtnBackground} ref={create}>CREATE EMPLOYEE</Link>
                <Link to='/view' className={`view-button ${viewClicked && 'active'}`} onClick={setBtnBackground} ref={view}>VIEW CURRENT EMPLOYEES</Link>
            </div>
        </nav>
    )
}

export default Header