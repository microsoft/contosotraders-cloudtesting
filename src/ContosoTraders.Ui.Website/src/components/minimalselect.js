import React, { useState } from 'react';
import minimalSelectStyles from './minimalSelect.styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MinimalSelect = () => {
  const [val,setVal] = useState(1);
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const minimalSelectClasses = minimalSelectStyles;

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + minimalSelectClasses.icon}/>
    )};


  return (
    <FormControl>
      <Select
        disableUnderline
        className='minimalSelect'
        IconComponent={iconComponent}
        value={val}
        onChange={handleChange}
      >
        <MenuItem value={0}>Principle</MenuItem>
        <MenuItem value={1}>Recommended</MenuItem>
        <MenuItem value={2}>Photoshop</MenuItem>
        <MenuItem value={3}>Framer</MenuItem>
      </Select>
    </FormControl>
  );
};


export default MinimalSelect;