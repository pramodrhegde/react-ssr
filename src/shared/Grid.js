import React, { useEffect, useRef, useState } from 'react'
import {fetchPopularRepos} from '../shared/Api';

const Grid = props => {
    const [repos, setRepos] = useState(__isBrowser__ ? window.__INITIAL_DATA__ : props.staticContext.data);
    const [isLoading, setIsLoading] = useState(false);
    const serverRef = useRef(__isBrowser__ ? false : true);

    useEffect(() => {
        if(!serverRef.current && repos) {
            serverRef.current = true;
            return;
        }
        serverRef.current = true;
        setIsLoading(true);
        fetchPopularRepos(props.match.params.id || '').then(data => {
            setIsLoading(false);
            setRepos(data);
        }).catch(() => {
            setIsLoading(false);
        });
    }, [props.match.params.id])

    if(isLoading) return 'Loading...';
    if(!repos) return null;
    return (
        <ul style={{display: 'flex', flexWrap: 'wrap'}}>
          {repos.map(({ name, owner, stargazers_count, html_url }) => (
            <li key={name} style={{margin: 30}}>
              <ul>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
        </ul>
      )
}

export default Grid