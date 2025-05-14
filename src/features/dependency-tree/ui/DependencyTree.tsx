'use client'

import React, { 
  useEffect, 
  useState,
  // useCallback, 
} from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  Edge,
  // addEdge,
} from 'reactflow'
import dagre from 'dagre'
import 'reactflow/dist/style.css'

import type { TreeNode } from '@/features/dependency-tree/model/DependencyTreeModel'
import { fetchDependencyTree } from '../service/getDependencyTree'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
const NODE_WIDTH = 150
const NODE_HEIGHT = 50

function layoutElements(nodes: Node[], edges: Edge[]) {
  dagreGraph.setGraph({ rankdir: 'LR', marginx: 50, marginy: 50 })
  nodes.forEach((n) => dagreGraph.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT }))
  edges.forEach((e) => dagreGraph.setEdge(e.source, e.target))

  dagre.layout(dagreGraph)

  return nodes.map((n) => {
    const { x, y } = dagreGraph.node(n.id)
    // center the node
    return {
      ...n,
      position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 },
    }
  })
}

function treeToFlow(
  root: TreeNode,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  let idx = 0
  function traverse(node: TreeNode, parentId?: string) {
    const id = `${node.name}@${node.version}#${idx++}`
    nodes.push({
      id,
      data: { label: `${node.name} @ ${node.version}` },
      style: {
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        background: '#1e1e1e',
        color: '#fff',
        border: '2px solid #007acc',
        borderRadius: 4,
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      position: { x: 0, y: 0 }, // will be overwritten by dagre
    })
    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: false,
        style: { stroke: '#007acc' },
      })
    }
    node.children.forEach((child) => traverse(child, id))
  }

  traverse(root)
  const laidOut = layoutElements(nodes, edges)
  return { nodes: laidOut, edges }
}

export default function DependencyTree() {
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [elements, setElements] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: [],
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDependencyTree()
      .then((t) => {
        setTree(t)
        setElements(treeToFlow(t))
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }, [])

  if (error) return <div className="p-4 text-red-400">Error: {error}</div>
  if (!tree) return <div className="p-4">Loading dependency graph…</div>

  return (
    <div className="w-full h-full bg-[#1e1e1e]">
      <ReactFlowProvider>
        <ReactFlow
          nodes={elements.nodes}
          edges={elements.edges}
          nodesDraggable={false}
          nodesConnectable={false}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background
            // variant="dots"
            gap={32}
            size={2}
            color="#333"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
