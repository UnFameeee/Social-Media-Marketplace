import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchProfile } from '../../redux/apiRequest';
import TwoColumns from '../../components/Layout/TwoColumns';
import { Helper } from '../../utils/Helper';

export default function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/value=/gi, ''); //remove all the "id=" with this regex

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!Helper.isNullOrEmpty(queryParams)) {
        searchProfile(accessToken, refreshToken, queryParams, dispatch);
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [location]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {},
        // before: (
        //   <LeftbarTitle
        //     title="Friend Requests"
        //     subTitle={Helper.isMultiple(
        //       'Friend Request',
        //       friendRequests?.page?.totalElement,
        //       'You Have No Friend Requests'
        //     )}
        //   />
        // ),
        // leftBarList: friendRequests?.data?.map((x) => {
        //   let id = x.profile_id;
        //   return {
        //     left: {
        //       url: x.avatar,
        //       name: x.profile_name,
        //     },
        //     middle: (
        //       <LeftbarMiddleItem
        //         profileName={x.profile_name}
        //         firstButtonConfig={{
        //           onClick: (e) => {
        //             e.stopPropagation();
        //             dispatch(
        //               acceptSaga({
        //                 accessToken,
        //                 refreshToken,
        //                 id,
        //                 dispatch,
        //               })
        //             );
        //             navigate('');
        //           },
        //         }}
        //         secondButtonConfig={{
        //           onClick: (e) => {
        //             e.stopPropagation();
        //             dispatch(
        //               denySaga({
        //                 accessToken,
        //                 refreshToken,
        //                 id,
        //                 dispatch,
        //               })
        //             );
        //             navigate('');
        //           },
        //         }}
        //       />
        //     ),
        //     onClick: () => {
        //       navigate(`?id=${id}`);
        //     },
        //     selected:
        //       !Helper.isNullOrEmpty(queryParams) &&
        //       id === profileData?.profile_id,
        //     disabled:
        //       !Helper.isNullOrEmpty(queryParams) &&
        //       id === profileData?.profile_id,
        //   };
        // }),
        leftBarColor: 'white',
      }}
    ></TwoColumns>
  );
}
