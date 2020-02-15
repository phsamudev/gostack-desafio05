import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Owner,
  Loading,
  IssueList,
  IssueFilter,
  IssueStateButton,
  Pagination,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoName: decodeURIComponent(this.props.match.params.repository),
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { value: 'all', label: 'Todos', active: true },
      { value: 'open', label: 'Abertos', active: false },
      { value: 'closed', label: 'Fechados', active: false },
    ],
    page: 1,
  };

  async componentDidMount() {
    const { repoName } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
          page: 1,
        },
      }),
    ]);

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  loadIssues = async () => {
    const { repoName, filters, page } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters.find(filter => filter.active).value,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: issues.data });
  };

  handleFilterSelection = async selectedFilterValue => {
    const { filters } = this.state;

    const newFilters = filters.map(filter => {
      return {
        value: filter.value,
        label: filter.label,
        active: filter.value === selectedFilterValue,
      };
    });

    this.setState({ filters: newFilters, page: 1 }, this.loadIssues);
  };

  handlePageSelection = async action => {
    const { page } = this.state;

    const newPage = page + action;

    this.setState({ page: newPage }, this.loadIssues);
  };

  render() {
    const { repository, issues, loading, filters, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter>
          {filters.map(filter => (
            <IssueStateButton
              active={filter.active}
              key={filter.value}
              onClick={() => this.handleFilterSelection(filter.value)}
            >
              {filter.label}
            </IssueStateButton>
          ))}
        </IssueFilter>

        <Pagination page={page}>
          <button
            onClick={() => this.handlePageSelection(-1)}
            disabled={page === 1}
            type="button"
          >
            Anterior
          </button>
          <span>{page}</span>
          <button onClick={() => this.handlePageSelection(1)} type="button">
            Próxima
          </button>
        </Pagination>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
