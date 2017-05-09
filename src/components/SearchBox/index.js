import React, { Component } from 'react';
import './SearchBox.scss';

const SearchBox = ({ name, onChangeSearchBox, searchType, types, onRadioButtonChange }) => (
  <div className={'SearchBox'}>
    <input onChange={onChangeSearchBox} type={'search'} />
    <div className={'RadioGroup'}>
      { types.map(type => (
        <div key={type.value}>
          <input
            className={'RadioButton'}
            type={'radio'}
            name={name}
            value={type.value}
            onChange={onRadioButtonChange}
            checked={searchType === type.value}
          /> { type.displayName }
        </div>
      )) }
    </div>
  </div>
);

export default SearchBox;