import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBeer } from '../../actions/client-api';
import './BeerPage.scss';

class BeerPage extends Component {

  componentDidMount() {
    const { nameDisplay, getBeerDetails } = this.props;
    if (!nameDisplay) {
     getBeerDetails();
    }
  }

  render() {
    const { 
      nameDisplay, description, styleCategory, 
      styleDescription, styleCategoryDescription, icon
    } = this.props;
    return (
      <div>
        <div className={'BeerPage'}>
          <img src={icon} />
          <h2>{nameDisplay}</h2>
          <div><strong>Category:</strong> <span>{styleCategory}</span></div>
          <p>{description}</p>
          <p>{styleDescription}</p>
          <p>{styleCategoryDescription}</p>
        </div>
        <Link to={'/'}><button>Go back</button></Link>
      </div>
    );
  }
}

const getIdOfBeer = () => {
 const [_, id] = window.location.pathname.split('/beers/');
 return id;
}

const mapStateToProps = state => {
  const { randomBeer, searchResults, currentPath, beerPage } = state;
  const [type, index] = currentPath.split('.');
  const storedBeer = type === 'randomResult' ? randomBeer : searchResults.data[index];
  const beer = storedBeer && storedBeer.id === getIdOfBeer() ? storedBeer : beerPage;
  const { nameDisplay, description, style, labels } = beer;
  return {
    nameDisplay,
    description,
    styleCategory: style ? style.category.name : '',
    styleCategoryDescription: style ? style.category.description : '',
    styleDescription: style ? style.description : '',
    icon: labels ? labels.icon : ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeerDetails: () => dispatch(getBeer(getIdOfBeer()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerPage);