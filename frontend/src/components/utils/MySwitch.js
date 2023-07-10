import React, { useState } from 'react';
import Switch from 'react-switch';

const MySwitch = ({ checked, onChange }) => {

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      onColor="#86d3ff"
      onHandleColor="#2693e6"
      handleDiameter={24}
      uncheckedIcon={false}
      checkedIcon={false}
      height={18}
      width={48}
      className="react-switch"
    />
  );
};

export default MySwitch;
