import React, { useEffect } from 'react';
import { Layout } from '@arco-design/web-react';
import { IconLeftCircle } from '@arco-design/web-react/icon';
import {
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Home from './pages/HomePage';
import ShortVideo from './pages/ShortVideo';
import TinyVideo from './pages/TinyVideo';
import LongVideo from './pages/LongVideo';
import 'xgplayer/dist/xgplayer.min.css';
import './app.css';

const { Content } = Layout;
const pageWithPadding = ['short', 'long'];

function App() {
  const location = useLocation();
  const history = useHistory();
  const isPaddingValid = pageWithPadding.find(item => location.pathname.includes(item));
  return (
    <Layout className="layout">
      <Content className={`${isPaddingValid ? 'paddingTop' : ''} layout`}>
        {location.pathname !== '/' && (
          <IconLeftCircle
            className="backIcon"
            onClick={() => history.push('/')}
          />
        )}
        <Switch>
          <Route path="/short">
            <ShortVideo />
          </Route>
          <Route path="/tiny">
            <TinyVideo />
          </Route>
          <Route path="/long">
            <LongVideo />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
