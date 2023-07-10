import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './components/Container.css';
import MyLineChart from './components/MyLineChart';
import Price from './components/Price';
import { Stats } from './components/Stats';

function App() {
  const color = '#ffffff';
  return (
    <body className="App">
      <div className="container" style={{ color }}>
        <div className="Header">
          <div className="Titulo">BitCoin</div>
          <img src="/bitcoin_logo.png" className="BitcoinLogo" alt="Mi imagen" />
        </div>
        <div className="container Container" style={{ maxWidth: 650 }}>
          <Price></Price>
        </div>
        <div className="row justify-content-center">
          <div className="Container col-md-6">
            <Stats></Stats>
          </div>
          <div className="Container col-md-6">
            <MyLineChart className="LineChart"></MyLineChart>
          </div>
        </div>
      </div>
    </body>
      );
    }
    
    export default App;