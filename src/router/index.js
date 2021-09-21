import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Details from '../pages/Details'
import Edit from '../pages/Edit'
import Chart from '../pages/Chart'
import Guard from './Guard'

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Guard path="/products" component={Products} />

            <Guard path="/details/:id" component={Details} />

            <Guard path="/edit/:id" component={Edit} />

            <Guard path="/cart" component={Chart} />

            <Route>
                Not Found
            </Route>
        </Switch>
    )
}

export default Router