import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import Details from "../views/Details"
 const url = 'https://h8-phase2-gc.vercel.app'

 const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Home url={url}/>
            },
            {
                path: "/detail/:id",
                element: <Details url={url}/>
            }
        ]
    }
 ])

 export default router