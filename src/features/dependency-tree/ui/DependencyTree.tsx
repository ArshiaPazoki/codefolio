"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Node,
  Edge,
  MiniMap,
  useReactFlow,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

import type { TreeNode } from "@/features/dependency-tree/model/DependencyTreeModel";
import { fetchDependencyTree } from "../service/getDependencyTree";

import { Tooltip } from "@/shared/ui/Tooltip";

// Width and height for each node in the graph
const NODE_WIDTH = 150;
const NODE_HEIGHT = 50;

// Create a dagre graph instance for automatic layout
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

/*
  layoutElements performs a horizontal left-to-right layout.
  It takes an array of nodes and edges, applies dagre layout,
  and returns the nodes array with updated position coordinates.
*/
function layoutElements(nodes: Node[], edges: Edge[]): Node[] {
  // Configure dagre to lay out nodes left to right with margins
  dagreGraph.setGraph({ rankdir: "LR", marginx: 50, marginy: 50 });

  // Register each node in dagre with its width and height
  nodes.forEach((n) =>
    dagreGraph.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  );

  // Register each edge in dagre
  edges.forEach((e) => dagreGraph.setEdge(e.source, e.target));

  // Run the layout algorithm
  dagre.layout(dagreGraph);

  // Map over each node to update its position based on dagre output
  return nodes.map((n) => {
    const { x, y } = dagreGraph.node(n.id);
    return {
      ...n,
      position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 },
    };
  });
}

/*
  treeToFlow converts a TreeNode root into arrays of nodes and edges
  suitable for ReactFlow. It assigns each node an id, style, and initial
  position, then calls layoutElements to compute final positions.
*/
function treeToFlow(root: TreeNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let idx = 0;

  // Recursive traversal function
  function traverse(node: TreeNode, parentId?: string) {
    // Create a unique id for this node based on name, version, and an index
    const id = `${node.name}@${node.version}#${idx++}`;

    // Add this node to the nodes array
    nodes.push({
      id: id,
      // data: { label: `${node.name} @ ${node.version}`, raw: node },
      data: {
        label: (
          <Tooltip content={`${node.name}@${node.version}`}>
            <div>{node.name}</div>
          </Tooltip>
        ),
        raw: node,
        searchLabel: `${node.name}@${node.version}`,
      },
      // Style properties for visual appearance
      style: {
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        background: "#1e1e1e",
        color: "#fff",
        border: "2px solid #007acc",
        borderRadius: 4,
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      // Temporary position; will be overwritten by layoutElements
      position: { x: 0, y: 0 },
    });

    // If there is a parent, add an edge from parent to this node
    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        type: "bezier",
        source: parentId,
        target: id,
        animated: false,
        style: { stroke: "#007acc" },
      });
    }

    // Recurse for each child
    node.children.forEach((child) => traverse(child, id));
  }

  // Start traversal from root
  traverse(root);

  // Perform automatic layout and return the final node and edge arrays
  const laidOutNodes = layoutElements(nodes, edges);
  return { nodes: laidOutNodes, edges };
}

/*
  CustomControls renders a Zoom to Fit button that calls fitView
  from the ReactFlow instance to center and zoom the graph.
*/
function CustomControls() {
  // useReactFlow hook gives access to ReactFlow instance methods
  const { fitView } = useReactFlow();

  return (
    <div className="hidden sm:flex absolute top-2 right-2 gap-2 z-10">
      <button
        onClick={() => fitView()}
        className="px-3 py-1 text-sm text-white bg-blue-800 rounded shadow hover:bg-[#005fa3]"
      >
        Zoom to Fit
      </button>
    </div>
  );
}

