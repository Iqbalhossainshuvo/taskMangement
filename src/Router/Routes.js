import { createBrowserRouter } from "react-router-dom";
import AddTask from "../Components/AddTask";
import CompleteTask from "../Components/CompleteTask";
import Login from "../Components/Login";
import MyTask from "../Components/MyTask";
import Register from "../Components/Register";
import UpdatePage from "../Components/UpdatePage";
import Main from "../Layout/Main";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const route=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
          
            {
                path:'/',
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path:'/addTask',
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path:'/myTask',
                element:<PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path:'/completeTask',
                element:<PrivateRoute><CompleteTask></CompleteTask></PrivateRoute>
            },
            {
                path:'/update/:id',
                element:<PrivateRoute><UpdatePage></UpdatePage></PrivateRoute>,
                loader:({params})=> fetch(`https://y-six-amber.vercel.app/update/${params.id}`)
            }
           
        ]
    },

    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/register',
        element:<Register></Register>
    }
])