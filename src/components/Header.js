import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {fetchItemSearch,fetchPhoneInfo,fetchPhoneFilter} from '../action'
import {fetchLaptopInfo} from '../action/laptop'
import MenuLaptop from './MenuLaptop'
import MenuPhone from './MenuPhone'
import data from '../JSONSERVER/db.json'
function Header() {
  useEffect(()=>{
      dispatch(fetchPhoneInfo())
      dispatch(fetchLaptopInfo())
    })

const [search,setSearch] = useState()
const handleChange = (e) => {
    setSearch(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchItemSearch(search))
    history.push('/Search')
}

const history =  useHistory();
const handlGoBack = () => {
 history.goBack()
}
const location = useLocation();
const locationPathName = location.pathname

const handleHomePage = () => {
    history.push('/')
}

const handleOrderPage = () => {
    history.push('/order')
}

const toggleChange = () => {
  setToggle(!toggle)
}
 const [toggle,setToggle] = useState(false);
 const [phoneData,setPhoneData] = useState(data.Phone);
 const [laptopData,setLaptopData] = useState(data.Laptop);
 const item = useSelector(state=>state.phone.menuListItem)
 const dispatch = useDispatch();
 const itemCount = useSelector(state=>state.phone.newPhoneItem.length)
 
    return (
        <>
         { toggle && <div className="menuList">
         <button className="Close" onClick={toggleChange}>X</button>
             <MenuPhone />
            <MenuLaptop />
          </div>
          } 
        
        <div className="Header" >
            <div className="menu" >
                <img width="60px" height="70px" src="https://goodmade.ru/upload/000/u1/101/39aadfae.png" alt="menu"  onClick={toggleChange}/>
               <h1 onClick={handleHomePage}>My Amazon Store</h1>
        </div>
           
            <form className="search" onSubmit={handleSubmit}>
              <input name="search" type="text" onChange={handleChange} />
              <input type="submit" value=""/>
            </form>
            
            <div className="orderList" onClick={handleOrderPage}>
          <button>
            {itemCount !== 0 &&<span className="orderCount">{itemCount}</span>}
          </button>
           </div>

        </div>
      {
      locationPathName !== '/' && <div className="goBack" onClick={handlGoBack}>
        <button></button>
      </div>
      }
        
       </>
    )
}

export default Header