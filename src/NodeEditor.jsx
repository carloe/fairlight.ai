import React, { useCallback, useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TextUpdaterNode from './components/TextUpdaterNode.jsx';

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
    },
];

const rfStyle = {
    padding: 0,
};

export default function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={rfStyle}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
    );
}