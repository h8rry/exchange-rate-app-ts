import './App.css';
import getRates from './utils/getRates';
import Navbar from './components/Navbar';
import type { Rates } from './utils/getRates';
import RatesTable from './components/RatesTable';
import SelectBaseCurrency from './components/SelectBaseCurrency';
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

  changeBaseCurrency = async(baseCurrency: string) => {
    this.setState({ 
      baseCurrency,
      rates: []
    }, this.refreshRates)
  }

  changeBaseValue = (baseValue: number) => {
    this.setState({
      baseValue: Number(baseValue),
      rates: []
    }, this.refreshRates)
  }

  refreshRates = async() => {
    let rates = await getRates(this.state.baseCurrency);
    
    if (rates) {
      rates = rates.map((rate) => {
        return {
          ...rate,
          total: rate.rate * this.state.baseValue
        }
      });

      this.setState({ rates })
    }
  }

  componentDidMount() {
    this.refreshRates();
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
          <form>
            <div className="space-y-6">
              <div>
                <h1 className="text-lg font-medium leading-6 text-gray-900">Currency Exchange Rates</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Let’s get started by selecting a base currency.
                </p>
              </div>

              <SelectBaseCurrency 
                baseValue={this.state.baseValue}
                changeBaseCurrency={this.changeBaseCurrency}
                changeBaseValue={this.changeBaseValue}
              />
            </div>
          </form>
        </main>

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
