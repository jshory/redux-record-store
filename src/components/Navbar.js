import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Cart from './Cart';
import RecordStore from './RecordStore';
import RecordPage from './RecordPage';

class Navbar extends Component {
    render() {
        const qtys = Object.entries(this.props.quantities);

        //calculate number of cart items
        var cartNumber = 0;
        this.props.cart.map((record) => {
            return qtys.map((qty) => {
                return (record.id === Number(qty[0])) ? cartNumber += qty[1] : null;
            })
        });

        return (
            <Router>
                <div className="navbar">
                    <nav>
                        <ul>
                            <li className="home-link">
                                <Link to="/">Redux Record Store</Link>
                            </li>
                            <li className="cart-link">
                                <Link to="/cart">Cart{cartNumber > 0 ? ': ' + cartNumber : ''}</Link>
                            </li>
                        </ul>
                    </nav>


                    <Switch>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/records/:id?" component={RecordPage} />
                        <Route path="/">
                            <RecordStore />
                        </Route>
                    </Switch>
                </div>
            </Router >

        )
    }
}

function mapStateToProps(state) {
    return {
        selectedRecord: state.records.selectedRecord,
        cart: state.cart.cartItems,
        quantities: state.cart.cartQuantities
    }
}

// export default Navbar;
export default connect(mapStateToProps)(Navbar);