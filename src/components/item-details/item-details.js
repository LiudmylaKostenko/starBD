import React, { Component } from 'react';
import './item-details.scss';
import SwapiService from "../services/swapi-service";
import ErrorButton from "../error-button";


export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    render() {

        const { item, image } = this.state;

        if (!item) {
            return <span>Select a person from a list</span>;
        }

        const { name } = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src = {image}
                     alt="item"/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {/*{ this.props.children }*/}
                        {
                            React.Children.map(this.props.children, (child) => {
                              return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        )
    }
}
