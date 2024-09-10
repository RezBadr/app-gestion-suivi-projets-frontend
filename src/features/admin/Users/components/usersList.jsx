import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UpdateUser from './updateUser';
import DeleteUserDialog from './deleteUserDialog';
import ResetPasswordDialog from './resetPassword';
import { getAllUsers } from '../services/usersService'; 
import Loading from '../../../../layouts/Loading';

function UsersList() {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers(); 
        setUsers(usersData); 
        setLoading(false); 
      } catch (error) {
        console.error('Failed to fetch users:', error); 
        setLoading(false); 
      }
    };

    fetchUsers(); 
  }, []);

  if (loading) {
    return <Loading />; 
  }

  return (
    <TableContainer component={Paper} sx={{ border: 2, borderColor: '#137C8B' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#137C8B' }}>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="center">Nom & prénom</TableCell>
            <TableCell align="center">Numéro de téléphone</TableCell>
            <TableCell align="center">Rôle</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.userId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                 {user.username}
              </TableCell>
              <TableCell align="center">{user.firstName} {user.lastName}</TableCell>
              <TableCell align="center">{user.phoneNumber}</TableCell>
              <TableCell align="center">{user.roles.match(/authority=(\w+)/)[1]}</TableCell>
              <TableCell align="right">
                <UpdateUser idUser={user.userId} />
                <DeleteUserDialog userId={user.userId} />
                <ResetPasswordDialog userId={user.userId} username={user.username} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersList;
