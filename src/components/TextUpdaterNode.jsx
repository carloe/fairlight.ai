import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'

//const handleStyle = { height: 10, width: 10, background: '#fff', border: '2px solid #F00' };

function TextUpdaterNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="bg-teal-400 shadow-md rounded-lg">
            <div className="rounded-t-lg bg-teal-400 p-2">
                <div className="text-xs font-bold">Load Model</div>
            </div>

            <div className="bg-white text-xs p-4">
                <p>This is the content of the card.</p>
            </div>

            <div className="text-xs rounded-b-lg bg-gray-100 py-1 px-2">
                {/* Footer */}
                <p className="text-gray-600">2 commens</p>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                id="a"
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="b"
                // className="h-4 w-4 bg-red-500"
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="c"
                // className="h-4 w-4 bg-red-500"
                isConnectable={isConnectable}
            />
        </div>
    )

    /*
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-300">
            <div className="mb-4">
                <div className="flex justify-between">
                    <h2 className="mr-auto font-bold">Load Model</h2>

                    <div className="ml-auto">
                        <button className="flex items-center text-blue-400">
                            <QuestionMarkCircleIcon className="w-5" />
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-300"></div>
            </div>



            <div className="mb-4">
                <div>
                    <label htmlFor="text">Text:</label>
                    <input id="text" name="text" onChange={onChange} className="nodrag" />
                </div>
            </div>
            <div className="mt-4 flex justify-inbetween">

                <div className="ml-2">
                    <button className="flex items-center">
                        <ChatBubbleBottomCenterIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="ml-2">
                    3 new comments
                </div>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                id="a"
                className="h-4 w-4 bg-teal-500"
                isConnectable={isConnectable}
            />

            <Handle
                type="source"
                position={Position.Right}
                id="b"
                className="h-4 w-4 bg-red-500"
                isConnectable={isConnectable}
            />


        </div>



        // <div className="text-updater-node">
        //     <div>
        //         <label htmlFor="text">Text:</label>
        //         <input id="text" name="text" onChange={onChange} className="nodrag" />
        //     </div>
        //     <Handle
        //         type="source"
        //         position={Position.Left}
        //         id="a"
        //         style={handleStyle}
        //         isConnectable={isConnectable}
        //     />
        //     <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
        // </div>
    );
     */
}

export default TextUpdaterNode;