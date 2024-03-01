import { BeatLoader } from "react-spinners";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="hsl(47.9 95.8% 53.1%)" loading={true} size={10} />
    </div>
  );
};

export default CustomLoader;
