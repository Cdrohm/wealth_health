import React, { useEffect, useRef, useState } from 'react'
import { Fragment } from "react"
import PropTypes from 'prop-types'
import './DropdownMenu.css'

/** library for dropdown menu 
 @param {string} label - label for the select menu (option)
 @param {array} options - array of all the options (required)
    @param {string} elt - option 1 : array of strings - value returned is the value.toLowerCase() with white spaces converted to underscore
    @param {object} elt - option 2 : array of objects - value returned is the value property of object
        @param {string} name - text in select menu
        @param {string} value - returned value when selected
@param {string} placeholder - text on launch (option)
@param {boolean} log - displays nodeElement & value returned in console (option) (default to true)
@param {function} setvalue - setter to return the selected value to parent Component (required)
@param {object} initComponent - initiate getter/setter. (required)
    @param {boolean} init - getter to init action state.
    @param {function} setInit - setter to set init action to false.
@returns a dropdown menu component.
*/
const DropdownMenu = ({ label = 'Label', options = ['Option 1', 'Option 2'], placeholder, log = true, setvalue, initComponent }) => {

    const selectMenu = useRef()
    const {init, setInit} = initComponent
    useEffect(() => {
        if (init === true) {
            if (placeholder !== undefined && placeholder !== false) {
                setVal('')
            } else {
                if (typeof options[0] === 'string') {
                    setVal(options[0])
                } else {
                    setVal(options[0].value)
                }
            }
        }
        setInit(false)

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init])

    const [val, setVal] = useState('')

    function _returnValue(e) {
        log === true && console.log(e.target, `value : ${e.target.value}`)
        setVal(e.target.value)
        setvalue(e.target.value)
    }

    //return
    return (
        <Fragment>
            <label name={label.toLowerCase()} className="dropdown-label">{label}</label>
            <select
                ref={selectMenu}
                className="dropdown-select"
                value={val}
                onChange={_returnValue}
            >
                {placeholder !== undefined && placeholder !== false && (
                    <option className="dropdown-option" value="">{placeholder}</option>

                )}
                {options && typeof options[0] === 'string' && options.map((option, i) =>
                    (<option className="dropdown-option" value={option.toLowerCase().replace(' ', '_')} key={`ssm-${i}`}>{option}</option>)
                )
                }
                {options && typeof options[0] === 'object' && options.map((option, i) =>
                    (<option className="dropdown-option" value={option.value} key={`ssm-${i}`}>{option.name}</option>)
                )
                }
            </select>
        </Fragment>
    )
}

//PropTypes
DropdownMenu.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(PropTypes.string)
        ]).isRequired
    ),
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    log: PropTypes.bool,
    setvalue: PropTypes.func.isRequired,
    initComponent: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]).isRequired
    )
}

export default DropdownMenu

