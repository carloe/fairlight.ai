import React, { memo } from "react";
import { Handle } from 'reactflow';
import PropTypes from 'prop-types';

const CustomNode = memo(({ data, isConnectable }) => {
    const maxLength = Math.max(data.targets.length, data.sources.length);

    const getColorClass = (colorClass) => `border-2 border-${colorClass}-500 bg-${colorClass}-300`;

    const renderTarget = (target, onConnect) => {
        if (target) {
            const targetClassName = getColorClass(target.colorClass);

            return (
                <div key={target.id} className="flex items-center">
                    <div className="flex items-center">
                        <Handle
                            type="target"
                            position="left"
                            id={target.id}
                            className={targetClassName}
                            onConnect={onConnect}
                            isConnectable={isConnectable}
                        />
                        <div className="ml-1">{target.label}</div>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderSource = (source, onConnect) => {
        if (source) {
            const sourceClassName = getColorClass(source.colorClass);
            return (
                <div key={source.id} className="flex items-center ml-auto">
                    <div className="flex items-center">
                        <div className="mr-1">{source.label}</div>
                        <Handle
                            type="source"
                            position="right"
                            id={source.id}
                            className={sourceClassName}
                            onConnect={onConnect}
                            isConnectable={isConnectable}
                        />
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-t-lg">
                <div className="text-sm font-bold p-1 ml-1 text-neutral-900">{data.title}</div>
            </div>

            <div className="border-t border-gray-300"></div>

            <div className="m-2">
                Content
            </div>

            <div className="border-t border-gray-300"></div>

            <div className="p-2 bg-neutral-100">
                {Array.from({ length: maxLength }, (_, index) => {
                    const target = data.targets[index] || null;
                    const source = data.sources[index] || null;
                    return (
                        <div key={index} className="flex items-center text-xs font-semibold text-neutral-700 my-0.5">
                            {renderTarget(target, data.onConnect)}
                            <div className="flex-grow"></div>
                            {renderSource(source, data.onConnect)}
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-gray-300"></div>

            <p className="text-xs font-regular text-green-500 px-2 pt-1 pb-1 bg-green-100 rounded-b-lg">Card content goes here.</p>
        </div>
    );
});

CustomNode.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        targets: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            colorClass: PropTypes.string.isRequired,
        })).isRequired,
        sources: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            colorClass: PropTypes.string.isRequired,
        })).isRequired,
        onConnect: PropTypes.func.isRequired,
    }).isRequired,
    isConnectable: PropTypes.bool.isRequired,
};

export default CustomNode;
