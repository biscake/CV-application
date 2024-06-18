import { useState } from "react"

const initialData = {
  fullName: "Leonard Lim",
  email: "leonard.ljh@gmail.com",
  phone: "+65 9999 9999",
  location: "Singapore"
}

function App() {
  const [activeList, setActiveList] = useState([]);
  const [data, setData] = useState(initialData);

  const handleChange = (id, value) => {
    console.log('ran');
    const newData = {...data, [id]: value};
    setData(newData);
  }

  const toggleActive = (key) => {
    let newActive;
    if (!activeList.includes(key)) {
      newActive = [...activeList, key];
    } else {
      newActive = activeList.filter(item => item !== key);
    }
    setActiveList(newActive);
  }


  return (
    <>
      <GeneralInfo {...data} key={0} isActive={activeList.includes(0)} handleClick={() => toggleActive(0)} handleChange={handleChange} />
      {/* <Education key={1}/>
      <Work key={2}/>
      <Display /> */}
    </>
  )
}

function GeneralInfo({ isActive, handleClick, fullName, email, phone, location, handleChange }) {
  return (
    <>
      <form className="generalInfo" onClick={handleClick}>General Information</form>
      {isActive && 
      <>
        <FormInput id={"fullName"} label={"Full Name"} text={fullName} handleChange={handleChange} />
        <FormInput id={'email'} label={"Email"} type="email" text={email} handleChange={handleChange}/>
        <FormInput id={"phone"} label={"Phone number"} text={phone} handleChange={handleChange} />
        <FormInput id={"location"} label={"Location"} text={location} handleChange={handleChange} />
      </>
      }
    </>
  )
}

function Education() {

}

function Work() {

}

function Display() {

}


function FormInput({ label, id, type = 'text', text, handleChange }) {
  return (
    <>
      <label htmlFor={id}>{label}&nbsp;&nbsp;</label>
      <input id={id} type={type} onChange={(e) => handleChange(id, e.target.value)} value={text} />
    </>
  )
}

export default App;