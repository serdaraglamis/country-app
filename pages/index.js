import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import Layout from '../components/MyLayout';
import {
  initStore,
  handleSearchInput,
  addAllCountries,
  setCountryDetail
} from '../store';


class Search extends React.Component {
  static async getInitialProps({ store, query, req }) {
    if(!store.getState().countries.length > 0) {
      const countriesPromise = await fetch(`https://restcountries.com/v2/all`, {
        method: 'GET'});
      const countryData = await countriesPromise.json();
      await store.dispatch(addAllCountries(countryData));
    }

  }

  goToDetails(country) {
    this.props.setCountryDetail(country);
    Router.push(`/detail?id=${country.alpha2Code}`);
  }

  inputChanged(event) {
    this.props.handleSearchInput(event.target.value.toLocaleLowerCase());
  }


  filteredCountries(searchTerm) {
    return this.props.countries.filter((country) => {
      return country.name.toLocaleLowerCase().includes(this.props.searchTerm)
    })
  }

  render() {
    if (this.props.countries.length > 0) {
      return (
        <Layout title={`Homepage Rest Countries`} page="search">
          <div className="row m-md-5">
            <div className="col">
              <form className="input-group my-2 my-lg-0">
                <input value={this.props.searchTerm} className="form-control mr-sm-12" type="text" onChange={this.inputChanged.bind(this)} placeholder="Type to filter countries by name..." />
              </form>
            </div>
          </div>
          <div className="list-group">
            <div className="row">
              {this.filteredCountries().map(country => (
                <div key={country.numericCode} className="list-group-item list-group-item-action col-md-4 col-sm-12" onClick={() => this.goToDetails(country)}>
                  <div className="card-block">
                    <img className="country-flag" src={`/static/images/flags/${country.alpha2Code.toLocaleLowerCase()}.png`}/>
                    <h6 className="card-subtitle mb-2 text-muted">{country.name}</h6>
                    <hr/>
                    <p className="card-text"><b>Capital:</b> {country.capital}</p>
                    <p className="card-text"><b>Region:</b> {country.region}</p>
                    <p className="card-text"><b>Native Name:</b> {country.nativeName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
          .breadcrumb {
            margin-top: 20px;
          }
          .list-group {
            margin-top: 20px;
          }

          .list-group .card-block {
            padding: 0.25rem;
          }
          .list-group .list-group-item {
            margin-bottom: 10px;
            cursor: pointer;
          }
          .list-group .list-group-item .card-text {
            font-size: 12px;
          }
          .list-group .list-group-item .country-flag {
            width: 60px;
            height: 40px;
            margin-bottom: 20px;
          }
        `}</style>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <div className="card card-inverse card-danger text-center mt-5">
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>Loading...</p>
              </blockquote>
            </div>
          </div>
        </Layout>
      );
    }

  }
}

const mapDispatchToProps = dispatch => ({
  handleSearchInput: bindActionCreators(handleSearchInput, dispatch),
  setCountryDetail: bindActionCreators(setCountryDetail, dispatch),
});

const mapStateToProps = state => state;

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Search);
