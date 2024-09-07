interface HuntViewProps {
  id: string;
}

const OneHuntView = ({ id }: HuntViewProps) => {
  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <div className="container">Hunt {id}</div>
    </div>
  );
};

export default OneHuntView;
