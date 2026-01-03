import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Form from "./Form.jsx"
import './Main.css'
import App from "./App.jsx";
import NewContactAdd from "./newContactAdd.jsx";

const root=createRoot(document.querySelector('#root'))

const routes=createBrowserRouter([
  {
    path:'/',
    element:<Form/>
  },
  {
    path: "/app",
    element: <App />
   }
])
root.render(<RouterProvider router={routes}/>)