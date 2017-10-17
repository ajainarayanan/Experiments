import PropTypes from "prop-types";
import React from "react";
import { cardLayoutStyles } from "../../Styles/Theme";
import HRDate from "../HRDate";
import { Link } from "react-router-dom";
import JournalMeta from "../JournalMeta";

const Journal = ({ info }) => {
  return (
    <Link className={`${cardLayoutStyles}`} to={`/journals/${info.id}`}>
      <div>
        {info.description ? (
          <h5>{info.description}</h5>
        ) : (
          <h5>No Info Available</h5>
        )}
      </div>
      <div>
        <JournalMeta comments_count={info.comments} stars_count={info.stars} />
        <HRDate date={info.created_at} />
      </div>
    </Link>
  );
};

Journal.propTypes = {
  info: PropTypes.object
};

export default Journal;
