import { BeatLoader } from "react-spinners";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#007BFF" loading={true} size={10} />
    </div>
  );
};

export default CustomLoader;
