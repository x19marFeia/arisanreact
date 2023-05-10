import React from "react";
import './Childhome.css'
import {motion, Variants} from 'framer-motion'

const Childhome = ({uuid, name, deleteuser, username}) => {

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

   return(
      <motion.div className="namediv" key={uuid} initial={"offscreen"}
      whileInView={"onscreen"}
      viewport={{once:false, amount:0.7}}
      transition={{staggerChildren:0.8}}>
         <motion.h3 variants={imageAnimate} className="username">{name}</motion.h3>
         <motion.button className="btndlt" onClick={() => {deleteuser(username)}}>delete</motion.button>
      </motion.div>
   )
}

export default Childhome