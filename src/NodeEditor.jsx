import { useState, useEffect, useCallback, useMemo } from "react";
import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/20/solid'
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
    Panel
} from "reactflow";
import CustomNode from './components/CustomNode.jsx';
import "reactflow/dist/style.css";
import "./index.css";

const connectionLineStyle = { stroke: "#dedede", strokeWidth: 2};
const snapGrid = [20, 20];
const initBgColor = "#1A192B";
const nodeTypes = {
    customNode: CustomNode,
}

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange = (event) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== "234243") {
                        return node;
                    }

                    const color = event.target.value;
                    setBgColor(color);

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            //.color
                        }
                    };
                })
            );
        };

        setNodes([
            {
                id: "1",
                type: "input",
                data: { label: "An input node" },
                position: { x: 0, y: 50 },
                sourcePosition: "right"
            },
            {
                id: "2",
                type: "customNode",
                data: {
                    title: "Text Updater",
                    onChange: onChange,
                    onConnect: onConnect,
                    color: initBgColor,
                    targets: [
                            {
                                id: "t-model-a",
                                label: "Model AB",
                                dataType: "model",
                            },
                            {
                                id: "t-model-b",
                                label: "Model B",
                                dataType: "model",
                            }
                        ],
                    sources: [
                        {
                            id: "s-latent",
                            label: "Latent",
                            dataType: "latent",
                        },
                        {
                            id: "s-image",
                            label: "Image",
                            dataType: "image",
                        },
                        {
                            id: "s-mask",
                            label: "Mask",
                            dataType: "imageMask",
                        }
                    ]
                },
                position: { x: 300, y: 50 }
            },
            {
                id: "5",
                type: "customNode",
                data: {
                    title: "Out",
                    onChange: onChange,
                    onConnect: onConnect,
                    color: initBgColor,
                    targets: [
                        {
                            id: "t-latent-c",
                            label: "Latent",
                            dataType: "latent",
                        },
                    ],
                    sources: []
                },
                position: { x: 350, y: 50 }
            },
            {
                id: "3",
                type: "output",
                data: { label: "Output A" },
                position: { x: 650, y: 25 },
                targetPosition: "left"
            },
            {
                id: "4",
                type: "output",
                data: { label: "Output B" },
                position: { x: 650, y: 100 },
                targetPosition: "left"
            }
        ]);

        setEdges([
            {
                id: "e1-2",
                source: "1",
                target: "2",
                type: 'smoothstep',
                targetHandle: "t-model-b",
                animated: false,
                style: { stroke: "#599e5e", strokeWidth: 3 }
            },
            {
                id: "e2a-3",
                source: "2",
                target: "3",
                type: 'smoothstep',
                sourceHandle: "s-latent",
                animated: true,
                style: { stroke: "#599e5e", strokeWidth: 3 }
            }
        ]);
    }, [setEdges, setNodes]);

    const findTargetHandleById = (id) => {
        for (const node of nodes) {
            if (node.data.targets) {
                for (const target of node.data.targets) {
                    if (target.id === id) {
                        return target;
                    }
                }
            }
        }
        return null; // Return null if the target is not found in any object
    };

    const findSourceHandleById = (id) => {
        for (const node of nodes) {
            if (node.data.sources) {
                for (const source of node.data.sources) {
                    if (source.id === id) {
                        return source;
                    }
                }
            }
        }
        return null; // Return null if the target is not found in any object
    };

    const isValidConnection = (connection) => {
        console.log('isValidConnection', connection);

        const sourceHandle = findSourceHandleById(connection.sourceHandle);
        const targetHandle = findTargetHandleById(connection.targetHandle);

        if (!sourceHandle || !targetHandle) {
            return false;
        }

        return sourceHandle.dataType === targetHandle.dataType;
    }

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, animated: false, type: 'smoothstep', style: { stroke: "#bababa", strokeWidth: 3 } }, eds)
            ),
        [setEdges]
    );

    const onConnectStart = (_, { nodeId, handleType, handleId }) => {
        console.log('on connect start', {nodeId, handleType, handleId});
    };
    const onConnectEnd = (event) => {
        console.log('on connect end', event);
    }

    const renderRunControlls = () => {
        return (
            <div className="absolute top-0 right-0 p-4">
                <div className="bg-white shadow-md rounded-xl">
                    <div className="flex items-center space-x-2 p-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded">
                            <PlayIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="border-r border-gray-200 h-8"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded">
                            <PauseIcon className="h-4 w-4 text-slate-900" />
                        </div>
                        <div className="border-r border-gray-200 h-8"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded">
                            <StopIcon className="h-4 w-4 text-slate-900" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onConnect={onConnect}
            style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            isValidConnection={isValidConnection}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultzoom={1.5}
            fitView
            attributionPosition="bottom-left"
        >
            <Panel position="top-right">
                { renderRunControlls() }
            </Panel>

            <Controls />
            <MiniMap />
            <Background variant="dots" gap={20} size={1} />
        </ReactFlow>
    );
}