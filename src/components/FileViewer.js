import React, {useEffect, useRef, useState} from 'react';
import SyntaxHighlighter, {createElement} from 'react-syntax-highlighter';

import './FileViewer.css';

const fs = window.require('fs');

const FileViewer = ({isOpen, selectedFileInfo}) => {
    const viewer = useRef();
    const [fileContent, setFileContent] = useState("");

    useEffect(()=>{
        if(selectedFileInfo.path && selectedFileInfo.path.length > 0){
            fs.readFile(selectedFileInfo.path, function (err, data) {
                if (err) {
                  return console.error(err);
                }
                setFileContent(data.toString());
              });
        }
    });

    return <div ref={viewer} className={`fileviewer-container ${isOpen ? 'fileviewer-open':''}`}>
        <span className="fileviewer-name">{selectedFileInfo.name}</span>
      <SyntaxHighlighter
                language='javascript' 
                style={{...require(`./monokai`).default, fontSize:11}}
                showLineNumbers
                wrapLines
            >
              {fileContent}
        </SyntaxHighlighter>
    </div>
}


export default FileViewer;
