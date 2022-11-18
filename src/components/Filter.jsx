import { Component } from 'react';
import PropTypes from 'prop-types';

export class Filter extends Component {
  state = {
    filter: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.onChangeFilter(this.state.filter);
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <label>
        Find contacts by name
        <br />
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};
