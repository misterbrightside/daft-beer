import React, { Component } from 'react';
import SearchResult from '../../components/SearchResult';
import { connect } from 'react-redux';
import { 
  getRandomBeer,
  getMoreBeersFromBrewery,
  setCurrentPath
} from '../../actions/client-api';
import './RandomBeer.scss';

class RandomBeer extends Component {

  componentDidMount() {
    const { getRandomBeer, onClickMoreFromBrewery, nameDisplay } = this.props;
    if (!nameDisplay) {
      getRandomBeer();
    }
  }

  render() {
    const { 
      nameDisplay, label, description,
      getRandomBeer, onClickMoreFromBrewery, id,
      onClickBeer
    } = this.props;
    return (
      <div className="RandomBeer">
        <SearchResult
          name={nameDisplay}
          id={id}
          path={`randomResult.1`}
          image={label}
          onClickResult={onClickBeer}
          altText={nameDisplay}
          description={description}
          size={'LARGE'}
        />
        <div className={'Buttons'}>
          <button onClick={getRandomBeer}>Another Beer</button>
          <button onClick={onClickMoreFromBrewery}>More from this brewery</button>
        </div>
      </div>
    );
  }
}

const getDescription = (description, style) => {
  if (description) return description;
  else if (style && style.description) return style.description;
  else return "No description available for this beer.";
};

const mapStateToProps = state => {
  const { nameDisplay, description, labels, style, id } = state.randomBeer;
  return {
    nameDisplay,
    id,
    description: getDescription(description, style),
    label: (labels !== undefined ? labels.medium : '')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomBeer: () => dispatch(getRandomBeer()),
    onClickMoreFromBrewery: () => dispatch(getMoreBeersFromBrewery()),
    onClickBeer: path => dispatch(setCurrentPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomBeer);
