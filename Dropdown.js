import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Dropdown = ({
  options,
  multiple = false,
  onSelect,
  renderOption,
  searchable = true,
  usePortal = false,
  zIndex = 1000,
  containerId = 'dropdown-root',
}) => {
  const [search, setSearch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(multiple ? [] : null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOptionClick = (option) => {
    if (multiple) {
      if (selectedOptions.includes(option)) {
        const updatedOptions = selectedOptions.filter((o) => o !== option);
        setSelectedOptions(updatedOptions);
        onSelect(updatedOptions);
      } else {
        const updatedOptions = [...selectedOptions, option];
        setSelectedOptions(updatedOptions);
        onSelect(updatedOptions);
      }
    } else {
      setSelectedOptions(option);
      onSelect(option);
      setIsOpen(false);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderDropdown = () =>
    React.createElement(
      'div',
      {
        className: 'absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg',
        style: { zIndex },
        ref: dropdownRef,
      },
      searchable &&
        React.createElement('input', {
          type: 'text',
          value: search,
          onChange: handleSearchChange,
          placeholder: 'Search...',
          className: 'w-full px-4 py-2 border-b border-gray-300 focus:outline-none',
        }),
      React.createElement(
        'ul',
        { className: 'max-h-60 overflow-auto' },
        filteredOptions.map((option) =>
          React.createElement(
            'li',
            {
              key: option,
              onClick: () => handleOptionClick(option),
              className: `cursor-pointer px-4 py-2 hover:bg-gray-200 ${
                multiple && selectedOptions.includes(option) ? 'bg-gray-300' : ''
              }`,
            },
            renderOption ? renderOption(option) : option
          )
        )
      )
    );

  return React.createElement(
    'div',
    { className: 'relative inline-block w-64' },
    React.createElement(
      'div',
      {
        onClick: toggleDropdown,
        className: 'flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400',
      },
      React.createElement(
        'span',
        { className: 'truncate' },
        multiple
          ? selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : 'Select...'
          : selectedOptions || 'Select...'
      ),
      // React.createElement(
      //   'svg',
      //   {
      //     className: `w-4 h-4 ml-2 transition-transform transform ${isOpen ? 'rotate-180' : ''}`,
      //     xmlns: 'http://www.w3.org/2000/svg',
      //     viewBox: '0 0 20 20',
      //     fill: 'currentColor',
      //   },
      //   React.createElement('path', {
      //     fillRule: 'evenodd',
      //     d: 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
      //     clipRule: 'evenodd',
      //   })
      // )
    ),
    isOpen &&
      (usePortal
        ? createPortal(renderDropdown(), document.getElementById(containerId))
        : renderDropdown())
  );
};

export default Dropdown;