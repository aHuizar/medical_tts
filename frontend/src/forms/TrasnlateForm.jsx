import React from 'react';
import PropTypes from 'prop-types';

export default function TranslateForm({ onChangeHandler, onSubmit, text }) {
  TranslateForm.propTypes = {
    onChangeHandler: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };
  return (
    <div>
      <div className="row border border-primary">
        <input type="text" placeholder="Enter some text" className="col" onChange={(e) => onChangeHandler(e)} value={text} />
        <button type="button" className="btn btn-primary col" onClick={onSubmit}>Translate</button>
      </div>
    </div>
  );
}
