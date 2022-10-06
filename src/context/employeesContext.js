import { createContext, useContext, useEffect, useState } from "react";
//import employee bdd

export const EmployeesContext = createContext()

//initial state
const initialState = JSON.parse(localstorage.getItem('employees')) || EmployeesContext

//provider
function employeeProvider(props) {
    const [employees, setEmployees] = useState (initialState)
    const [initForm, setInitForm] = useState(false)

    //sort by / table management
    const [sortBy, setSortBy] = useState (null)
    const [sortWay, setSortWay] = useState (null)
    const sortSortOut = {setSortBy, setSortWay}
    const sortInfo = {sortBy, sortWay}

    // formularie composent initialisation
    const [init, setInit] = useState (false)
    const initComponent = {init, setInit}

    useEffect (() => {
        localStorage.setItem('employees', JSON.stringify(employees))
    }, [employees])

    //add new employee
    function add(employee) {
        setEmployees([...employees, employee])
    }

    //remove employee by name
    function removeByName(index) {
        const copy = [...employees]
        let indexes = copy
            .map((employee, i) => {
                if (employee.firstname.includes(name) || employee.lastName.includes(name)) {
                    return i
                }
                return null
            })
            .filter(elt => elt ! == null)
            //console lolg d'indexes
            indexes.forEach(index => removeByIndex(index))
    }

    //remove employee by index
    function removeByIndex(index) {
        const copy = [...employees]
        copy.splice(index, 1)
        setEmployees(copy)
    }

    //data employee
    const employeesData = {
        employees,
        initForm,
        setInitForm,
        sortSortOut,
        sortInfo,
        initComponent,
        add,
        removeByName,
        removeByIndex
    }
    return (<EmployeesContext.Provider value={employeesData} {...props} />)
}

