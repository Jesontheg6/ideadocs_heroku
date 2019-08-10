import React from 'react'
import { TwitterPicker } from 'react-color'

const Color = (props) => {
  const handleChangeComplete = (color) => {
    props.selected.changeBackground(color.hex);
  };

  return (
    <div hidden={!props.selected}>
      <div style={{ display: (props.displayColorPicker ? 'block' : 'none') }}>
        <TwitterPicker
          className="colorpicker"
          onChangeComplete={handleChangeComplete}
        />
      </div>
    </div>
  );
};

export default Color;