/*
  DependencyTree is the main component that fetches the dependency tree,
  converts it to ReactFlow elements, allows filtering, and renders the graph.
*/
export default function DependencyTree() {
  // mounted prevents server-side rendering mismatch
  const [mounted, setMounted] = useState(false);

  // tree holds the raw TreeNode data fetched from the server
  const [tree, setTree] = useState<TreeNode | null>(null);

  // elements contains nodes and edges used by ReactFlow
  const [elements, setElements] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: [],
  });

  // selectedNode holds the currently clicked node for detail display
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // error holds any fetch error message
  const [error, setError] = useState<string | null>(null);

  // filter holds the text used to filter nodes by their label
  const [filter, setFilter] = useState("");

  // edgesAnimated toggles edge animation on or off
  const [edgesAnimated, setEdgesAnimated] = useState(false);

  /*
    Fetch the dependency tree on initial render.
    Once fetched, convert it to nodes and edges via treeToFlow
  */
  useEffect(() => {
    setMounted(true);
    fetchDependencyTree()
      .then((t) => {
        setTree(t);
        setElements(treeToFlow(t));
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  /*
    onNodeClick updates selectedNode when a node is clicked.
    Type annotations: event is a mouse event, node is a ReactFlow Node.
  */
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  /*
    filteredElements computes a filtered list of nodes and edges
    based on the filter text. If no filter text, return all elements.
  */
  const filteredElements = useMemo(() => {
    if (!filter.trim()) {
      return elements;
    }
    // Filter nodes whose label includes the filter text (case-insensitive)
    const filteredNodes = elements.nodes.filter((n) =>
      n.data.searchLabel?.toLowerCase().includes(filter.toLowerCase())
    );
    // Collect visible node IDs
    const visibleNodeIds = new Set(filteredNodes.map((n) => n.id));
    // Filter edges that connect two visible nodes
    const filteredEdges = elements.edges.filter(
      (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
    );
    return { nodes: filteredNodes, edges: filteredEdges };
  }, [filter, elements]);

  // Prevent rendering until after client has mounted to avoid SSR mismatch
  if (!mounted) {
    return null;
  }

  // Display error if fetch failed
  if (error) {
    return <div className="p-4 text-red-400">Error: {error}</div>;
  }

  // Show loading state while tree is not yet available
  if (!tree) {
    return <div className="p-4">Loading dependency graph…</div>;
  }

  // Main render
  return (
    <div className="w-full h-full relative bg-neutral-900">
      <ReactFlowProvider>
        {/* Search input and animation toggle */}
        <div className="flex relative top-2 left-2 z-10 gap-2">
          {/* Text input for filtering nodes by name or version */}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search module..."
            className="px-2 py-1 rounded bg-[#2e2e2e] text-white placeholder-gray-400 text-sm"
          />
          {/* Button to enable or disable edge animation */}
          <button
            onClick={() => setEdgesAnimated((prev) => !prev)}
            className="text-sm px-2 py-1 rounded bg-blue-800 text-white hover:bg-[#005fa3]"
          >
            {edgesAnimated ? "Disable" : "Enable"} Animation
          </button>
        </div>

        {/* ReactFlow component renders the graph */}
        <ReactFlow
          nodes={filteredElements.nodes}
          edges={filteredElements.edges.map((e) => ({
            ...e,
            animated: edgesAnimated,
          }))}
          nodesDraggable
          nodesConnectable={false}
          onNodeClick={onNodeClick}
          fitView
          /*
            fitViewOptions can accept options such as:
            padding, minZoom, maxZoom
          */
          fitViewOptions={{
            padding: 0.2,
          }}
          attributionPosition="bottom-left"
        >
          {/* MiniMap shows an overview of the graph */}
          <MiniMap
            zoomable
            pannable
            nodeColor="#007acc"
            maskColor="rgba(30,30,30,0.6)"
            style={{
              backgroundColor: "#1e1e1e",
              border: "1px solid #333",
            }}
          />
          {/* Background renders a grid pattern */}
          <Background gap={32} size={2} color="#333" />
          {/* CustomControls includes a Zoom to Fit button */}
          <CustomControls />
        </ReactFlow>

        {/* Node detail panel shown when a node is selected */}
        {selectedNode && (
          <div className="absolute bottom-2 left-2 bg-[#2a2a2a] text-white p-4 rounded shadow max-w-sm z-10">
            <div className="font-bold text-blue-800 mb-2">Node Info</div>
            <div>
              <strong>Name:</strong> {selectedNode.data.raw.name}
            </div>
            <div>
              <strong>Version:</strong> {selectedNode.data.raw.version}
            </div>
            <div>
              <strong>Children:</strong> {selectedNode.data.raw.children.length}
            </div>
            {/* Close button to hide detail panel */}
            <button
              onClick={() => setSelectedNode(null)}
              className="mt-3 px-2 py-1 text-sm bg-[#444] hover:bg-[#555] rounded"
            >
              Close
            </button>
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
}
