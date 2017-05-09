import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchResult.scss';

class SearchResult extends Component {

  static propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.oneOf(["LARGE", "SMALL"]),
    altText: PropTypes.string,
  };

  renderHeading() {
    const { name, size } = this.props;
    return size === 'LARGE' ? (
      <h2 className={'SearchResultHeader'}>{ name }</h2>
    ) : (
      <h3 className={'SearchResultHeader'}>{ name }</h3>
    );
  }

  render() {
    const { image, description, size, altText, id, path, onClickResult } = this.props;
    return (
      <Link to={`/beers/${id}`}>
        <div className={`SearchResult ${size.toLowerCase()}`} onClick={() => onClickResult(path)}>
          { this.renderHeading() }
          <img src={image} alt={altText} className={'SearchResultImage'} />
          <p className={'SearchResultDescription'}>{description.length > 200 ? `${description.substring(0, 200)}...` : description }</p>
        </div>
      </Link>
    );
  }
}

export default SearchResult;
