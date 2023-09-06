import React, {memo, useCallback} from "react";
import {Handle, Position} from 'reactflow';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline'

//const handleStyle = { height: 10, width: 10, background: '#fff', border: '2px solid #F00' };

const HandleStyleCheck = {
    top: {
        // // right: -10,
        // // top: 15,
        // background: "#555",
        // // minWidth: 20,
        // // height: 20,
        // borderRadius: 4,
        // placeItems: "center",
        // display: "grid",
        // color: "#fff",
        // zIndex: 2
    },
    bottom: {
        // // right: -10,
        // // // bottom: 1000,
        // background: "#555",
        // // minWidth: 20,
        // // height: 20,
        // borderRadius: 4,
        // placeItems: "center",
        // display: "grid",
        // color: "#fff",
        // zIndex: 2
    },

    bottom2: {
        // // right: -10,
        // // bottom: -15,
        // background: "#555",
        // // minWidth: 20,
        // // height: 20,
        // borderRadius: 4,
        // placeItems: "center",
        // display: "grid",
        // color: "#fff",
        // zIndex: 2
    }
};
export default memo(({data, isConnectable, id: nodeId}) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md">

                <div className="bg-gray-100 rounded-t-lg">
                    <div className="text-sm font-bold p-1 ml-1 text-neutral-900">{data.title}</div>
                </div>

                <div className="border-t border-gray-300"></div>

                <p className="text-xs font-regular text-gray-600 m-2">Inline configs, etc go here...</p>
                <p className="text-xs font-regular text-gray-600 m-2">Inline configs, etc go here...</p>
                <p className="text-xs font-regular text-gray-600 m-2">Inline configs, etc go here...</p>
                <p className="text-xs font-regular text-gray-600 m-2">Inline configs, etc go here...</p>
                <p className="text-xs font-regular text-gray-600 m-2">Inline configs, etc go here...</p>

                <div className="border-t border-gray-300"></div>

                <div className="p-2 bg-neutral-100">
                    {data.targets.map((target, index) => (
                        <div key={target.id} className="flex items-center justify-start">
                            <div className="flex items-center">
                                <Handle
                                    type="target"
                                    position="left"
                                    id={target.id}
                                    className="border-2 border-green-500 bg-green-300"
                                    onConnect={data.onConnect}
                                    isConnectable={isConnectable}
                                />
                                <div className="ml-1 text-xs font-semibold">{target.label}</div>
                            </div>
                        </div>
                    ))}

                    {data.sources.map((source, index) => (
                        <div key={source.id} className="flex items-center justify-end py-0.5">
                            <div className="flex items-center">
                                <div className="mr-2 text-xs font-semibold">{source.label}</div>
                                <Handle
                                    type="source"
                                    position="right"
                                    id={source.id}
                                    className={`border-2 border-${source.color}-500 bg-${source.color}-300`}
                                    style={{...HandleStyleCheck.top}}
                                    isConnectable={isConnectable}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-300"></div>

                <p className="text-xs font-regular text-green-500 px-2 pt-1 pb-1 bg-green-100 rounded-b-lg">Card content goes here.</p>

            </div>
        </>
    );
});