import PropTypes from "prop-types";
import React from "react";
import Journal from "../Journal";
import { connect } from "react-redux";
import { cardLayoutParent } from "../../Styles/Theme";
import { WithLoadingIndicator } from "../LoadingIndicator";

const JournalsList = ({ journals, loading }) => {
  return (
    <WithLoadingIndicator condition={loading}>
      <div className={`${cardLayoutParent}`}>
        {journals.length
          ? journals.map(journal => {
              return <Journal info={journal} key={journal.id} />;
            })
          : null}
      </div>
    </WithLoadingIndicator>
  );
};
JournalsList.propTypes = {
  journals: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    journals: state.journals.list,
    loading: state.journals.loading
  };
};

export default connect(mapStateToProps)(JournalsList);
