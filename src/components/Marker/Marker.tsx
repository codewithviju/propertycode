import React from 'react';
import './Marker.css';

const Marker = (props: any) => {
  return (
    <div className={'marker'} onClick={props.onClick}>
      <div className="bounce">
        <div className={`marker__icon ${props.isActive ? 'active' : ''}`}>
          <div className="marker__text">{String(props.text)}</div>
        </div>
      </div>
    </div>
  );
};

export default Marker;
