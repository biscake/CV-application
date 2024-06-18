import { useState } from "react"

function App() {
  const [isActive, setIsActive] = useState([]);

  const toggleActive = (key) => {
    let newActive;
    if (isActive.includes(key)) {
      newActive = [...isActive, key];
    } else {
      newActive = isActive.filter(item => item !== key);
    }
    console.log(newActive);
    setIsActive(newActive);
  }


  return (
    <>
      <GeneralInfo key={0} isActive={isActive.includes(0)} handleClick={toggleActive} />
      {/* <Education key={1}/>
      <Work key={2}/>
      <Display /> */}
    </>
  )
}

function GeneralInfo({ key, isActive, handleClick }) {
  return (
    <>
      <div className="generalInfo" onClick={handleClick}>General Information</div>
      {isActive && <div>Testing</div>}
    </>
  )
}

function Education() {

}

function Work() {

}

function Display() {

}


export default App;