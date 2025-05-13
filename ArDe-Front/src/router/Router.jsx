import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/shop",
        element: <Shop />,
    },
]);