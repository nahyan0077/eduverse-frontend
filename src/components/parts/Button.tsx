import React from 'react'

interface buttonProps {
    name: string,
}

const Button: React.FC <buttonProps> = ({
    name,
}) => {
    return(
        <>
           <button className={`border bg-transparent border-violet-700 text-violet-200 text-sm hover:bg-violet-700 px-2 py-2 rounded-md `}>
               {name}
            </button>
            
        </>
    )
}
export default Button