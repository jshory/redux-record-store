import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { selectRecord, addToCart } from '../actions';

class RecordStore extends Component {
    constructor(props) {
        super(props);

        var messageArray = new Array(this.props.records.length);

        this.state = {
            messages: messageArray
        };

        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage(id) {
        let msgs = [...this.state.messages];
        let msg = { ...msgs[id] };
        msg = '\u2713\u2713\u2713';
        msgs[id] = msg;

        this.setState({
            messages: msgs
        });

        setTimeout(() => {
            msgs[id] = '';
            this.setState({
                messages: msgs
            })
        }, 1000);
    }

    render() {
        return (
            <div className="record-store">
                <div className="container">
                    {this.props.records.map((record, index) => {
                        return (<div className="record-col" key={index}>
                            <Link to={`/records/${record.id}`} onClick={() => { this.props.selectRecord(record) }}>
                                <div className="record-thumb">
                                    <img src={record.image} alt="Vinyl Record" />
                                </div>
                                <div className="record-details">
                                    <h3>{record.album}</h3>
                                    <p>{record.artist}</p>
                                    <p>${record.price}</p>
                                </div>
                            </Link>
                            <div className="cart-message">
                                <span>{this.state.messages[index]}</span>
                            </div>
                            <br />
                            <button onClick={() => { this.displayMessage(record.id - 1); this.props.addToCart(record); }}>Add to Cart</button>
                        </div>)

                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        records: state.records.recordStore,
        selectedRecord: state.records.selectedRecord
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectRecord: (data) => dispatch(selectRecord(data)),
        addToCart: (data) => dispatch(addToCart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordStore);