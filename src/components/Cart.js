import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuantity, removeQuantity, removeFromCart } from '../actions';

class Cart extends Component {
    render() {
        const qtys = Object.entries(this.props.quantities);

        //calculate cart total
        var total = 0;
        this.props.cart.map((record) => {
            return qtys.map((qty) => {
                return (record.id === Number(qty[0])) ? total += (record.price * qty[1]) : null;
            })
        });
        total = total.toFixed(2);

        return (
            <div className="cart">
                <div className="container">
                    {total > 0 ?
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.cart.map((record, index) => {
                                    return <tr className="cart-line" key={index}>
                                        <td><img src={record.image} alt="record"></img></td>
                                        <td>{record.artist} - {record.album}</td>
                                        <td>

                                            {qtys.map((qty) => { return Number(qty[0]) === record.id ? qty[1] : null })}
                                            <br />
                                            <button className="cart-qty-button" onClick={() => { this.props.addQuantity(record) }}>+</button>
                                            {qtys.map((qty, index) => {
                                                return <span key={index}>
                                                    {Number(qty[0]) === record.id && Number(qty[1]) > 1 ? <button className="cart-qty-button" onClick={() => { this.props.removeQuantity(record) }}>-</button> : ''}
                                                </span>
                                            })}

                                        </td>
                                        <td>${record.price}</td>
                                        <td><button className="cart-remove-button" onClick={() => { this.props.removeFromCart(record) }}>Remove From Cart</button></td>
                                    </tr>
                                })}
                                <tr className="cart-total-line">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>Total: ${total}</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table> : <h1>Your Cart is Empty!</h1>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cartItems,
        quantities: state.cart.cartQuantities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuantity: (data) => dispatch(addQuantity(data)),
        removeQuantity: (data) => dispatch(removeQuantity(data)),
        removeFromCart: (data) => dispatch(removeFromCart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);