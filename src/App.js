import { createContext, useState } from 'react';
import './App.css';
import Board from './components/Board';
import SearchBar from './components/SearchBar';
import { boardDefault } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);

  return (
    <AppContext.Provider value={{board, setBoard}}>
      <div className="App">
        <SearchBar placeholder="Enter a Player..."/>
        <Board/>
      </div>
    </AppContext.Provider>
      
  );
}

export default App;
