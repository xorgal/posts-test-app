import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { List, PostDetail } from './routes';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/posts/:id' element={<PostDetail />} />
      </Routes>
    </Fragment>
  );
};

export default App;
