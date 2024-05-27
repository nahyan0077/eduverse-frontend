import React from 'react'
import { Field, ErrorMessage} from 'formik'
import { useTheme } from '../../ui/theme-provider'

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
    const { theme } = useTheme()
    return (
        <>
        <div className='flex flex-col' >

        <label htmlFor={name} className="block text-xs font-semibold mb-2">{placeholder.toUpperCase()}</label>
        <Field className={`w-full px-5 py-3 rounded-lg ${type == 'number' ? 'no-arrows' : ''} font-medium border-2 ${theme === 'light' ? "bg-gray-200 text-gray-600" : "bg-gray-900 text-gray-300"} border-transparent  text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`}
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
        </div>
      </>
    )

}
export default inputField