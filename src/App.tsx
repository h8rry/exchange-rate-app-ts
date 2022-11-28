import './App.css';
import getRates from './utils/getRates';
import Navbar from './components/Navbar';
import type { Rates } from './utils/getRates';
import RatesTable from './components/RatesTable';
import React from 'react';

type AppProps = {};

type AppStates = {
  baseCurrency: string;
  baseValue: number;
  rates: Rates
};

class App extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      baseCurrency: 'USD',
      baseValue: 1,
      rates: [],
    }
  }

  refreshRates = async() => {
    let rates = await getRates('USD');
    
    if (rates) {
      this.setState({ rates });
    }
  }

  componentDidMount() {
    this.refreshRates();
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <main className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8" hidden={this.state.rates.length === 0}>
          <RatesTable
            baseCurrency={this.state.baseCurrency}
            baseValue={this.state.baseValue}
            rates={this.state.rates}
          />
        </main>
      </div>
    );
  }
}

export default App;
