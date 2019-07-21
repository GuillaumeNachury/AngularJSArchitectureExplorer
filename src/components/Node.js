import React, {useState, useEffect, useRef} from 'react';

import './Node.css';

const MIN_HEIGHT = 100;

const Node = ({data, getSize, isChildren, injectedin, index, nbSectors, offset, baseCol = 0, onClick, isRoot, onFileSelected})=>{
const [position, setPosition] = useState({x:0,y:0});
const _ref = useRef();

let _style = {};
if(isRoot){
    _style.width = 180;
}

useEffect(()=>{
    const bcr = _ref.current.getBoundingClientRect();

    
    if((isChildren || injectedin )){
        //if(data.name == 'InitialSettings') debugger;
        let slice = window.innerHeight / nbSectors;
        let nbByCol = nbSectors;
        let ptrCol = 0;
        const overflowing = slice < MIN_HEIGHT;
        //ebugger;
        if(overflowing) {
            slice = MIN_HEIGHT;
            nbByCol = Math.floor(window.innerHeight / slice);
            ptrCol = Math.floor((index)/nbByCol);
        }
        const sliceStart = slice*(index%nbByCol);
        if(injectedin){
            setPosition({
                y:sliceStart+(slice>>1) - (bcr.height>>1),
                x:200*(ptrCol+baseCol)
            })
        }
        else{
            setPosition({
                y:sliceStart+(slice>>1) - (bcr.height>>1),
                x:200*(ptrCol+baseCol) + 200
            }) 
        }
    }
    else{
        setPosition({x:200*baseCol + 100 , y:(window.innerHeight>>1)-(bcr.height>>1)})
    }
    
    if(getSize) getSize({x:200*baseCol + 100 , y:(window.innerHeight>>1)-(bcr.height>>1)}); 
}, [data, offset])

    return <div ref={_ref} className={`node-container node-type-${data.type}`} style={{..._style,transform:`translate3D(${position.x}px,${position.y}px,0)`}}>
        <span onClick={()=>{onClick(data)}} className='node-name'>{`${data.name}`}</span>
        <span className='node-info'>{`type: ${data.type || 'unknown'}`}</span>
        <span className='node-info'>{`module: ${data.moduleName || 'unknown' }`}</span>
        <span onClick={()=> onFileSelected(data.path, data.filename)} className='node-file'>{`file: ${data.filename || 'unknown'}`}</span>
    </div>
}

export default Node;