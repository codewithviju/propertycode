import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useState } from 'react';
import '.././Marker/Marker.css';
import { getConfiguration } from '../../helpers';

const Tooltip = (props: any, onClick: any) => {
  const [properties, setProperties] = useState<any>([]);
  const { apiUrl } = getConfiguration();

  useEffect(() => {
    fetch(`${apiUrl}/properties`)
      .then((response) => response.json())
      .then((data) => setProperties(data.payload));
  }, []);

  return (
    <>
      <Tippy
        render={(attrs: any) => (
          <div className="box bg-black text-white" tabIndex="-1" {...attrs}>
            {properties.map((property: any, index: number) => {
              console.log('property.id');
              return (
                <>
                  <h1>{property.price}</h1>
                </>
              );
            })}
            {/* history */}
          </div>
        )}
      >
        <div className="marker" onClick={onClick}>
          <div className="bounce">
            <div className="marker__icon ">
              <div className="marker__text">{String(props.text)}</div>
              <div className="pulse" />
            </div>
          </div>
        </div>
      </Tippy>
    </>
  );
};

export default Tooltip;
