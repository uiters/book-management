//@ts-ignore
import {Switch, Route} from 'react-router-dom'
import Home from '../pages/Home/Home';

const HomeRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home/>}></Route>
        </Switch>
    )
}

export default HomeRoutes;