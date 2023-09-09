import { memo, useCallback } from 'react';
import { Handle } from 'reactflow';
import PropTypes from 'prop-types';
import { NodeTextField } from './forms/NodeTextField';
import { shallow } from 'zustand/shallow';
import useStore from '../../store';
import { PropertyType } from './PropertyTypes';

const selector = (state) => ({
    onPropertyChange: state.onPropertyChange,
});

const CustomNode = memo(({ id, data, isConnectable }) => {
    const { onPropertyChange } = useStore(selector, shallow);

    const handleChange = useCallback((event) => {
        onPropertyChange(id, event.target.value);
    }, [id, onPropertyChange]);

    const renderParameter = (value, parameter) => (
        <NodeTextField
            initialValue={value}
            template={parameter}
            onPropertyChange={handleChange}
            key={parameter.id}
        />
    );

    const renderTarget = (target, isConnectable) =>
        target && (
            <div key={target.id} className="flex items-center">
                <div className="flex items-center">
                    <Handle
                        type="target"
                        position="left"
                        id={target.id}
                        className={PropertyType.colorClassForType(target.dataType)}
                        isConnectable={isConnectable}
                    />
                    <div className="ml-1">{target.label}</div>
                </div>
            </div>
        );

    const renderSource = (source, isConnectable) =>
        source && (
            <div key={source.id} className="flex items-center ml-auto">
                <div className="flex items-center">
                    <div className="mr-1">{source.label}</div>
                    <Handle
                        type="source"
                        position="right"
                        id={source.id}
                        className={PropertyType.colorClassForType(source.dataType)}
                        isConnectable={isConnectable}
                    />
                </div>
            </div>
        );

    const { title, parameters, outputs } = data;
    const inputs = parameters.filter((parameter) => parameter.type === 'input');
    const inlineParameters = parameters.filter((parameter) => parameter.type === 'inline-input');

    const maxLength = Math.max(inputs.length, outputs.length);

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-t-lg">
                <div className="text-sm font-bold p-1 ml-1 text-neutral-900">{title}</div>
            </div>

            {inlineParameters.length > 0 && (
                <form>
                    <div className="m-2 p-1 pb-2">
                        <div className="space-y-2">{inlineParameters.map(parameter => renderParameter("123", parameter))}</div>
                    </div>
                </form>
            )}

            <div className="p-2 bg-neutral-100">
                {Array.from({ length: maxLength }, (_, index) => {
                    const target = inputs[index];
                    const source = outputs[index];
                    return (
                        <div key={index} className="flex items-center text-xs font-semibold text-neutral-700 my-0.5 typed-handles">
                            {renderTarget(target, isConnectable)}
                            <div className="flex-grow"></div>
                            {renderSource(source, isConnectable)}
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-gray-300"></div>

            <p className="text-xs font-regular text-green-500 px-2 pt-1 pb-1 bg-green-100 rounded-b-lg">Status Footer</p>
        </div>
    );
});

CustomNode.displayName = 'CustomNode';

CustomNode.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        parameters: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                type: PropTypes.oneOf(['inline-input', 'input']).isRequired,
                dataType: PropTypes.oneOf(PropertyType.allTypesAsStrings).isRequired,
                label: PropTypes.string.isRequired,
                placeholder: PropTypes.string,
            })
        ).isRequired,
        outputs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                type: PropTypes.oneOf(['output']).isRequired,
                dataType: PropTypes.oneOf(PropertyType.allTypesAsStrings).isRequired,
            })
        ).isRequired,
    }).isRequired,
    isConnectable: PropTypes.bool.isRequired,
};

export default CustomNode;