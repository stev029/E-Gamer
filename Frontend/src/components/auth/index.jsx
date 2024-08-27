import { useLocation } from "react-router-dom"
import SignIn from "./login.jsx"
import Register from "./register.jsx";

function Auth(){
    const location = useLocation();
    const { pathname } = location
    var AuthPage = SignIn

    if (pathname == '/register') {
        AuthPage = Register
    }

    return (
        <div className="bg-slate-100 h-screen flex items-center justify-center">
            <AuthPage/>
        </div>
    )
}



export default Auth