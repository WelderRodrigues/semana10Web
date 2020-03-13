import React, { useState, useEffect } from 'react';
/*Componente: Bloco isolado de HTML, CSS e JS que nao interfere no restante da aplicação
  Propriedade: Indormações que um compenente Pai passa para o componente Filho
  Estado: Informaçoes mantidas pelo componente
*/
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    };

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);

  }

  return (
    <div id="app">

      <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={handleAddDev}/>
        
      </aside>

      <main>

        <ul>

          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}

        </ul>

      </main>
    </div>
  );
}

export default App;
