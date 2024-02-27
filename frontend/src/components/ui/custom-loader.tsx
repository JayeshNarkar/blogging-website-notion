import { BeatLoader } from "react-spinners";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#36d7b7" loading={true} size={10} />
    </div>
  );
};

export default CustomLoader;
