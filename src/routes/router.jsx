import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/> ,
     children: [
            {
                path: "/",
                element: <Home></Home> ,
            },
           
        ]
  },
]);

export default router;