import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TwoColumns from '../../components/Layout/TwoColumns';
import { staticLeftbar } from '../../common/layout/friendLeftbar';
import { Helper } from '../../utils/Helper';

export function StaticLeftbarLayout() {
  const [reRender, setReRender] = useState(true);

  return (
    <TwoColumns
      leftBarConfig={{
        leftBarList: staticLeftbar.map((x) => {
          if (x.middle == 'Home') {
            x['selected'] = Helper.checkURL('friends', {}, true);
            x['disabled'] = Helper.checkURL('friends', {}, true);
          }
          else if (x.middle == 'Birthdays') {
            x['selected'] = Helper.checkURL('birthdays', {}, true);
            x['disabled'] = Helper.checkURL('birthdays', {}, true);            
          }
          return x
        }),
        leftBarColor: 'white',
      }}
    >
      <Outlet context={() => setReRender(!reRender)} />
    </TwoColumns>
  );
}

export function DynamicLeftbarLayout() {
  return <Outlet />;
}
