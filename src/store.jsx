import { createWithEqualityFn } from 'zustand/traditional'
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import initialNodes from './data/nodes';
import initialEdges from './data/edges';

const getNodeHandles = (nodes, connection) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);
    const sourceHandle = sourceNode.data.template.sources.find((handle) => handle.id === connection.sourceHandle);
    const targetHandle = targetNode.data.template.targets.find((handle) => handle.id === connection.targetHandle);
    return { sourceHandle, targetHandle };
}

const useStore = createWithEqualityFn((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
    onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
    isValidConnection: (connection) => {
        const { nodes } = get();
        const { sourceHandle, targetHandle } = getNodeHandles(nodes, connection);
        return sourceHandle && targetHandle && sourceHandle.dataType === targetHandle.dataType;
    },
    onConnect: (connection) => {
        const { nodes, edges: currentEdges } = get();
        const cleanedEdges = currentEdges.filter(edge => edge.targetHandle !== connection.targetHandle);
        const { sourceHandle, targetHandle } = getNodeHandles(nodes, connection);
        const dataType = sourceHandle.dataType || targetHandle.dataType || 'unknown';
        const edgeClassName = `${dataType}-type`;
        set({ edges: addEdge({ ...connection, animated: false, className: edgeClassName }, cleanedEdges) });
    },
}));

export default useStore;