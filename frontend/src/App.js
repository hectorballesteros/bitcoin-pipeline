import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './components/Container.css';
import LineChart from './components/LineChart';


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
          Precio actualizado
            <div>
              <h1>$ 300000</h1>
              Última actualización: <strong>hace 3 minutos</strong>
            </div>
        </div>
        <div className="row justify-content-center">
          <div className="Container col-6">
            <LineChart className="LineChart"></LineChart>

          </div>
          <div className="Container col-6">
            <LineChart className="LineChart"></LineChart>
          </div>
        </div>
      </div>
    </body>
      );
    }
    
    export default App;