export default function MiddleHr({ width = '95%' }) {
  return (
    <hr
      style={{
        width: width,
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
