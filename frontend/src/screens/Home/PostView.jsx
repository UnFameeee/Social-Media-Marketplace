import { useLayoutEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ThreeColumns from '../../components/Layout/ThreeColumns';
import CardPost from '../../components/Card/CardPost';
import { getPostById } from '../../redux/apiRequest';

export default function PostView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  // #region redux variables
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
    (state) => state.post?.getById?.post?.results,
    shallowEqual
  );
  const isFetchingPostById = useSelector(
    (state) => state.post?.getById?.isFetching
  );
  // #endregion

  const isLoadingPostById = useMemo(() => {
    var result = false;
    if (isFetchingPostById) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingPostById]);

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
      {isLoadingPostById ? (
        <div className="flex flex-col gap-[1rem]">
          <div className=" flex items-center gap-[1rem] pl-[1rem] w-[70rem]">
            <div>
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className=" flex-1">
              <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            </div>
          </div>
          <Skeleton
            variant="rounded"
            sx={{ width: '70rem', height: '40rem' }}
          />
        </div>
      ) : (
        post && (
          <CardPost
            postData={post}
            key={queryParams}
            profile={userData}
          />
        )
      )}
    </ThreeColumns>
  );
}
