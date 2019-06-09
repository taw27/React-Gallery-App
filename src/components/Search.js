import React, {Component} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            searchValue: ""
        }
        
        this.handleSearch = props.handleSearch;
    }

    handleChange = (event) => this.setState({searchValue: event.target.value});

    onSearchSubmit = (event) => {
        event.preventDefault();
        this.handleSearch(this.state.searchValue);
        this.props.history.push(`/search/${this.state.searchValue}`);
    };

    render(){
        return (
            <form className="search-form" onSubmit={this.onSearchSubmit}>
                <input type="search" name="search" placeholder="Search" onChange={this.handleChange} required/>
                <button type="submit" className="search-button" onSubmit={() => this.handleSearch(this.state.searchValue)}>
                <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                </button>
            </form>
        );
    }
}

Search.propTypes = {
    handleSearch: PropTypes.func,
    history: PropTypes.object
}

export default withRouter(Search);