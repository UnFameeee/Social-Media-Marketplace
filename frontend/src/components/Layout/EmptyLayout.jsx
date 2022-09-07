

export default function EmptyLayout(props) {
  return (
    <div className="pt-[5.5rem] flex w-full">
      <div className="px-[18%] pt-6 bg-greyf1 w-screen">
        {props.children}
      </div>
    </div>
  );
}
