import React, { memo } from "react";
import { Handle } from 'reactflow';
import PropTypes from 'prop-types';
import {NodeTextfield} from './forms/NodeTextfield.jsx';

const CustomNode = memo(({ data, isConnectable }) => {
    console.log(data);

    const colorClass = (dataType) => {
        const type = dataType || 'unknown';
        return `border-2 ${type}-type`
    }

    const maxLength = Math.max(data.template.targets.length, data.template.sources.length);

    const renderTarget = (target) => {
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

    const renderSource = (source) => {
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

    const renderParameter = (parameter) => {
        let displayValue;
        console.log('parameter:', parameter);
        switch (parameter.type) {
            case 'type1':
                displayValue = 'Display for Type 1';
                break;
            case 'type2':
                displayValue = 'Display for Type 2';
                break;
            case 'textfield':
                return (
                    <NodeTextfield template={parameter} />
                )
            default:
                displayValue = parameter.type;
        }
        return (
            displayValue
        );
    }

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
                                        {renderParameter(parameter)}
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
                    const target = data.template.targets[index] || null;
                    const source = data.template.sources[index] || null;
                    return (
                        <div key={index} className="flex items-center text-xs font-semibold text-neutral-700 my-0.5 typed-handles">
                            {renderTarget(target)}
                            <div className="flex-grow"></div>
                            {renderSource(source)}
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-gray-300"></div>

            <p className="text-xs font-regular text-green-500 px-2 pt-1 pb-1 bg-green-100 rounded-b-lg">Status Footer</p>
        </div>
    );
});

CustomNode.propTypes = {
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
