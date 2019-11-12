import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { selectRecord, addToCart } from '../actions';

class RecordStore extends Component {
    constructor(props) {
        super(props);

        var messageArray = new Array(this.props.records.length);

        this.state = {
            sortMethod: 'album',
            messages: messageArray
        };

        this.handleChange = this.handleChange.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.sortRecords = this.sortRecords.bind(this);
    }

    handleChange(event) {
        this.setState({ sortMethod: event.target.value });
    }

    displayMessage(id) {
        console.log(id);
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

    sortRecords(sortMethod) {
        if (sortMethod === 'album') {
            this.props.records.sort((a, b) => a.album.localeCompare(b.album));
        } else if (sortMethod === 'artist') {
            this.props.records.sort((a, b) => a.artist.localeCompare(b.artist));
        } else if (sortMethod === 'price-low-high') {
            this.props.records.sort((a, b) => a.price.localeCompare(b.price));
        } else if (sortMethod === 'price-high-low') {
            this.props.records.sort((a, b) => a.price.localeCompare(b.price));
            this.props.records.reverse();
        }
    }

    render() {
        this.sortRecords(this.state.sortMethod);

        return (
            <div className="record-store">
                <h2>Sort By:</h2>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="album">Album</option>
                    <option value="artist">Artist</option>
                    <option value="price-low-high">Price: Low - High</option>
                    <option value="price-high-low">Price: High - Low</option>
                </select>
                <br />
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
                            <button onClick={() => { this.displayMessage(index); this.props.addToCart(record); }}>Add to Cart</button>
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