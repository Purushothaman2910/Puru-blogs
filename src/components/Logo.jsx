import React from 'react'
import {LogoImage} from '../assets'

function Logo({width = "100%" , className}) {
  return (
    <img className={className} src='' alt="Logo image" style={{width : width}}/>
  )
}

export default Logo