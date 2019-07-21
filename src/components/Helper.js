import React from 'react';
import './Helper.css';

const Helper = () => {

    return (
        <div className='helper-container'>
            <span>
            <kbd>
            <svg style={{transform:'scale(.7)'}} data-icon="key-shift" width="10" height="10" viewBox="0 0 16 16"><desc>key-shift</desc><path d="M13.71 7.29l-5-5C8.53 2.11 8.28 2 8 2s-.53.11-.71.29l-5 5A1.003 1.003 0 0 0 3 9h2v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V9h2a1.003 1.003 0 0 0 .71-1.71z" fill-rule="evenodd"></path></svg>
            </kbd>
             +<kbd>o</kbd> : open/close search box
            </span>
            <span className='helper-spacer' /> 
            <span>
            <kbd>
            <svg style={{transform:'scale(.7)'}} data-icon="key-shift" width="10" height="10" viewBox="0 0 16 16"><desc>key-shift</desc><path d="M13.71 7.29l-5-5C8.53 2.11 8.28 2 8 2s-.53.11-.71.29l-5 5A1.003 1.003 0 0 0 3 9h2v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V9h2a1.003 1.003 0 0 0 .71-1.71z" fill-rule="evenodd"></path></svg>
            </kbd>
             +<kbd>p</kbd> : navigate to previous
            </span>
            <span className='helper-spacer' /> 
            <span>
            <kbd>
            <svg style={{transform:'scale(.7)'}} data-icon="key-shift" width="10" height="10" viewBox="0 0 16 16"><desc>key-shift</desc><path d="M13.71 7.29l-5-5C8.53 2.11 8.28 2 8 2s-.53.11-.71.29l-5 5A1.003 1.003 0 0 0 3 9h2v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V9h2a1.003 1.003 0 0 0 .71-1.71z" fill-rule="evenodd"></path></svg>
            </kbd>
             +<kbd>e</kbd> : toggle file viewer
            </span> 
            
        </div>

    )


}



export default Helper;