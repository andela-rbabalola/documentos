/* eslint class-methods-use-this: "off" */
import React from 'react';
import ReactTable from 'react-table';

const SearchLink = ({ data, columns, query, showTable, onClick, onClose, onChange }) => (
  <li id="searchlink">
    <a href="#search-modal" className="search">
      <i className="fa fa-search prefix" aria-hidden="true" />      &nbsp;Search
    </a>
    {/* Modal Start */}
    <div id="search-modal" className="modal view-user-modal">
      <div className="modal-content">
        <h5>Enter search query</h5>
        <input
          id="search-query"
          type="text"
          name="new-role"
          value={query}
          className="validate"
          onChange={onChange} />
        <a
          className="modal-action waves-effect waves-green btn-flat"
          onClick={onClick} id="search-button">          Search</a>
        {showTable ? <ReactTable
          data={data}
          columns={columns} id="results" /> : null}
      </div>
      <div className="modal-footer">
        <a
          className="modal-action modal-close waves-effect waves-green center btn-flat"
          onClick={onClose}>          Close</a>
      </div>
    </div>
    {/* Modal end */}
  </li>
);

SearchLink.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  showTable: React.PropTypes.bool.isRequired,
  query: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchLink;
