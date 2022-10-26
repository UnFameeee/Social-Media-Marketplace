import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Birthday() {
  // #region re-render the layout
  const reRenderLayout = useOutletContext();
  useEffect(() => {
    reRenderLayout();
  }, []);
  // #endregion

  return <div>Birthday</div>;
}
