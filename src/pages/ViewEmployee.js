import '../style/view.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../components/DataTable'
import { SimpleSelectMenu } from 'simple-select-menu'
import { useEmployeesContext } from '../context/employeesContext'


/**
 * table of employees + search bar + a number of results per page selector + a pagination
 * @returns View - React component
 */
const View = () => {
  const employeesContext = useEmployeesContext()

  // set menu components revert to defaults after form is submitted
  const initComponent = employeesContext.initComponent

  // search and display table management
  const [allEmployees, setAllEmployees] = useState([...employeesContext.employees])
  const [displayNum, setDisplayNum] = useState(10)
  const [displayPage, setDisplayPage] = useState(0)
  const [pagesArray, setPagesArray] = useState([1])
  const [results, setResults] = useState(allEmployees)
  const [searchLength, setSearchLength] = useState(0)

  // sort table management
  const { setSortBy, setSortWay } = employeesContext.setSorting
  const { sortBy, sortWay } = employeesContext.sortInfo

  // sort table by column and path
  useEffect(() => {
    // reset sorting
    if (sortBy === null) {
      setAllEmployees([...employeesContext.employees])
      return
    }
    // launch sorting
    setAllEmployees(allEmployees.sort((a, b) => {
      let valueA = a[sortBy]
      let valueB = b[sortBy]
      if (['street', 'city', 'stateName', 'zipCode'].includes(sortBy)) {
        valueA = a.address[sortBy]
        valueB = b.address[sortBy]
      }

      if (sortWay === 'up') {
        if (valueA < valueB) { return -1 }
        if (valueA > valueB) { return 1 }
        return 0
      } else if (sortWay === 'down') {
        if (valueA > valueB) { return -1 }
        if (valueA < valueB) { return 1 }
        return 0
      }
      return 0
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortWay])


  // Setting the number of pages and results displayed on displayNum + display page change
  useEffect(() => {
    countPages()
    showResults(+displayNum)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNum, displayPage, allEmployees, sortWay])

  // set results displayed on the screen
  function showResults(len, results = allEmployees) {
    setResults(results.slice(displayPage * len, displayPage * len + len))
  }

  // set number of pages depending on number of results per page & allEmployees' length
  function countPages() {
    setPagesArray([...Array(Math.ceil(allEmployees.length / displayNum))])
  }

  // set page number active
  function selectPage(i) {
    document.querySelector('.active-page').classList.remove('active-page')
    document.querySelector(`#page-${i + 1}`).classList.add('active-page')
    setDisplayPage(i)
  }

  // set number of results to display per page
  function changeDisplayNum(num) {
    selectPage(0)
    setDisplayPage(0)
    setDisplayNum(num)
  }

  // search table for value + filter table
  function searchData(e) {
    setSortBy(null)
    setSortWay(null)
    const target = e.target.value.toString().toLowerCase()

    if (target.length >= 3) {
      // user errases letter
      if (target.length < searchLength) {
        const searchResult = employeesContext.employees.filter(employee =>
          Object.values(employee).some(field => field.toString().toLowerCase().includes(target) ||
            Object.values(employee.address).some(field => field.toString().toLowerCase().includes(target))))
        setAllEmployees(searchResult)
        setSearchLength(target.length)
        return
      }
      // user adds letter
      const searchResult = allEmployees.filter(employee =>
        Object.values(employee).some(field => field.toString().toLowerCase().includes(target) ||
          Object.values(employee.address).some(field => field.toString().toLowerCase().includes(target))))
      setAllEmployees(searchResult)
      setSearchLength(target.length)

    } else {
      // reset table to general table
      setAllEmployees([...employeesContext.employees])
      setSearchLength(0)
    }
  }


  //return
  return (
    <div className='view'>
      <div className='view-top'>
        <div className='view-top-select'>
          <SimpleSelectMenu label='Show' options={['10', '25', '50', '100']} log={false} setvalue={changeDisplayNum} initComponent={initComponent} />
          entries
        </div>
        <div className='view-top-search'>Search
          <input type='text' placeholder='Search any text or date' onChange={searchData} />
        </div>
      </div>

      <DataTable data={results} start={displayPage * displayNum} />

      <div className='view-bottom'>
        <div>Showing {displayPage + 1} to {pagesArray.length} of {allEmployees.length} entries</div>
        <div>
          {displayPage > 0 && (<Link to="#" onClick={() => selectPage(displayPage - 1)}>Previous</Link>)}
          {
            pagesArray.map((e, i) => {
              if (i === 0) {
                return (<Link to='#' key={i} onClick={() => selectPage(i)} className='page active-page' id={`page-${i + 1}`} >{i + 1}</Link>)
              } else {
                return (<Link to='#' key={i} className='page' id={`page-${i + 1}`} onClick={() => selectPage(i)} >{i + 1}</Link>)
              }
            })
          }
          {displayPage < pagesArray.length - 1 && (<Link to="#" onClick={() => selectPage(displayPage + 1)}>Next</Link>)}
        </div>
      </div>
    </div>
  )
}

export default View