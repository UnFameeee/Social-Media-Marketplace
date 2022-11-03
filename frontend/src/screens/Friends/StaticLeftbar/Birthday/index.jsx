import { useLayoutEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Birthday() {
  // #region re-render the layout
  const reRenderLayout = useOutletContext();
  useLayoutEffect(() => {
    reRenderLayout();
  }, []);
  // #endregion

  return <div>Birthday</div>;
}
