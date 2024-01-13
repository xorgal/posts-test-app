import { Fragment } from 'react';
import { useFetchPostDetailQuery } from '../../api';
import { useParams, Link } from 'react-router-dom';
import { Loading } from '../../components';
import './styles.css';

export const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isFetching, isLoading, error } = useFetchPostDetailQuery({ id: id ? parseInt(id) : null });

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div className='error-container'>Error loading post. Please try again later.</div>;
  }

  if (!post) {
    return <div className='error-container'>Post not found.</div>;
  }

  return (
    <Fragment>
      <div className='post-detail-container'>
        <h1>Post #{post.id}</h1>
        <h4>{post.title}</h4>
        <div className='post-content'>
          <p>{post.body}</p>
        </div>
        <Link to='/' className='back-button'>
          Back
        </Link>
      </div>
    </Fragment>
  );
};
