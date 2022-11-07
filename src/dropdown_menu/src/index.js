import { render } from "react-dom";
import { DropdownMenu } from "./lib";
import { useEffect, useState } from 'react'
import './index.css'

const App = () => {
  const [menu1Value, setMenu1Value] = useState()
  const [menu2Value, setMenu2Value] = useState()
  const [init, setInit] = useState(false)
  const initComponent = {init, setInit}

  useEffect(() => console.log('INIT MENUS -', init), [init])

  function resetMenu(e) {
    e.preventDefault()
    setInit(true)
  }

  return (
    <form className="container" onSubmit={resetMenu}>
      <h1>Dropdown Menu</h1>

      <DropdownMenu
        label="Select menu with strings (log = false)"
        options={["Option 1", "Option 2"]}
        placeholder="Please choose an option"
        log={false}
        setvalue={setMenu1Value}
        initComponent={initComponent}
      />
      {menu1Value !== '' && menu1Value !== undefined && <span><em>returned value: {menu1Value}</em></span>}
      <br />

      <DropdownMenu
        label="Select menu with objects (log = true)"
        options={[{ name: 'Option 1', value: 'opt1' }, { name: 'Option 2', value: 'opt2' }]}
        placeholder="Please choose an option"
        initComponent={initComponent}
        setvalue={setMenu2Value}
      />
      {menu2Value !== '' && menu2Value !== undefined && <span><em>returned value: {menu2Value}</em></span>}

      <DropdownMenu
        label="Select menu with objects & no placeholder"
        options={[{ name: 'Option 1', value: 'opt1' }, { name: 'Option 2', value: 'opt2' }]}
        log={false}
        placeholder={false}
        setvalue={setMenu2Value}
        initComponent={initComponent}
      />
      {menu2Value !== '' && menu2Value !== undefined && <span><em>returned value: {menu2Value}</em></span>}

      <button type='submit'>SEND</button>
    </form>


  );
}

render(<App />, document.getElementById("root"));