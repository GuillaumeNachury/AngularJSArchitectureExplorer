import React, { useState, useEffect, useRef } from 'react';
import 'react-virtualized/styles.css';
import List from 'react-virtualized/dist/commonjs/List';

import './SearchBoard.css';
import {AppContext} from '../AppContext'

const sortFunc = (a,b) => {
    if(!b.name && a.name) return -1;
    if(!a.name && b.name) return 1;
    if(!a.name && !b.name) return 0;
    return a.name.localeCompare(b.name); 
}

const SearchBoard = ({URL_SEARCH, isOpen, onFileSelected}) => {
    const [searchEntries, setSearchEntries] = useState([]);
    const [pattern, setPattern] = useState("");
    
    let _srcEntry = useRef([]);
    let _input = useRef();

    useEffect(()=>{
        fetch(`${URL_SEARCH}/lookup.json`).then(res=> res.json()).then(data=>{
                _srcEntry.current = [...data];        
                setSearchEntries(data.sort(sortFunc))
            }
            );
    }, [])

    useEffect(() => {
        if(pattern && pattern.length !== 0)
            setSearchEntries(_srcEntry.current.filter(entry => (entry.name || entry.id).toUpperCase().indexOf(pattern.toUpperCase()) !== -1).sort(sortFunc) )
    }, [pattern])

    useEffect(()=>{
        setPattern("");
        _input.current.focus();},[isOpen])


    const _rowRenderer = ({index, isScrolling, key, style}) => {
        
        return <div className={`search-entry search-entry-${searchEntries[index].type}`} key={key} style={style} title={searchEntries[index].path} onClick={()=>{onFileSelected(searchEntries[index])}}>
           <span>{searchEntries[index].name || searchEntries[index].id} </span>
        </div>
    }

    
    return <div className={`searchboard-container ${isOpen ? 'searchboard-open':''}`}>
    <input className='search-input' type="text" onChange={(e)=>setPattern(e.target.value)} value={pattern} ref={_input}/>
    <List 
        rowRenderer={_rowRenderer}
        height={window.innerHeight}
        width={200}
        rowCount = {searchEntries.length}
        rowHeight={25}
        overscanRowCount={10}
    />
    </div>
}

export default SearchBoard;
