import Home from '../pages/admin/Home';
export const admin = [
    {
        layout: "Admin",
        pages: [
          {
            path: "/home",
            element: <Home/>,
          }
        ]
    }
]
export default admin;