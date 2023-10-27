import {Routes, Route} from "react-router-dom"
import { Login } from './login';
import { Table } from './table';


export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path='table' element={<Table /> }/>
      </Routes>
    </div>
  );
}