import './App.css';
import getRates from './utils/getRates';
import Navbar from './components/Navbar';
import React from 'react';

type AppProps = {};

type AppStates = {};

class App extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {}
  }

  refreshRates = async() => {
    let rates = await getRates('USD');
    
    console.log("Testing refreshRates");
    console.log(rates);
  }

  componentDidMount() {
    this.refreshRates();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
