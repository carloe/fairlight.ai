import { memo, useCallback } from "react";
import { Handle } from 'reactflow';
import PropTypes from 'prop-types';
import {NodeTextfield} from './forms/NodeTextfield.jsx';
import {shallow} from "zustand/shallow";
import useStore from "../../store.jsx";

const selector = (state) => ({
    onPropertyChange: state.onPropertyChange,
});

const colorClass = (dataType) => {
    const type = dataType || 'unknown';
    return `border-2 ${type}-type`
}

const renderParameter = (parameter, handleChange) => {
    switch (parameter.type) {
        case 'type1':
            return 'Display for Type 1';
        case 'type2':
            return 'Display for Type 2';
        case 'textfield':
            return <NodeTextfield template={parameter} onPropertyChange={handleChange}/>;
        default:
            return parameter.type;
    }
}

const renderTarget = (target, isConnectable) => {
    if (target) {
        return (
            <div key={target.id} className="flex items-center">
                <div className="flex items-center">
                    <Handle
                        type="target"
                        position="left"
                        id={target.id}
                        className={colorClass(target.dataType)}
                        isConnectable={isConnectable}
                    />
                    <div className="ml-1">{target.label}</div>
                </div>
            </div>
        );
    }
    return null;
};

const renderSource = (source, isConnectable) => {
    if (source) {
        return (
            <div key={source.id} className="flex items-center ml-auto">
                <div className="flex items-center">
                    <div className="mr-1">{source.label}</div>
                    <Handle
                        type="source"
                        position="right"
                        id={source.id}
                        className={colorClass(source.dataType)}
                        isConnectable={isConnectable}
                    />
                </div>
            </div>
        );
    }
    return null;
};

const CustomNode = memo(({ id, data, isConnectable }) => {
    const { onPropertyChange } = useStore(selector, shallow);

    const handleChange = useCallback((event) => {
        onPropertyChange(id, event.target.value);
    }, [id, data, onPropertyChange]);

    const maxLength = Math.max(data.template.targets.length, data.template.sources.length);

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-t-lg">
                <div className="text-sm font-bold p-1 ml-1 text-neutral-900">{data.title}</div>
            </div>

            <div className="border-t border-gray-300"></div>

            {data.template.parameters.length > 0 && (
                <form>
                    <div className="m-2 p-1 pb-2">
                        <div className="space-y-2">
                            {data.template.parameters.map((parameter) => {
                                return(
                                    <div key={parameter.id}>
                                        {renderParameter(parameter, handleChange)}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="border-t border-gray-300"></div>
                </form>
            )}

            <div className="p-2 bg-neutral-100">
                {Array.from({ length: maxLength }, (_, index) => {
                    const target = data.template.targets[index];
                    const source = data.template.sources[index];
                    return (
                        <div key={index} className="flex items-center text-xs font-semibold text-neutral-700 my-0.5 typed-handles">
                            {target && renderTarget(target, isConnectable)}
                            <div className="flex-grow"></div>
                            {source && renderSource(source, isConnectable)}
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
        template: PropTypes.shape({
            parameters: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    placeholder: PropTypes.string.isRequired,
                })
            ).isRequired,
            targets: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    dataType: PropTypes.string.isRequired,
                })
            ).isRequired,
            sources: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    dataType: PropTypes.string.isRequired,
                })
            ).isRequired,
        }).isRequired,
    }).isRequired,
    isConnectable: PropTypes.bool.isRequired,
};

export default CustomNode;
