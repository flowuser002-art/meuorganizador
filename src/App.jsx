import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExecutiveDashboard />} />
          {/* Placeholders for other routes */}
          <Route path="accounts" element={<div>Accounts Module Coming Soon</div>} />
          <Route path="transactions" element={<div>Transactions Module Coming Soon</div>} />
          <Route path="audit" element={<div>Audit Module Coming Soon</div>} />
          <Route path="investments" element={<div>Investments Module Coming Soon</div>} />
          <Route path="goals" element={<div>Goals Module Coming Soon</div>} />
          <Route path="profile" element={<div>Profile Module Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
