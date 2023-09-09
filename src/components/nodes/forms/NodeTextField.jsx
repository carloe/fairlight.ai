import { useState } from 'react';
import PropTypes from "prop-types";

export function NodeTextField({ initialValue, template, onPropertyChange }) {
    const [inputValue, setInputValue] = useState(initialValue || '');

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
           setInputValue(value);
        }
    };

    const handleInputBlur = (event) => {
        onPropertyChange(event);
    };

    return (
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor={template.id} className="block text-xs font-bold text-neutral-900 leading-6">
                {template.label}
            </label>
            <div className="relative rounded-md shadow-sm">
                <input
                    type='text'
                    name={template.id}
                    id={template.id}
                    value={inputValue}
                    className="block text-xs w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-xs xs:leading-6"
                    placeholder={template.placeholder || "None"}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
            </div>
        </div>
    )
}

NodeTextField.propTypes = {
    initialValue: PropTypes.string,
    template: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
    }).isRequired,
    onPropertyChange: PropTypes.func.isRequired,
};