import { useState } from "react"

const initialData = {
  fullName: "Leonard Lim",
  email: "leonard.ljh@gmail.com",
  phone: "+65 9999 9999",
  location: "Singapore",
  education: [],
  work: []
}

function App() {
  const [activeList, setActiveList] = useState([]);
  const [data, setData] = useState(initialData);

  const handleChange = (id, value) => {
    const newData = {...data, [id]: value};
    setData(newData);
  }

  const reset = (key) => {
    let copy = {...data};
    switch(key) {
      case 0:
        copy.fullName = '';
        copy.email = '';
        copy.phone = '';
        copy.location = '';
        break;
      case 1:
        copy.education = [];
        break;
      case 2:
        copy.work = [];
        break;
    }
    setData(copy);
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
      <GeneralInfo id={0} {...data} isActive={activeList.includes(0)} handleClick={() => toggleActive(0)} handleChange={handleChange} reset={reset}/>
      {/* <Education id={1}/>
      <Work id={2}/>
      <Display /> */}
    </>
  )
}

function GeneralInfo({ id, isActive, handleClick, fullName, email, phone, location, handleChange, reset }) {
  return (
    <>
      <form className="generalInfo" onClick={handleClick}>General Information</form>
      {isActive && 
      <>
        <FormInput id={"fullName"} label={"Full Name"} text={fullName} handleChange={handleChange} />
        <FormInput id={'email'} label={"Email"} type="email" text={email} handleChange={handleChange}/>
        <FormInput id={"phone"} label={"Phone number"} text={phone} handleChange={handleChange} />
        <FormInput id={"location"} label={"Location"} text={location} handleChange={handleChange} />
        <button type="button" onClick={() => reset(id)}>Reset</button>
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