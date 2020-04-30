import React, { Fragment } from 'react';

//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';
import Clientes from './componentes/clientes/Clientes';
import Productos from './componentes/productos/Productos';
import Pedidos from './componentes/pedidos/Pedidos';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />

        <div className='grid contenedor contenido-principal'>
          <Navegacion />

          <main className='caja-contenido col-9'>
            <Switch>
              <Route exact path='/' component={Clientes} />

              <Route exact path='/productos' component={Productos} />

              <Route exact path='/pedidos' component={Pedidos} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
