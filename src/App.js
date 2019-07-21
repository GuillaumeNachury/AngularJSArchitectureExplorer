import React, {useState, useRef} from 'react';
import './App.css';

import Playground from './components/Playground';
import SearchBoard from './components/SearchBoard'; 
import KeyTrap from './components/KeyTrap';
import Helper from './components/Helper';
import FileViewer from './components/FileViewer';
import Engine from './Engine';

const URL_SERVER = "http://127.0.0.1:2601";

const _engine = new Engine(URL_SERVER);

function App() {

  const [searchOpen, setSearchOpen] = useState(false);
  const [fileViewerOpen, setFileViewerOpen] = useState(false);
  const [currentGraph, setCurrentGraph] = useState();
  const [selectedFileInfo, setSelectedFileInfo] = useState({path:'', name:''})
  const previous= useRef([]);
  const current= useRef();


  const onElementSelected = (file)=>{
    setSearchOpen(false);
    setCurrentGraph(_engine.getGraphFor(file.name));
    current.current = file.name;
  } 


  const onNodeClicked = (data) => {
    setCurrentGraph(_engine.getGraphFor(data.name));
    previous.current.push(current.current);
    current.current = data.name;
  }

  const goPrevious = () => {
    if(previous.current){
      const n = previous.current.pop();
      if(n){
        setCurrentGraph(_engine.getGraphFor(n)); 
        current.current = n;
      }
    }
  }

  const onFileSelected = (path, name)=>{
    setSelectedFileInfo({path, name});
    setFileViewerOpen(true);
  }

  return (
    <div className="App" >
    <KeyTrap triggers='e' onTrapTriggered={()=>setFileViewerOpen(!fileViewerOpen)}>
      <KeyTrap triggers='p' onTrapTriggered={()=>goPrevious()}>
          <KeyTrap triggers='o' onTrapTriggered={()=>setSearchOpen(!searchOpen)}>
              <Playground graph={currentGraph} onNodeClicked={onNodeClicked} onFileSelected={onFileSelected}/>
              <SearchBoard onFileSelected={onElementSelected} isOpen={searchOpen} URL_SEARCH={URL_SERVER}/>
              <FileViewer isOpen={fileViewerOpen} selectedFileInfo={selectedFileInfo}/>
              <Helper />
          </KeyTrap>
        </KeyTrap>
    </KeyTrap>  
    </div>
  );
}

export default App;
