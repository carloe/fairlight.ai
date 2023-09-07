import React, { useCallback, useEffect } from "react";
import { shallow } from 'zustand/shallow';
import { PauseIcon, PlayIcon, StopIcon } from '@heroicons/react/20/solid'
import ReactFlow, { Background, Controls, MiniMap, Panel } from "reactflow";
import CustomNode from './components/CustomNode.jsx';
import "reactflow/dist/style.css";
import "./index.css";
import useStore from './store';

const connectionLineStyle = { stroke: "#dedede", strokeWidth: 2 };
const snapGrid = [20, 20];
const nodeTypes = {
    customNode: CustomNode,
}

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    isValidConnection: state.isValidConnection,
});

const RunControls = () => (
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
);

export default function NodeEditor() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, isValidConnection } = useStore(selector, shallow);

    useEffect(() => {
        const onChange = (event) => {
            setNodes((nds) =>
                nds.map((node) => {
                    console.log('nodes.js changed:', node.id);
                    if (node.id !== "234243") {
                        return node;
                    }

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
    }, []);

    const onConnectStart = useCallback((_, { nodeId, handleType, handleId }) => {
        console.log('on connect start', { nodeId, handleType, handleId });
    }, []);

    const onConnectEnd = useCallback((event) => {
        console.log('on connect end', event);
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onConnect={onConnect}
            style={{ background: "#121722" }}
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
                <RunControls />
            </Panel>

            <Controls />
            <MiniMap />
            <Background variant="dots" gap={20} size={1} />
        </ReactFlow>
    );
}