import { useLayoutEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Skeleton } from '@mui/material';
import { searchProfile } from '../../redux/apiRequest';
import TwoColumns from '../../components/Layout/TwoColumns';
import { Helper } from '../../utils/Helper';
import LeftbarTitle from '../Friends/DynamicLeftbar/LeftbarTitle';
import UserProfile from '../UserProfile/UserProfile';
import { getProfileSaga } from '../../redux/profile/profileSlice';
import { localStorageService } from '../../services/localStorageService';
import { useMemo } from 'react';

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data,
    shallowEqual
  );
  const profileSearch = useSelector(
    (state) => state.profile?.profileSearch?.data,
    shallowEqual
  );
  const isFetchingProfileSearch = useSelector(
    (state) => state.profile?.profileSearch?.isFetching,
    shallowEqual
  );
  const isFetchingProfileDetail = useSelector(
    (state) => state.profile?.profileDetails?.isFetching,
    shallowEqual
  );

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  var profileList = useMemo(() => {
    return profileSearch;
  }, [profileSearch]);

  var isLoadingProfileSearch = useMemo(() => {
    var result = false;
    if (isFetchingProfileSearch) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingProfileSearch]);

  var checkId = useMemo(() => {
    return Helper.isNullOrEmpty(queryParams.id);
  }, [queryParams.id]);

  var checkValue = useMemo(() => {
    return Helper.isNullOrEmpty(queryParams.value);
  }, [queryParams.value]);

  var checkQueryParam = useMemo(() => {
    return Helper.isEmptyObject(queryParams, true);
  }, [queryParams]);

  // loading profile details
  var isLoadingProfileDetail = useMemo(() => {
    var result = false;
    if (isFetchingProfileDetail) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingProfileDetail]);

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!checkValue) {
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
      if (!checkId) {
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
              isLoadingProfileSearch
                ? null
                : !checkQueryParam
                ? Helper.isMultiple(
                    'Result',
                    profileList?.page?.totalElement,
                    `Can't find ${queryParams.value}`
                  )
                : `Can't find any profile`
            }
            backTo="/"
          />
        ),
        after: isLoadingProfileSearch && (
          <div className="friend-left-bar-skeleton">
            {[...Array(8)].map((item, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={360}
                height={96}
              />
            ))}
          </div>
        ),
        leftBarList: isLoadingProfileSearch
          ? null
          : !checkQueryParam
          ? profileList?.data?.map((x) => {
              var profileChecked =
                !checkId && x.profile_id === profileData?.profile_id;

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
                selected: !isLoadingProfileDetail && profileChecked,
                disabled: isLoadingProfileDetail
                  ? true
                  : profileChecked,
              };
            })
          : null,
        leftBarColor: 'white',
      }}
    >
      {!checkId && <UserProfile />}
    </TwoColumns>
  );
}
