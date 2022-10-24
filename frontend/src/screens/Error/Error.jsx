import { useNavigate } from 'react-router-dom';
import Face from '../../components/LookingFace/Face';
import MUI from '../../components/MUI';

export default function Error(props) {
  const navigate = useNavigate();
  let { status = '404', title } = props;

  if (!title) {
    switch (status) {
      case '404':
        title = 'Sorry, the page you visited does not exist.';
        break;
      case '403':
        title = 'Sorry, you are not authorized to access this page.';
        break;
      case '500':
        title = 'Sorry, something went wrong.';
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Face left="50%" top="25%" />
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '10rem' }}>{status}</h1>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '2.2rem' }}>
          {title}
        </h2>
        <MUI.Button
          name="Go back"
          onClick={() => navigate(-1)}
          style={{ width: '144px' }}
        />
        <MUI.Button
          style={{ marginLeft: '14px' }}
          name="Return Home"
          onClick={() => navigate('/')}
        />
      </div>
    </>
  );
}
