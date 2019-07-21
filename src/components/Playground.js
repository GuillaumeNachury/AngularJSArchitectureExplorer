import React, {useEffect, useRef, useState} from 'react';
import './Playground.css'

import Node from './Node';

const Playground = ({graph, onNodeClicked, onFileSelected}) => {
    const [parents, setParents] = useState([]);
    const [deps, setDeps] = useState([]);
    const [rootPos, setRootPos] = useState();
    const playgroundContainer = useRef();
    const [viewportSize, setViewportSize] = useState(0)

    const onGetCentralElementPos = (pos) => {
        setRootPos(pos);
    }

    useEffect(()=>{
        if(playgroundContainer.current && playgroundContainer.current.scrollWidth> window.innerWidth)
            playgroundContainer.current.scroll((rootPos.x+(rootPos.width>>1))-(window.innerWidth>>1),0);
    })

    const maxSize = idx => (pos)=>{
        if(idx == graph.root.children.length-1){
            setViewportSize(pos.x+180);
        }
    }

    return <div ref={playgroundContainer} className="playground-container">

        
        <svg width={viewportSize} height={window.innerHeight} style={{position:"absolute"}}>
        <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
                {
                    rootPos &&
                    <g>
                    <path marker-end="url(#arrowhead)" fill="none" d={`M ${rootPos.x+(180>>1)},${rootPos.y} C ${rootPos.x+(180>>1)+50},${rootPos.y} ${rootPos.x+(180>>1)+50},${rootPos.y-100} ${rootPos.x+(180>>1)+100},${rootPos.y-100}`} />
                
                    <path marker-end="url(#arrowhead)" fill="none" d={`M ${rootPos.x+(180>>1)},${rootPos.y} C ${rootPos.x+(180>>1)-50},${rootPos.y} ${rootPos.x+(180>>1)-50},${rootPos.y-100} ${rootPos.x+(180>>1)-100},${rootPos.y-100}`} />
                
	    		    <line strokeDasharray="5, 10" x1={rootPos.x+(180>>1)} y1="0" x2={rootPos.x+(180>>1)}  y2={window.innerHeight}></line>
                

               
                    <circle r='3' cx={rootPos.x+(180>>1)} cy={rootPos.y} />  
                    <text x={rootPos.x+(180>>1)-120} y={rootPos.y-105} >used in</text>
                    <text x={rootPos.x+(180>>1)+80} y={rootPos.y-105} >requires</text>
                    </g>
                }
			
		  
        </svg>
        <div className="playground-node-holder">
            
                {
                    graph && graph.injectedin.map((child, index) => <Node key={`x-node-i-${index}`} 
                    x-node={index} data ={child} injectedin
                    onClick={onNodeClicked}
                    onFileSelected={onFileSelected}
                    index={index} nbSectors={graph.injectedin.length}/>)
                }
                {
                    graph && <Node key={`x-node-i-root`} 
                   data ={graph.root}
                   isRoot
                   onClick={onNodeClicked}
                   onFileSelected={onFileSelected} 
                   getSize={onGetCentralElementPos}
                    baseCol = {Math.ceil(graph.injectedin.length / Math.floor((window.innerHeight / 100)))}
                    />
                }
                {
                    graph && graph.root.children.map((child, index) => <Node key={`x-node-c-${index}`} 
                    x-node={index} data ={child} isChildren
                    onClick={onNodeClicked}
                    onFileSelected={onFileSelected}
                    getSize={maxSize(index)}
                    baseCol = {Math.ceil(graph.injectedin.length / Math.floor((window.innerHeight / 100)))+1} 
                    index={index} nbSectors={graph.root.children.length}/>)
                }
        </div>
     
    </div>
}

export default Playground;