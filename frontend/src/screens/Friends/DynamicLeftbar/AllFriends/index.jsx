import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import { getAllFriendForMainUser } from '../../../../redux/friend/friendAPI';
import { LeftbarAllFriend } from '../LeftbarMiddleItem';
import {
  addFriendSaga,
  unfriendSaga,
} from '../../../../redux/friend/friendSlice';
import '../index.css';

export default function AllFriends() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  const [openOptions, setOpenOptions] = useState('');
  const [listRemoved, setListRemoved] = useState([]);
  const [listAdded, setListAdded] = useState([]);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const allFriends = useSelector(
    (state) => state.friends?.getAllForMainUser?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  var mainId = userData?.profile_id;

  // call get all friend once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriendForMainUser(
        accessToken,
        refreshToken,
        mainId,
        dispatch
      );
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  // view profile details
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!Helper.isNullOrEmpty(queryParams)) {
        var id = queryParams;
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id,
            callRefreshProfile: true,
            dispatch,
          })
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [location]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list all-friend',
        },
        before: (
          <LeftbarTitle
            title="All Friends"
            subTitle={Helper.isMultiple(
              'Friend',
              allFriends?.page?.totalElement,
              'You need to get some friends!'
            )}
          />
        ),
        leftBarList: allFriends?.data?.map((x) => {
          var profileChecked =
            !Helper.isNullOrEmpty(queryParams) &&
            x.profile_id === profileData?.profile_id;

          return {
            left: {
              url: x.avatar,
              name: x.profile_name,
            },
            middle: (
              <ClickAwayListener
                onClickAway={(e) => {
                  e.stopPropagation();
                  if (openOptions) {
                    setOpenOptions('');
                  }
                }}
              >
                <div>
                  <LeftbarAllFriend
                    profile={x}
                    openOptions={[openOptions, setOpenOptions]}
                    listUnfriend={listRemoved}
                    listAdded={listAdded}
                    handleUnfriend={() => {
                      dispatch(
                        unfriendSaga({
                          accessToken,
                          refreshToken,
                          id: x.profile_id,
                          callRefreshProfile: profileChecked,
                          dispatch,
                        })
                      );
                      setListRemoved(old => [...old, x.profile_id])
                    }}
                    handleAddFriend={() => {
                      dispatch(
                        addFriendSaga({
                          accessToken,
                          refreshToken,
                          id: x.profile_id,
                          callRefreshProfile: profileChecked,
                          dispatch,
                        })
                      );
                      setListAdded((old) => [...old, x.profile_id]);
                    }}
                    handleCancelRequest={() => {
                      dispatch(
                        addFriendSaga({
                          accessToken,
                          refreshToken,
                          id: x.profile_id,
                          callRefreshProfile: profileChecked,
                          dispatch,
                        })
                      );
                      var filter = listAdded.filter(
                        (e) => e !== x.profile_id
                      );
                      setListAdded(filter);
                    }}
                  />
                </div>
              </ClickAwayListener>
            ),
            onClick: () => {
              navigate(`?id=${x.profile_id}`);
            },
            selected: profileChecked,
            disabled: profileChecked,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {!Helper.isNullOrEmpty(queryParams) &&
        allFriends?.data.some(
          (e) => e.profile_id.toString() === queryParams.toString()
        ) && <UserProfile action={[setListRemoved, setListAdded]} actionList={[listRemoved, listAdded]} />}
    </TwoColumns>
  );
}
