import ReactFlow, { Background, Connection, ConnectionMode, Controls, addEdge, useEdgesState} from 'reactflow'  
import * as Toolbar from '@radix-ui/react-toolbar'
import { zinc } from 'tailwindcss/colors'

import { Square } from './components/node/Square';
import { useCallback } from 'react';
import DefaultEdges from './components/edges/DefaultEdges';

import 'reactflow/dist/style.css';


const NODE_TYPES = {
  square: Square
}

const EDGE_TYPES = {
  default: DefaultEdges
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 400,
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 400,
    },
    data: {},
  }
] satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useEdgesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges =>  addEdge(connection, edges))
  }, [])

  function addSquareNode () {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 200,
          y: 400,
        },
        data: {},
      },
    ])
  }

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background gap={12} size={2} color={zinc[200]}/>
        <Controls />
      </ReactFlow>
      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
        <Toolbar.Button  className='w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2' onClick={addSquareNode}/>
      </Toolbar.Root>
    </div>

  )
}

export default App
