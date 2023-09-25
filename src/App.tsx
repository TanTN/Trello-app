
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import ListBoards from './pages/listBoards';
import ItemBoards from './pages/itemBoards';
import Header from "./layout/Header";

function App() {
  const Layout = () => {
    return (
      <div className="bg-bgColor font-Rubik text-textColor min-h-screen">
        <Header />
        <Outlet />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
        element: <ListBoards />,
        },
        {
        path: '/itemBoards/:board',
        element: <ItemBoards />,
        
        }
      ]
    },
    
  ])
  return (
    <div>
      <RouterProvider  router={router}/>
    </div>
  )
}

export default App
