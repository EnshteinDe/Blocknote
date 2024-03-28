import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/ui/NavBar';
import MainPage from './components/pages/MainPage';
import AuthPage from './components/pages/AuthPage';
import PrivateRoute from './hocs/PrivateRoute';
import BlocknotesPage from './components/pages/BlocknotesPage ';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/UserThunks';
import Loader from './hocs/Loader';
import AdminPage from './components/pages/AdminPage';
import NotesPage from './components/pages/NotesPage';
import BlocknotePage from './components/pages/BlocknotePage';
import NotePage from './components/pages/NotePage';

function App(): JSX.Element {
  const theme = createTheme({
    palette: {
      primary: { main: '#6a329f' },
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);

  const user = useAppSelector((store) => store.user);

  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={user.status === 'loading'}>
        <>
          <NavBar />
          <Box mt={5}>
            <Container>
              <Routes>
                <Route path="/" element={<MainPage />} />

                <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                  <Route path="/blocknotes" element={<BlocknotesPage />} />
                  <Route path="/blocknotes/:id" element={<BlocknotePage />} />
                  <Route path="/notes" element={<NotesPage />} />
                  <Route path="/notes/:id" element={<NotePage />} />
                </Route>

                <Route
                  path="/admin"
                  element={
                    <PrivateRoute isAllowed={user.status === 'logged' && user.username === 'admin'}>
                      <AdminPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/:auth"
                  element={
                    <PrivateRoute isAllowed={user.status === 'guest'}>
                      <AuthPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </Box>
        </>
      </Loader>
    </ThemeProvider>
  );
}

export default App;
