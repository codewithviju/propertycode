import React from 'react';
import './Marker.css';

const Marker = (props: any, onClick: any, tooltip: any, $hover: any) => {
  return (
    <div className="marker" onClick={onClick}>
      <div className="bounce">
        <div className="marker__icon ">
          <div className="marker__text">{String(props.text)}</div>
          <div className="pulse" />
        </div>
      </div>
    </div>
  );
};

export default Marker;
