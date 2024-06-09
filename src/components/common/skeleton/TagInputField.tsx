import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

interface TagInputFieldProps {
    tags: string[];
    setTags: (tags: string[]) => void;
}

const TagInputField: React.FC<TagInputFieldProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
            e.preventDefault();
        }
    };

    const handleRemoveTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    return (
        <div className="tag-input-field ">
            <label htmlFor="objectives" className='text-xs font-semibold'>OBJECTIVES</label>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press enter to add a Objecitves"
                className="tag-input p-3 w-full text-sm font-semibold rounded-md bg-gray-800 mt-2"
            />
            <div className="tags flex space-x-6">
                {tags.map((tag, index) => (
                    <div key={index} className="tag ml-2 mt-2 space-x-2">
                        <span className='bg-gray-800 text-sm p-1 rounded ' >{tag}</span>
                        <span className='hover:cursor-pointer text-red-500 text-md font-extrabold' onClick={() => handleRemoveTag(index)}> <ClearIcon color='error' /> </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagInputField;
