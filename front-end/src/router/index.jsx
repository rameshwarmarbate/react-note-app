import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const NoteList = lazy(() => import('../components/NoteList'));
const AddNote = lazy(() => import('../components/AddNote'));
const NoteDetails = lazy(() => import('../components/NoteDetail'));
const NotFound = lazy(() => import('./NotFound'));


const Navigations = () => {
  return (
    <Router>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/note-detail/:id" element={<NoteDetails />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
    </Router>
  );
};

export default Navigations;
