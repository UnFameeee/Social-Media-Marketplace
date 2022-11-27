import { useLayoutEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchProfile } from '../../redux/apiRequest';
import TwoColumns from '../../components/Layout/TwoColumns';
import { Helper } from '../../utils/Helper';
import LeftbarTitle from '../Friends/DynamicLeftbar/LeftbarTitle';
import UserProfile from '../UserProfile/UserProfile';
import { getProfileSaga } from '../../redux/profile/profileSlice';
import { localStorageService } from '../../services/localStorageService';

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const profiles = useSelector(
    (state) => state.profile?.profileSearch?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data,
    shallowEqual
  );

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!Helper.isNullOrEmpty(queryParams.value)) {
        searchProfile(
          accessToken,
          refreshToken,
          queryParams.value,
          dispatch
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [queryParams.value]);

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!Helper.isNullOrEmpty(queryParams.id)) {
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id: queryParams.id,
            callRefreshProfile: true,
            dispatch,
          })
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [queryParams.id]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list',
        },
        before: (
          <LeftbarTitle
            title="Search results"
            subTitle={
              !Helper.isEmptyObject(queryParams, true)
                ? Helper.isMultiple(
                    'Result',
                    profiles?.page?.totalElement,
                    `Can't find ${queryParams.value}`
                  )
                : `Can't find any profile`
            }
            backTo="/"
          />
        ),
        leftBarList: !Helper.isEmptyObject(queryParams, true)
          ? profiles?.data?.map((x) => {
              var profileChecked =
                !Helper.isNullOrEmpty(queryParams.id) &&
                x.profile_id === profileData?.profile_id;

              return {
                left: {
                  url: x.avatar,
                  name: x.profile_name,
                },
                middle: (
                  <div className="px-[0.8rem]">{x.profile_name}</div>
                ),
                onClick: () => {
                  localStorageService.addToArray('recentSearch', x);
                  navigate(
                    `?value=${queryParams.value}&id=${x.profile_id}`
                  );
                },
                selected: profileChecked,
                disabled: profileChecked,
              };
            })
          : null,
        leftBarColor: 'white',
      }}
    >
      {!Helper.isNullOrEmpty(queryParams.id) && <UserProfile />}
    </TwoColumns>
  );
}
