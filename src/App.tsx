import { Outlet } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';

function App() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

export default App;
