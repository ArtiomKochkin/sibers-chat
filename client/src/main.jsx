import ReactDOM from 'react-dom/client';
import "@app/styles/index.css"
import { App } from '@app/App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <App/>
)