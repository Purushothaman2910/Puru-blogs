import React , {forwardRef , useId} from 'react'

// One way of using forward ref

const Input = forwardRef(function Input({label , type = "text" , className = "" , ...props } , ref ){
    let id = useId()
    return (
        <div className='w-full'>
            {
                (label) && (<label htmlFor={id}>{label}</label>)
            }            
            <input 
            type={type} 
            id={id} 
            ref={ref} 
            {...props}  
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}/>
        </div>
    )
})

export default Input