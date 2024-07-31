import React from 'react';
import Dropdown from '../Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const options = ['Option 1', 'Option 2', 'Option 3'];

export const SingleSelect = () => (
  <Dropdown options={options} onSelect={(selected) => console.log(selected)} />
);

export const MultiSelect = () => (
  <Dropdown options={options} multiple onSelect={(selected) => console.log(selected)} />
);

export const CustomRenderOption = () => (
  <Dropdown
    options={options}
    onSelect={(selected) => console.log(selected)}
    renderOption={(option) => <span className="text-blue-500">{option}</span>}
  />
);

export const WithSearchDisabled = () => (
  <Dropdown
    options={options}
    onSelect={(selected) => console.log(selected)}
    searchable={false}
  />
);
