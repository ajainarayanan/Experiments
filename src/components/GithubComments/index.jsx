import PropTypes from "prop-types";
import React, { Component } from "react";
import "whatwg-fetch";
import GithubCommentBox from "../GithubCommentBox";
import HRDate from "../HRDate";
import { colors } from "../../Styles/Main/variables";
import IconSVGWrapper from "../IconSVG";
import { WithLoadingIndicator } from "../LoadingIndicator";
import styled from 'styled-components';

const CommentsWrapper = styled.div`
  margin: 20px 0
`;
const EmptyComment = styled.h5`
  text-align: center;
  border: 0;
`;
const Comment = styled.div`
  display: flex;
  margin: 0 0 5px 0;
  border-bottom: 1px solid;
  padding-bottom: 10px;
`;
const CommentBody = styled.div`
  padding: 0 10px 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between
  background: ${colors.lightenPurple};
  margin-left: 10px;
  position: relative;
  color: white;
  width: 100%;
  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    left: -10px;
    top: 20px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${colors.lightenPurple}
  }
`;
const ProfilePic = styled.img`
  height: 60px;
  border-radius: 4px;
`;
const TimeWrapper = styled.div`
  color: ${colors.red};
`;
const LoadingIndicator = styled.div`
  height: 100%;
`;
const CommentLoadingIndicator = LoadingIndicator.withComponent(WithLoadingIndicator);

export default class GithubComments extends Component {
  static propTypes = {
    journalId: PropTypes.string
  };
  state = {
    loading: true,
    comments: [],
    id: this.props.journalId
  };
  fetchComments = async () => {
    this.setState({ loading: true });
    let comments = await fetch(
      `/api/journals/${this.props.journalId}/comments`
    ).then(res => res.json());
    comments = comments.body;
    this.setState({ comments, loading: false });
  };

  componentWillMount() {
    this.fetchComments();
  }
  render() {
    return (
      <CommentsWrapper>
        <h3> Comments </h3>
        <CommentLoadingIndicator
          condition={this.state.loading}
        >
          {this.state.comments.length ? (
            this.state.comments.map((comment, i) => (
              <Comment key={i}>
                <a href={comment.user.html_url}>
                  <ProfilePic
                    src={comment.user.avatar_url}
                  />
                </a>
                <CommentBody>
                  <div>{comment.body}</div>
                  <TimeWrapper>
                    <IconSVGWrapper name="icon-clock" />
                    <HRDate date={comment.updated_at} />
                  </TimeWrapper>
                </CommentBody>
              </Comment>
            ))
          ) : (
            <EmptyComment> No Comments </EmptyComment>
          )}
          <GithubCommentBox id={this.state.id} onSubmit={this.fetchComments} />
        </CommentLoadingIndicator>
      </CommentsWrapper>
    );
  }
}
