import React, { forwardRef , useId } from 'react'

// Another wau=y of using forward ref

function Select({options = [] , className , label , ...props} , ref ) {
    let id = useId() ;    
  return (
    <div>
        {(label) && ( <label htmlFor="">{label}</label> )}
        <select ref={ref} id={id} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
            {
                options.map(({name , value} , i)=> <option key={i} value={value} >{name}</option>)
            }
        </select>
    </div>
  )
}

export default forwardRef(Select)