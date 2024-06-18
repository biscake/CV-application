import '../styles/header.css'
import PaperIcon from '../assets/paper-icon.svg'

function Header() {
  return (
    <header>
      <img src={PaperIcon} alt='' style={{width: "50px", height: "50px"}} />
      <h1>CV Maker</h1>
    </header>
  )
}

export default Header