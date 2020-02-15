import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #7159c1;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  margin: 12px 0;
  justify-content: center;
`;

export const IssueStateButton = styled.button.attrs(() => ({
  type: 'submit',
}))`
  border: none;
  border-radius: 4px;
  background-color: ${props => (props.active ? '#7159c1' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#7159c1')};
  padding: 4px 6px;
  transition: all 200ms ease-in-out;
  margin: 0 6px;

  &:hover {
    background-color: #7159c1;
    color: #fff;
  }
`;

export const Pagination = styled.div`
  display: flex;
  margin: 12px 0;
  justify-content: center;
  align-items: center;

  span {
    padding: 3px 6px;
    border: 0.5px solid #7159c1;
    font-weight: bold;
    border-radius: 4px;
  }

  button {
    border: none;
    background-color: #fff;
    color: #7159c1;
    padding: 4px 6px;
    transition: all 200ms ease-in-out;
    margin: 0 6px;

    &:hover:not(:disabled) {
      opacity: 0.7;
    }

    &:first-of-type {
      visibility: ${props => (props.page === 1 ? 'hidden' : 'visible')};
    }
  }
`;
