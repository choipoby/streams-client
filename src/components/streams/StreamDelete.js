import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    {
      /* Route automaticaly pass match as props */
    }
    this.props.fetchStream(this.props.match.params.id);
  }

  onClick = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  actions = () => {
    return (
      <React.Fragment>
        <button className='ui button negative' onClick={this.onClick}>
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  renderContent() {
    if (!this.props.stream) {
      return "are you sure?";
    }
    return `are you sure to delete ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.actions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
