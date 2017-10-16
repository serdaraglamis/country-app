import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import fetch from 'isomorphic-unfetch';

import { initStore, setCountryDetail } from '../store';
import Layout from '../components/MyLayout';

class Detail extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const countryDetail = store.getState().countryDetail;
    if (!countryDetail) {
      const countryDetailPromise = await fetch(`https://restcountries.eu/rest/v2/alpha/${query.id}`, { method: 'GET'});
      const dispatchData = await countryDetailPromise.json();
      store.dispatch(setCountryDetail(dispatchData));
    }
  }

  render() {
    return (
      <Layout title={`Country Detail ${this.props.countryDetail.name} - Rest Country App`} page="detail">
        <div className="country">
          <div className="country--header">
            <img className="country--header-flag" src={`/static/images/flags/${this.props.countryDetail.alpha2Code.toLocaleLowerCase()}.png`} alt="" />
            <a target="blank" className="country--header-name">{this.props.countryDetail.name}<span>@{this.props.countryDetail.alpha2Code}</span></a>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Capital</p>
              <div className="country--detail">{this.props.countryDetail.capital}</div>
            </div>
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Region</p>
              <div className="country--detail">{this.props.countryDetail.region}</div>
            </div>
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Sub Region</p>
              <div className="country--detail">{this.props.countryDetail.subregion}</div>
            </div>
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Calling Code</p>
              <div className="country--detail">{this.props.countryDetail.callingCodes[0]}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Population</p>
              <div className="country--detail">{this.props.countryDetail.population}</div>
            </div>
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Native Name</p>
              <div className="country--detail">{this.props.countryDetail.nativeName}</div>
            </div>
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Main Currency</p>
              <div className="country--detail">{this.props.countryDetail.currencies[0].name} - {this.props.countryDetail.currencies[0].code}</div>
            </div>
            <div className="col-md-3 col-sm-6">
              <p className="country--body">Main Language</p>
              <div className="country--detail">{this.props.countryDetail.languages[0].name}</div>
            </div>
          </div>
          <div className="country--translations">
            <span>
              {this.props.countryDetail.translations.de}&nbsp;/&nbsp;
              {this.props.countryDetail.translations.es}&nbsp;/&nbsp;
              {this.props.countryDetail.translations.fr}&nbsp;/&nbsp;
              {this.props.countryDetail.translations.ja}&nbsp;/&nbsp;
              {this.props.countryDetail.translations.it}&nbsp;/&nbsp;
              {this.props.countryDetail.translations.br}&nbsp;/&nbsp;
              {this.props.countryDetail.translations.hr}
            </span>
          </div>
        </div>


        <style jsx>{`
          .country {
            margin: 10vh auto;
            border: 1px solid #eee;
            padding: 25px 50px;
            border-radius: 5px;
            background: white;
          }
          .country--header:after {
            content: "";
            display: block;
            clear: both;
          }
          .country--header-flag {
            border-radius: 5px;
            float: left;
            margin-right: 10px;
          }
          .country--header-name {
            font-weight: bold;
            padding-top: 9px;
          }
          .country--header-name span {
            font-weight: normal;
            color: #999;
            font-size: 0.8em;
            display: block;
          }
          .country--body {
            margin: 10px 0 5px;
            font-size: 1em;
          }
          .country--detail {
            font-weight: normal;
            color: #999;
            font-size: 0.8em;
          }
          .country--translations {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 10px;
          }
          .country--translations span {
            color: #999;
            font-size: 0.8em;
            text-transform: uppercase;
          }

        `}</style>
      </Layout>
    );
  }
}

const mapStateToProps = state => state;

export default withRedux(initStore, mapStateToProps, null)(Detail);
