import React, { memo } from "react";
import { Handle } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    const maxLength = Math.max(data.targets.length, data.sources.length);

    const renderTarget = (target, onConnect) => {
        if (target) {
            const targetClassName = `border-2 border-${target.colorClass}-500 bg-${target.colorClass}-300`;

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
                        <div className="ml-0.5">{target.label}</div>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderSource = (source, onConnect) => {
        if (source) {
            const sourceClassName = `border-2 border-${source.colorClass}-500 bg-${source.colorClass}-300`;

            return (
                <div key={source.id} className="flex items-center ml-auto">
                    <div className="flex items-center">
                        <div className="mr-0.5">{source.label}</div>
                        <Handle
                            type="source"
                            position="right"
                            id={source.id}
                            className={sourceClassName}
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

            <p className="text-xs font-regular text-gray-600 m-2">Inline configs, etc go here...</p>

            <div className="border-t border-gray-300"></div>

            <div className="p-2 bg-neutral-100">
                {Array.from({ length: maxLength }, (_, index) => {
                    const target = data.targets[index] || null;
                    const source = data.sources[index] || null;
                    return (
                        <div key={index} className="flex items-center text-xs font-regular my-2">
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