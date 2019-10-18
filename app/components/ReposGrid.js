import React from 'react';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

const ReposGrid = ({ repos }) => {
  console.log(repos, 'from grid');
  return (
    <div>
      <ul className="grid space-around">
        {repos.map((item, index) => {
          const { id, name, owner, html_url, stargazers_count, forks, open_issues, } = item;
          const { login, avatar_url } = owner;

          return (
            <li key={id} className="card bg-light" >
              <h4 className="header-lg center-text">#{index + 1}</h4>
              <img src={avatar_url} alt={`Avatar for ${login}`} className="avatar" />
              <h2 className="center-text"><a href={html_url} className="link">{login}</a></h2>

              <ul className="card-list">
                <li><FaUser color="rgb(255,191,116)" size="22" />
                  <a href={`https://github.com/${login}`} className="link">{login}</a>
                </li>
                <li><FaStar color="rgb(255,215,0)" size="22" />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li><FaCodeBranch color="rgb(129,195,245)" size="22" />
                  {forks.toLocaleString()} forks
                </li>
                <li><FaExclamationTriangle color="rgb(241,138,147)" size="22" />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </li>
          )

        })}
      </ul>
    </div>
  )
}

export default ReposGrid;
