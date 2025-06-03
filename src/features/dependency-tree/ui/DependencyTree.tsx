"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  // Controls,
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

const NODE_WIDTH = 150;
const NODE_HEIGHT = 50;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function layoutElements(nodes: Node[], edges: Edge[]) {
  dagreGraph.setGraph({ rankdir: "LR", marginx: 50, marginy: 50 });
  nodes.forEach((n) =>
    dagreGraph.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  );
  edges.forEach((e) => dagreGraph.setEdge(e.source, e.target));
  dagre.layout(dagreGraph);

  return nodes.map((n) => {
    const { x, y } = dagreGraph.node(n.id);
    return {
      ...n,
      position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 },
    };
  });
}

function treeToFlow(root: TreeNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let idx = 0;
  function traverse(node: TreeNode, parentId?: string) {
    const id = `${node.name}@${node.version}#${idx++}`;
    nodes.push({
      id,
      data: { label: `${node.name} @ ${node.version}`, raw: node },
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
      position: { x: 0, y: 0 },
    });

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: false,
        style: { stroke: "#007acc" },
      });
    }

    node.children.forEach((child) => traverse(child, id));
  }

  traverse(root);
  const laidOut = layoutElements(nodes, edges);
  return { nodes: laidOut, edges };
}

function CustomControls() {
  const { fitView } = useReactFlow();

  return (
    <div className="absolute top-2 right-2 flex gap-2 z-10">
      <button
        onClick={() => fitView()}
        className="px-3 py-1 text-sm text-white bg-[#007acc] rounded shadow hover:bg-[#005fa3]"
      >
        Zoom to Fit
      </button>
    </div>
  );
}

export default function DependencyTree() {
  const [mounted, setMounted] = useState(false); // for hydration fix
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [elements, setElements] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: [],
  });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [edgesAnimated, setEdgesAnimated] = useState(false);

  useEffect(() => {
    setMounted(true); // defer rendering
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

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const filteredElements = useMemo(() => {
    if (!filter.trim()) return elements;
    const filteredNodes = elements.nodes.filter((n) =>
      n.data.label.toLowerCase().includes(filter.toLowerCase())
    );
    const visibleNodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredEdges = elements.edges.filter(
      (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
    );
    return { nodes: filteredNodes, edges: filteredEdges };
  }, [filter, elements]);

  const onZoomToFit = useCallback(() => {
    const flow = document.querySelector(".react-flow") as any;
    flow?.__reactFlowInstance?.fitView();
  }, []);

  if (!mounted) return null; // prevent SSR mismatch
  if (error) return <div className="p-4 text-red-400">Error: {error}</div>;
  if (!tree) return <div className="p-4">Loading dependency graph…</div>;

  return (
    <div className="w-full h-full relative bg-[#1e1e1e]">
      <ReactFlowProvider>
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search module..."
            className="px-2 py-1 rounded bg-[#2e2e2e] text-white placeholder-gray-400 text-sm"
          />
          <button
            onClick={() => setEdgesAnimated((prev) => !prev)}
            className="text-sm px-2 py-1 rounded bg-[#007acc] text-white hover:bg-[#005fa3]"
          >
            {edgesAnimated ? "Disable" : "Enable"} Animation
          </button>
        </div>

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
          attributionPosition="bottom-left"
        >
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
          {/* <Controls /> */}

          <Background gap={32} size={2} color="#333" />
          <CustomControls onZoomToFit={onZoomToFit} />
        </ReactFlow>

        {selectedNode && (
          <div className="absolute bottom-2 left-2 bg-[#2a2a2a] text-white p-4 rounded shadow max-w-sm z-10">
            <div className="font-bold text-[#007acc] mb-2">Node Info</div>
            <div>
              <strong>Name:</strong> {selectedNode.data?.raw?.name}
            </div>
            <div>
              <strong>Version:</strong> {selectedNode.data?.raw?.version}
            </div>
            <div>
              <strong>Children:</strong>{" "}
              {selectedNode.data?.raw?.children?.length ?? 0}
            </div>
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
