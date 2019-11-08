import React, { Component } from 'react';
import { connect } from "react-redux";
import { deselectRecord } from '../actions';
import { Link } from 'react-router-dom';
import { addToCart, selectRecord } from '../actions';

class RecordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage() {
        this.setState({
            message: '\u2713\u2713\u2713'
        });

        setTimeout(() => {
            this.setState({
                message: ''
            })
        }, 1000);
    }

    render() {
        //if no selectedRecord exists, get it from this:
        if (!this.props.selectedRecord) {
            const record = this.props.records.find(record => Number(record.id) === Number(this.props.match.params.id));
            if (record) {
                this.props.selectRecord(record);
            }
        }

        return (
            <div>
                {this.props.selectedRecord ?
                    <div>
                        <p className="back-button" onClick={this.props.deselectRecord}>
                            <Link to="/"> &lt;- Back to Store</Link>
                        </p>
                        <div className="record-page">
                            <img src={this.props.selectedRecord.image} alt="Vinyl Record" />
                            <div className="record-page-details">
                                <p className="details-heading">{this.props.selectedRecord.artist} - {this.props.selectedRecord.album}</p>
                                <p className="details-price">${this.props.selectedRecord.price}</p>
                                <p className="details-description">{this.props.selectedRecord.description}</p>
                                <button onClick={() => { this.displayMessage(); this.props.addToCart(this.props.selectedRecord); }}>Add to Cart</button>
                                <span>{this.state.message}</span>
                            </div>
                        </div>
                    </div> : <h1 className="record-page-error">Record does not exist!</h1>}

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
        deselectRecord: () => dispatch(deselectRecord()),
        addToCart: (data) => dispatch(addToCart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordPage);