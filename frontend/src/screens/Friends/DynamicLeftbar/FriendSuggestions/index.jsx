import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import { LeftbarFriendSuggest } from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { addFriendSaga } from '../../../../redux/friend/friendSlice';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import { getAllSuggestions } from '../../../../redux/friend/friendAPI';
import '../index.css';

export default function FriendSuggestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  const [listAdded, setListAdded] = useState([]);
  const [listRemoved, setListRemoved] = useState([]);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const friendSuggestions = useSelector(
    (state) => state.friends?.getSuggestion?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  // call get all friend suggestions once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllSuggestions(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  // view profile details
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      window.scroll(0, 0);
      if (!Helper.isNullOrEmpty(queryParams)) {
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id: queryParams,
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
          listClassname: 'friend-list ', //suggestions - add this class when only have 1 button
        },
        before: (
          <LeftbarTitle
            title="Friend Suggestions"
            subTitle="People You May Know"
          />
        ),
        leftBarList: friendSuggestions?.data?.map((x) => {
          var profileChecked =
            !Helper.isNullOrEmpty(queryParams) &&
            x.profile_id === profileData?.profile_id;

          return Helper.checkValueExistInArray(
            listRemoved,
            x.profile_id
          )
            ? {}
            : {
                left: {
                  url: x.avatar,
                  name: x.profile_name,
                },
                middle: (
                  <LeftbarFriendSuggest
                    listAdded={listAdded}
                    profile={x}
                    firstButtonConfig={{
                      onClick: (e) => {
                        e.stopPropagation();
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
                      },
                    }}
                    secondButtonConfig={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setListRemoved((old) => [
                          ...old,
                          x.profile_id,
                        ]);
                      },
                    }}
                    hiddenButtonConfig={{
                      onClick: (e) => {
                        e.stopPropagation();
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
                      },
                    }}
                  />
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
        friendSuggestions?.data.some(
          (e) => e.profile_id.toString() === queryParams.toString()
        ) && <UserProfile action={setListAdded} actionList={listAdded} />}
    </TwoColumns>
  );
}
