import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import CreateRequest from './components/createRequest/CreateRequest';
import EditRequest from './components/editRequest/EditRequest';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/edit-request/:id" element={<EditRequest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;