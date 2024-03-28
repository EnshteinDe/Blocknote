import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Button } from '@mui/material';
import {Link} from '@mui/material';
import { Link as NavLink} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutHandlerThunk } from '../../redux/slices/user/UserThunks';
import SearchNoteForm from './SearchNoteForm';

const linkStyle = { color: 'black', mr: 2, fontFamily: 'Raleway, Arial' };

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const links =
    user.status === 'logged'
      ? [
          { to: '/', name: 'Main' },
          { to: '/blocknotes', name: 'Blocknotes' },
          { to: '/notes', name: 'Notes' },
        ]
      : [
          { to: '/', name: 'Main' },
          { to: '/notes', name: 'Notes' },
          { to: '/signup', name: 'Sign Up' },
          { to: '/login', name: 'Login' },
        ];

  return (
    <Grid item xl={2}>
      <SearchNoteForm/>
      <ul>
        {links.map(link => {
          return <li key={link.name}>
                    <Link component={NavLink} to={link.to} sx={linkStyle}>
                      {link.name}
                    </Link>
                  </li>
        })}
      </ul>
      <Button onClick={() => dispatch(logoutHandlerThunk())}>Logout</Button>
    </Grid>
  );

  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          {links.map((link) => (
            <Link key={link.name} component={NavLink} to={link.to} sx={linkStyle}>
              {link.name}
            </Link>
          ))}
        </Box>
        <Box>
          {user.status === 'logged' && (
            <Button
              variant="text"
              sx={linkStyle}
              onClick={() => void dispatch(logoutHandlerThunk())}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  </Box>;
}
