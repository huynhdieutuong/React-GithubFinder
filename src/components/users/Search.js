import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: ""
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  onSubmit = e => {
    const { text } = this.state;
    const { searchUsers, setAlert } = this.props;
    e.preventDefault();
    if (text === "") {
      return setAlert("Please enter something", "light");
    }
    searchUsers(text);
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    const { clearUsers, showClear } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            onChange={this.onChange}
            value={text}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
