import { Route, Routes } from 'react-router';
import About from './routes/about';
import ConcertsHome from './routes/concerts';
import City from './routes/concerts/city';
import ConcertsLayout from './routes/concerts/layout';
import Trending from './routes/concerts/trending';
import Home from './routes/home';
import RootLayout from './routes/layout';

function RootRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="concerts" element={<ConcertsLayout />}>
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RootRoutes;
