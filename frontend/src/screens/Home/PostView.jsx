import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreeColumns from '../../components/Layout/ThreeColumns';
import CardPost from '../../components/Card/CardPost';
import { getPostById } from '../../redux/apiRequest';

export default function PostView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData.profile
  );
  const post = useSelector(
    (state) => state.post?.getById?.post?.results
  );

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getPostById(accessToken, refreshToken, queryParams, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, [queryParams]);

  return (
    <ThreeColumns className="post-view">
      <CardPost
        postData={post}
        key={queryParams}
        profile={userData}
      />
    </ThreeColumns>
  );
}
