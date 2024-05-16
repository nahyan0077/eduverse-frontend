import React from 'react'

interface buttonProps {
    name: string,
    bg: string
    txt: string
}

const Button: React.FC <buttonProps> = ({
    name, bg, txt
}) => {
    return(
        <>
           <button className={`btn border border-violet-700 text-${txt}-700 text-sm hover:bg-${bg}-700 hover:text-${txt}-50 bg-${bg}-700 p-3 rounded-md ml-20`}>
               {name}
            </button>
            
        </>
    )
}
export default Button