import { Fragment, useState, useEffect, useCallback } from 'react';
import { useFetchPostsQuery } from '../../api';
import { Link } from 'react-router-dom';
import { Loading } from '../../components';

import './styles.css';

export const List = () => {
  const { data: allPosts = [], isLoading, isFetching } = useFetchPostsQuery(null);
  const [visiblePosts, setVisiblePosts] = useState<PostEntry[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const postRowHeight = 50;

  const loadMorePosts = useCallback(() => {
    const additionalPostsCount = 5;
    const morePosts = allPosts.slice(nextIndex, nextIndex + additionalPostsCount);
    setVisiblePosts((prevPosts) => [...prevPosts, ...morePosts]);
    setNextIndex(nextIndex + additionalPostsCount);
  }, [nextIndex, allPosts]);

  const initializePosts = useCallback(() => {
    const screenHeight = window.innerHeight;
    const initialPostCount = Math.ceil(screenHeight / postRowHeight);
    setVisiblePosts(allPosts.slice(0, initialPostCount));
    setNextIndex(initialPostCount);
  }, [allPosts, postRowHeight]);

  useEffect(() => {
    if (allPosts.length > 0) {
      initializePosts();
    }
  }, [allPosts, initializePosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Fragment>
      <h1>List of Posts</h1>
      <table className='posts-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visiblePosts.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.title}</td>
              <td>{entry.body}</td>
              <td>
                <Link to={`/posts/${entry.id}`} className='view-button'>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
