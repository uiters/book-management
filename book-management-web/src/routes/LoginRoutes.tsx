//@ts-ignore
import {Switch, Route} from 'react-router-dom'
import Login from '../pages/Login/Login'

const LoginRoutes = () => {
    return (
        <Switch>
            <Route exact path="/login" render={() => <Login></Login>}></Route>
        </Switch>
    )
}

export default LoginRoutes;