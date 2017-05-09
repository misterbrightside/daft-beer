import React, { Component } from 'react';
import SearchResult from '../../components/SearchResult';
import SearchBox from '../../components/SearchBox';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import {
  searchAPI,
  setCurrentPath,
  setQueryFilter
} from '../../actions/client-api';
import './BeerSearch.scss';

const getDescription = (description, style) => {
  if (description) return description;
  else if (style && style.description) return style.description;
  else return "No description available for this beer.";
};

const SearchResults = ({ data, onClickResult }) => (
  <div>
    { data.map(({result, index}) => (
      <SearchResult
        name={result.nameDisplay}
        id={result.id}
        key={result.id}
        path={`searchResult.${index}`}
        image={result.labels !== undefined ? result.labels.icon : ''}
        altText={result.nameDisplay}
        onClickResult={onClickResult}
        description={getDescription(result.description, result.style)}
        size={'SMALL'}
      />
    ))}
  </div>
);

class BeerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchType: 'beer'
    };
  }

  onChangeText = event => {
    const newValue = event.target.value;
    const { search } = this.props;
    const { searchType } = this.state;
    this.setState({ searchValue: newValue }, () => {
      search(newValue, searchType);
    });
  }

  onRadioButtonChange = event => {
    const { search } = this.props;
    const { searchValue } = this.state;
    this.setState({ searchType: event.target.value });
    search(searchValue, event.target.valueType);
  }

  renderResults() {
    const { 
      data, filteredResults, filterResults, 
      successfulSearch, onClickResult, queryFilter
    } = this.props;
    if (data.length && successfulSearch) {
      return (
        <div>
          <h1>Search results</h1>
          <div className={'FilterBox'}>
            <h2>Filter results:</h2>
            <input 
              type={'text'}
              onChange={filterResults}
              value={queryFilter}
            />
          </div>
          <SearchResults
            data={filteredResults}
            onClickResult={onClickResult}
          />
        </div>
      )
    } else if (!data.length && successfulSearch) {
      return <h1>No results found!</h1>
    } else {
      return <h1>Search for a beer or brewery!</h1>
    }
  }

  render() {
    const { searchType } = this.state;
    return (
      <div>
        <form>
          <h1>Search</h1>
          <SearchBox
            onChangeSearchBox={this.onChangeText}
            searchType={searchType}
            name={'searchType'}
            types={[ { value: 'beer', displayName: 'Beer'}, { value: 'brewery', displayName: 'Brewery'} ]}
            onRadioButtonChange={this.onRadioButtonChange}
          />
        </form>
        { this.renderResults() }
      </div>
    );
  }
}

const resultHasInput = (result, query) => {
  return (
    result.description.toLowerCase().indexOf(query) !== -1 ||
    result.name.toLowerCase().indexOf(query) !== -1
  );
};

const mapStateToProps = state => {
  const { data, successfulSearch } = state.searchResults;
  const { queryFilter } = state;
  const dataWithIndexes = data.map((result, index) => ({ result, index }));
  const filteredResults = queryFilter ? dataWithIndexes
    .filter(dataWithIndex => resultHasInput(dataWithIndex.result, queryFilter)) : dataWithIndexes;
  return {
    data,
    queryFilter,
    filteredResults,
    successfulSearch,
  };
};

const sanitzeInput = input => input.replace(/[^a-zA-Z0-9 -]/gi, "");

const mapDispatchToProps = dispatch => {
  return {
    search: debounce((query, type) => dispatch(searchAPI(query, type)), 2000),
    onClickResult: path => dispatch(setCurrentPath(path)),
    filterResults: event => dispatch(setQueryFilter(sanitzeInput(event.target.value)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BeerSearch);