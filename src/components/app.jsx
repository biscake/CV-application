import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import '../styles/app.css';

const initialData = {
  fullName: "Leonard Lim",
  email: "leonard.ljh@gmail.com",
  phone: "+65 9999 9999",
  location: "Singapore",
  education: [
    {
      universityName: "NUS",
      degree: "Major",
      start: "2024",
      end: "2028",
      id: uuidv4()
    }
  ],
  work: []
}

function App() {
  const [activeList, setActiveList] = useState([]);
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState({isTrue: false, id: null});

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

  const handleEducationEdit = (id, value) => {
    const educationList = data.education.map((entry) => {
      if (entry.id === isEditing.id) {
        entry[id] = value;
      } 
      return entry;
    })
    setData({...data, education: educationList});
  }

  const addEducation = (universityName, degree, start, end) => {
    const education = [...data.education, {universityName, degree, start, end, id: uuidv4()}];
    setData({...data, education});
  }

  const toggleActive = (key) => {
    const newActive = !activeList.includes(key) ? [...activeList, key] : activeList.filter(item => item !== key);
    setActiveList(newActive);
  }

  const deleteEducation = (key) => {
    const newEducation = [...data.education].filter((entry) => entry.id !== key);
    setData({...data, education: newEducation});
  }


  return (
    <main>
      <GeneralInfo id={0} {...data} isActive={activeList.includes(0)} handleClick={() => toggleActive(0)} handleChange={handleChange} reset={reset}/>
      <Education isEditing={isEditing} toggleEdit={setIsEditing} id={1} isActive={activeList.includes(1)} handleClick={() => toggleActive(1)} reset={reset} educationData={data.education} handleEdit={handleEducationEdit} handleAdd={addEducation} handleDelete={deleteEducation} />
      {/* <Work id={2}/>
      <Display /> */}
    </main>
  )
}

function GeneralInfo({ id, isActive, handleClick, fullName, email, phone, location, handleChange, reset }) {
  return (
    <div className="form-container generalInfo" >
      <h2 onClick={handleClick}>General Information</h2>
      {isActive && 
      <>
        <FormInput id={"fullName"} label={"Full Name"} text={fullName} handleChange={handleChange} />
        <FormInput id={'email'} label={"Email"} type="email" text={email} handleChange={handleChange}/>
        <FormInput id={"phone"} label={"Phone number"} text={phone} handleChange={handleChange} />
        <FormInput id={"location"} label={"Location"} text={location} handleChange={handleChange} />
        <div className="buttons">
          <button type="button" onClick={() => reset(id)}>Reset</button>
        </div>
      </>
      }
    </div>
  )
}

function Education({id, isActive, handleClick, reset, educationData, handleEdit, isEditing, toggleEdit, handleAdd, handleDelete}) {
  let currentEdit;
  const [add, setAdd] = useState({isAdd: false, universityName: "", degree: "", start: "", end: ""});
  const handleChange = (id, val) => {
    const newAdd = {...add, [id]: val};
    setAdd(newAdd);
  }
  if (isEditing.isTrue) {
    educationData.forEach(entry => {
      if (entry.id === isEditing.id) {
        currentEdit = entry;
      }
    });
  }

  const addEducation = () => {
    handleAdd(add.universityName, add.degree, add.start, add.end);
    setAdd({isAdd: false, universityName: "", degree: "", start: "", end: ""})
  }

  return (
    <div className="form-container education">
      <h2 onClick={handleClick}>Education</h2>
      {isActive && isEditing.isTrue && 
      <>
        <FormInput label="University" id={"universityName"} text={currentEdit.universityName} handleChange={handleEdit}/>
        <FormInput label="Degree" id={"degree"} text={currentEdit.degree} handleChange={handleEdit}/>
        <FormInput label="Start" id={"start"} text={currentEdit.start} handleChange={handleEdit}/>
        <FormInput label="End" id={"end"} text={currentEdit.end} handleChange={handleEdit}/>
        <div className="buttons">
          <button type="button" onClick={() => toggleEdit({isTrue: false, id: null})}>Done</button>
        </div>
      </>
      }
      {isActive && add.isAdd && 
      <>
        <FormInput label="University" id={"universityName"} text={add.universityName} handleChange={handleChange}/>
        <FormInput label="Degree" id={"degree"} text={add.degree} handleChange={handleChange}/>
        <FormInput label="Start" id={"start"} text={add.start} handleChange={handleChange}/>
        <FormInput label="End" id={"end"} text={add.end} handleChange={handleChange}/>
        <div className="buttons">
          <button type="button" onClick={() => addEducation()}>Add!</button>
          <button type="button" onClick={() => setAdd({isAdd: false, universityName: "", degree: "", start: "", end: ""})}>Cancel</button>
        </div>
      </>
      }
      {!isEditing.isTrue && isActive && !add.isAdd &&
      <>
        {educationData.length !== 0 &&
        <ul>
          {educationData.map((entry) => <EducationList key={entry.id} id={entry.id} entry={entry} handleEdit={handleEdit} toggleEdit={toggleEdit} handleDelete={handleDelete}/>)}
        </ul>
        }
        <div className="buttons">
          <button type="button" onClick={() => setAdd({...add, isAdd: true})}>Add</button>
          <button type="button" onClick={() => reset(id)}>Reset</button>
        </div>
      </>
      }
      
    </div>
  )
}

function Work() {

}

function Display() {

}


function FormInput({ label, id, type = 'text', text, handleChange }) {
  return (
    <div className="input">
      <label htmlFor={id}>{label}&nbsp;&nbsp;</label>
      <input id={id} type={type} onChange={(e) => handleChange(id, e.target.value)} value={text} />
    </div>
  )
}

function EducationList({entry, id, toggleEdit, handleDelete}) {
  return (
    <li className="educationList" key={id}>
      {entry.universityName}
      <button type="button" onClick={() => toggleEdit({isTrue: true, id: id})}>Edit</button>
      <button type="button" onClick={() => handleDelete(id)}>Delete</button>
    </li>
  )
}

export default App;