import ReactDOM from 'react-dom/client';
import "@app/styles/index.css"
import { BaseLayout } from '@app/layouts';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BaseLayout />
)