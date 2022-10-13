import { createContext, useContext, useEffect, useState } from "react";
//import { employees } bdd (localstorage)

export const EmployeesContext = createContext()

//initial state
const initialState = JSON.parse(localstorage.getItem('employees')) || employees

//provider
function EmployeeProvider(props) {
    const [employees, setEmployees] = useState(initialState)
    const [initForm, setInitForm] = useState(false)

    //sort by / table management
    const [sortBy, setSortBy] = useState(null)
    const [sortWay, setSortWay] = useState(null)
    const setSorting = { setSortBy, setSortWay }
    const sortInfo = { sortBy, sortWay }

    // form composent initialisation
    const [init, setInit] = useState(false)
    const initComponent = { init, setInit }

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees))
    }, [employees])

    //add new employee
    function add(employee) {
        setEmployees([...employees, employee])
    }

    //remove employee by index
    function removeByIndex(index) {
        const copy = [...employees]
        copy.splice(index, 1)
        setEmployees(copy)
    }

    //remove employee by name
    function removeByName(name) {
        const copy = [...employees]
        let indexes = copy
            .map((employee, i) => {
                if (employee.firstName.includes(name) || employee.lastName.includes(name)) {
                    return i
                }
                return null
            })
            .filter(elt => elt !== null)
        console.log(indexes);
        indexes.forEach(index => removeByIndex(index))
    }

    //data employee
    const employeesData = {
        employees,
        initForm,
        setInitForm,
        setSorting,
        sortInfo,
        initComponent,
        add,
        removeByIndex,
        removeByName
    }
    return (<EmployeesContext.Provider value={employeesData} {...props} />)
}

// hook context
function useEmployeesContext() {
    return useContext(EmployeesContext)
}

// export for provider and hook context
export { EmployeeProvider, useEmployeesContext }