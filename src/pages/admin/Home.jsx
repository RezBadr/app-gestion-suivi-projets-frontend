import React from 'react'
import {UsersList, UserHeader} from '../../features/admin/Users';

function Home() {
  return (
    <div>
        <UserHeader />
        <UsersList />
    </div>
  )
}

export default Home;