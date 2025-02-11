import React from 'react'
import styles from './Header.module.css'
import logo from '../../Asset/Images/Netflix-logo.png'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className={styles.header_outer_container
  }>
      <div className={styles.header_container}> 
        <div className={styles.header_left}>
          <ul className={styles.ul_nav}>
            <li> <img src={logo} alt="Netflix-logo" width={"100"} /> </li>
            <li> Home</li>
            <li>TvShow</li>
            <li>Movies</li>
            <li>Latest</li>
            <li> MyList</li>
            <li>Browse by Languages</li> 
          </ul>
        </div>
        <div className={styles.header_right}>
          <ul className={styles.right_ul_nav}>
            <li><SearchIcon/></li>
            <li><NotificationsNoneIcon/></li> 
            <li> <Link to='/Login'> <AccountBoxIcon /></Link></li>
            {/* <li><AccountBoxIcon /></li> */}
            <li><ArrowDropDownIcon/></li> 
          </ul> 
        </div>
      </div>
    </div>
  )
}

export default Header




