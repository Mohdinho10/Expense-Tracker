import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color="#62748e" />
    </div>
  );
}

export default Loader;
