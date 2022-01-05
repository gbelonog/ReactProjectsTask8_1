import './App.css';
import { NewsPage } from './components/'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Today news</h1>
      </header>
      <div className="News">
        <NewsPage />
      </div>
    </div>
  );
}

export default App;
