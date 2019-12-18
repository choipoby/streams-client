import _ from "lodash";
import React from "react";
import { fetchStream, editStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValue => {
    console.log(formValue);
    this.props.editStream(this.props.match.params.id, formValue);
  };

  render() {
    if (!this.props.stream) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/*this.props.stream has title and description for Field name in StreamForm */}
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        ></StreamForm>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
