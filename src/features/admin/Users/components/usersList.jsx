import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
        const processedUsers = usersData.map((user) => {
          const roleMatch = user.roles?.match(/authority=(\w+)/);
          return {
            ...user,
            fullName: `${user.firstName || ''} ${user.lastName || ''}`,
            roleFullName: roleMatch ? getRoleFullName(roleMatch[1]) : 'N/A',
          };
        });
        setUsers(processedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleFullName = (role) => {
    switch (role) {
      case 'CHEFDEPROJET':
        return 'Chef de projet';
      case 'CHEFDELOT':
        return 'Chef de Lot';
      case 'CHEFDEQUALITE':
        return 'Responsable de Qualité';
      case 'TECHNICIENDETRAVAUX':
        return 'Technicien de travaux';
      case 'ADMIN':
        return 'Admin';
      case 'QUALITICIEN':
        return 'Qualiticien';
      case 'DIRECTEURGENERAL':
        return 'Directeur général';
      default:
        return role;
    }
  };

  if (loading) {
    return <Loading />;
  }

  const columns = [
    { field: 'username', headerName: 'Email', flex: 2 },
    { field: 'fullName', headerName: 'Nom & prénom', flex: 2 },
    { field: 'phoneNumber', headerName: 'Numéro de téléphone', flex: 1.5 },
    { field: 'roleFullName', headerName: 'Rôle', flex: 1.5, filterable: true },
    { field: 'currentMarketId', headerName: 'Marché', flex: 1.5, filterable: true },
    {
      field: 'actions',
      headerName: '',
      flex: 2,
      renderCell: (params) => (
        <>
          <DeleteUserDialog userId={params.row.userId} />
          <ResetPasswordDialog userId={params.row.userId} username={params.row.username} />
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        getRowId={(row) => row.userId} // Use userId as the unique identifier
        sx={{
          border: 2,
          borderColor: '#137C8B'
        }}
      />
    </div>
  );
}

export default UsersList;



// import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import UpdateUser from './updateUser';
// import DeleteUserDialog from './deleteUserDialog';
// import ResetPasswordDialog from './resetPassword';
// import { getAllUsers } from '../services/usersService'; 
// import Loading from '../../../../layouts/Loading';

// function UsersList() {
//   const [users, setUsers] = useState([]); 
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersData = await getAllUsers(); 
//         setUsers(usersData); 
//         setLoading(false); 
//       } catch (error) {
//         console.error('Failed to fetch users:', error); 
//         setLoading(false); 
//       }
//     };

//     fetchUsers(); 
//   }, []);
//   const getRoleFullName = (role) => {
//     switch (role) {
//       case 'CHEFDEPROJET':
//         return 'Chef de projet';
//       case 'CHEFDELOT':
//         return 'Chef de Lot';
//       case 'CHEFDEQUALITE':
//         return 'Responsable de Qualité';
//       case 'TECHNICIENDETRAVAUX':
//         return 'Technicien de travaux';
//       case 'ADMIN':
//         return 'Admin';
//       case 'QUALITICIEN':
//         return 'Qualiticien';
//         case 'DIRECTEURGENERAL':
//           return 'Directeur général';
//       default:
//         return role;
//     }
//   };
//   if (loading) {
//     return <Loading />; 
//   }

//   return (
//     <TableContainer component={Paper} sx={{ border: 2, borderColor: '#137C8B' }}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead sx={{ backgroundColor: '#137C8B' }}>
//           <TableRow>
//             <TableCell>Email</TableCell>
//             <TableCell align="center">Nom & prénom</TableCell>
//             <TableCell align="center">Numéro de téléphone</TableCell>
//             <TableCell align="center">Rôle</TableCell>
//             <TableCell align="center">Marché</TableCell>
//             <TableCell align="right"></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow
//               key={user.userId}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                  {user.username}
//               </TableCell>
//               <TableCell align="center">{user.firstName} {user.lastName}</TableCell>
//               <TableCell align="center">{user.phoneNumber}</TableCell>
//               <TableCell align="center">{getRoleFullName(user.roles.match(/authority=(\w+)/)[1])}</TableCell>
//               <TableCell align="center">{user.currentMarketId}</TableCell>
//               <TableCell align="right">
//                 <DeleteUserDialog userId={user.userId} />
//                 <ResetPasswordDialog userId={user.userId} username={user.username} />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default UsersList;
