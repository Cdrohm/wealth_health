import '../style/datepicker.css'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useEmployeesContext } from '../context/employeesContext'

/**
 * the component that selects the date when the chevron is clicked
 * @param {string} label - text to display in front of input.
 * @param {function} setvalue - update selected date to parent component
 * @returns a date picker component.
 */
const Datepicker = ({ label, setvalue }) => {
    // GET actual date (month: 12, day: 29/30/31, year: 1900-2050)
    const now = new Date()
    const today = {}
    today.month = now.getMonth()
    today.day = now.getDate()
    today.year = now.getFullYear()

    // the SET component back to default after the form is submitted
    const employeesCtx = useEmployeesContext()
    const {init, setInit} = employeesCtx.initComponent
    const picker = useRef()
    const [inputDate, setInputDate] = useState('')

    // DATE variables
    const monthNumbers = [...Array(12).keys()].map(i => i + 1)
    const [monthNum, setMonthNum] = useState(today.month)
    const [dayNumbers, setDayNumbers] = useState([...Array(31).keys()].map(i => i + 1))
    const [dayNum, setDayNum] = useState(today.day - 1)
    const yearNumbers = [...Array(2050).keys()].map(i => i + 1).filter(i => i >= 1900)
    const [yearNum, setYearNum] = useState(today.year - 1900)

    //RESET of the DatePicker component once the form is submitted
    useEffect(() => {
        if (init === true) {
            console.log('INIT DATE PICKER', today);
            setMonthNum(today.month)
            setDayNum(today.day - 1)
            setYearNum(today.year - 1900)
            setInit(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init])

    // UPDATE number of days according to the month selected
    useEffect(() => {
        if ([3, 5, 8, 10].includes(monthNum)) {
            setDayNumbers([...Array(30).keys()].map(i => i + 1))
            setDayNum(29)
        } else if (monthNum === 1) {
            setDayNumbers([...Array(29).keys()].map(i => i + 1))
            setDayNum(28)
        } else {
            setDayNumbers([...Array(31).keys()].map(i => i + 1))
        }
    }, [monthNum])

    // FORMAT date
    useEffect(() => {
        setInputDate(`${monthNumbers[monthNum]}/${dayNumbers[dayNum]}/${yearNumbers[yearNum]}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthNum, dayNum, yearNum])

    // selection of the date using the chevrons or the mouse wheel
    function setNum(e, type, inc = null) {
        const types = {
            month: {
                getter: monthNum,
                setter: setMonthNum,
                ref: monthNumbers,
            },
            day: {
                getter: dayNum,
                setter: setDayNum,
                ref: dayNumbers,
            },
            year: {
                getter: yearNum,
                setter: setYearNum,
                ref: yearNumbers,
            },
        }

        const getter = types[type].getter
        const setter = types[type].setter
        const ref = types[type].ref

        // mouse wheel
        if (e.deltaY) {
            if (e.deltaY > 0) {
                if (getter <= ref.length - 2) {
                    setter(getter + 1)
                }
            } else if (e.deltaY < 0) {
                if (getter > 0) {
                    setter(getter - 1)
                }
            }
        }

        // chevrons (up and down)
        if (inc) {
            if (inc > 0 && getter <= ref.length - 2) {
                setter(getter + 1)
            } else if (inc < 0 && getter > 0) {
                setter(getter - 1)
            }
        }
    }

    // show component
    function showPicker() {
        picker.current.style.display = 'flex'
    }

    // hide component & set date
    function hidePicker() {
        picker.current.style.display = 'none'
        setvalue(inputDate)
    }

    //return
    return (
        <Fragment>
            <label htmlFor={label.toLowerCase().replace(' ', '_')}>{label}</label>
            <div className='picker-container'>
                <div className='picker' ref={picker} onMouseLeave={hidePicker}>
                    <div className='picker-month'>
                        <FontAwesomeIcon icon="fa-chevron-up" onClick={e => setNum(e, 'month', -1)} />
                        <div className='picker-number' onWheel={e => setNum(e, 'month')}>
                            {monthNumbers[monthNum]}
                        </div>
                        <FontAwesomeIcon icon="fa-chevron-down" onClick={e => setNum(e, 'month', 1)} />
                    </div>
                    <div className='picker-day'>
                        <FontAwesomeIcon icon="fa-chevron-up" onClick={e => setNum(e, 'day', -1)} />
                        <div className='picker-number' onWheel={e => setNum(e, 'day')}>
                            {dayNumbers[dayNum] || dayNumbers[dayNumbers.length - 1]}
                        </div>
                        <FontAwesomeIcon icon="fa-chevron-down" onClick={e => setNum(e, 'day', 1)} />
                    </div>
                    <div className='picker-year'>
                        <FontAwesomeIcon icon="fa-chevron-up" onClick={e => setNum(e, 'year', -1)} />
                        <div className='picker-number' onWheel={e => setNum(e, 'year')}>
                            {yearNumbers[yearNum]}
                        </div>
                        <FontAwesomeIcon icon="fa-chevron-down" onClick={e => setNum(e, 'year', 1)} />
                    </div>
                </div>
            </div>
            <input type="text" name={label.toLowerCase().replace(' ', '_')} placeholder=" - " value={inputDate} onClick={showPicker} readOnly />
        </Fragment>
    )
}

//PropTypes
Datepicker.propTypes = {
    label: PropTypes.string.isRequired,
    setvalue: PropTypes.func.isRequired,
}

export default Datepicker

