import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from './components/TextUpdaterNode.jsx';
import "./index.css";


const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = { textUpdater: TextUpdaterNode };

const initialNodes = [
    // { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    // { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
    { id: 'node-2', type: 'textUpdater', position: { x: 500, y: 50 }, data: { value: 456 } },
];
const initialEdges = [
    {
        id: 'horizontal-e1-2',
        source: 'node-1',
        type: 'smoothstep',
        target: 'node-2',
        animated: false,
        sourceHandle: 'b',
    },
];

const initBgColor = "#1A192B";

const rfStyle = {
    padding: 0,
};

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange = (event) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== "2") {
                        return node;
                    }

                    const color = event.target.value;

                    setBgColor(color);

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            color
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
                type: "textUpdater",
                data: {
                    title: "Text Updater",
                    onChange: onChange,
                    color: initBgColor,
                    targets: [
                            {
                                id: "model-a",
                                label: "Model A",
                            },
                            {
                                id: "model-b",
                                label: "Model B",
                            }
                        ],
                    sources: [
                        {
                            id: "latent",
                            label: "Latent",
                            color: "blue",
                        },
                        {
                            id: "image",
                            label: "Image",
                            color: "red",
                        },
                        {
                            id: "mask",
                            label: "Mask",
                            color: "orange",
                        }
                    ]
                },
                position: { x: 300, y: 50 }
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
                targetHandle: "model-b",
                animated: false,
                style: { stroke: "#599e5e", strokeWidth: 3 }
            },
            {
                id: "e2a-3",
                source: "2",
                target: "3",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#599e5e", strokeWidth: 3 }
            }
            // {
            //   id: 'e2b-4',
            //   source: '2',
            //   target: '4',
            //   sourceHandle: 'b',
            //   animated: true,
            //   style: { stroke: '#fff' },
            // },
        ]);
    }, []);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
            ),
        []
    );


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultzoom={1.5}
            fitView
            attributionPosition="bottom-left"
        >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={20} size={1} />
            </ReactFlow>
    );
}