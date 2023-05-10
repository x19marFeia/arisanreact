import React from "react";
import { useState, useRef, useEffect } from "react";
import Childhome from "./Childhome";
import './Home.css'
import {motion, Variants} from 'framer-motion'
import {db} from '../firebase/Firebase.jsx'
import {set, ref, onValue, remove, update} from 'firebase/database'
import {uid} from 'uid'

const Home = () => {
const[name, setname] = useState('')
const [user, setuser] = useState([])
const inputref = useRef('')
const[winner, setwinner] = useState([])

const imageAnimate={
   offscreen:{x:-100, opacity:0},
   onscreen:{
   x:0,
   opacity:1,
   rotate:[0,10,0],
   transition: {type:"spring",
   bounce:0.4,
   duration:1}
 }

}

const imageAnimate2={
   offscreen:{x:-80, opacity:0},
   onscreen:{
   x:0,
   opacity:1,
   rotate:[0,10,0],
   transition: {type:"spring",
   bounce:0.7,
   duration:1}
 }

}
const textAnimate={
   offscreen:{y:100, opacity:0},
   onscreen:{y:0,
   opacity:1,
   transition: {type:"spring",
   bounce:0.4,
   duration:1}
}

}



const deletename = () => {
setname('')
}

useEffect(() => {


   console.log(winner)
   onValue(ref(db), (snapshot) => {
      setuser([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((names) => {
          setuser((oldArray) => [...oldArray, names]);
        });
      }
    });
}, [])


const adduser = () => {

   const uuid = uid()
   
   set(ref(db, `/${uuid}`), {
      name,
      uuid
});
   
   setname("")
   }

const finduser = () => {

   const winn = user.map((m) => 
   m.name
   )
   setwinner(winn[Math.floor(Math.random() * user.length)])
 
   console.log(winner)
 
}

const deleteuser = (username) => {
   remove(ref(db, `/${username.uuid}`));
}
return(
   <div className="Home">
      <motion.div className="wrapper"  initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{once:false, amount:0.7}}
        transition={{staggerChildren:0.8}}>
      <motion.div className="winuser" variants={imageAnimate}>
         <h3>the winner is {winner}</h3>
       </motion.div>
         <div className="inputdiv">
            <motion.input className="inputbar" value={name} type="text" placeholder="type name here..." ref={inputref} onChange={() => {setname(inputref.current.value)}} variants={textAnimate} />
            <button onClick={deletename}>x</button>
         </div>
         <div className="btn-list">
            <motion.button variants={imageAnimate} onClick={adduser} disabled={name == '' ? "disabled" : ""} className="btn-add">add</motion.button>
            <motion.button variants={imageAnimate2} onClick={finduser} className="btn-find">find</motion.button>
         </div>
         <div className="list-name">
            {user.map((username) => {
               return(
               // <li key={username.uuid}>{username.name}</li> 
               <Childhome key={username.uuid} uuid={username.uuid} name={username.name} deleteuser={deleteuser} username={username}/>
               
               )
            })}
         </div>
       {/* {Object.keys(winner).map((win) => {
         return(<h2>{win}</h2>)
         
       })} */}
  
       
      </motion.div>
   </div>
)
}

export default Home