import React from 'react'
import { Field, ErrorMessage} from 'formik'

interface inputFieldProps {
    type: string,
    placeholder: string,
    value?: string,
    name: string
}


const inputField : React.FC <inputFieldProps> = ({
    type,
    placeholder,
    value,
    name
}) => {
    return (
        <>
        <Field className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100"
        type={type}
        placeholder={placeholder}
        value={value}
        id={name}
        />
        <ErrorMessage
        className="text-xs font-semibold text-red-500 ml-3"
        name={name}
        component="span"
      />
      </>
    )

}
export default inputField