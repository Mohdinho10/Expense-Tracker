import { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

function ProfilePhotoSelector({ profilePic, setProfilePic }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (profilePic && typeof profilePic === "object") {
      const objectUrl = URL.createObjectURL(profilePic);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Clean up
    }
  }, [profilePic]);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const removeImageHandler = () => {
    setProfilePic(null);
    setPreviewUrl(null);
  };

  const chooseFileHandler = () => {
    inputRef.current.click();
  };

  return (
    <div className="relative mb-6 flex justify-center">
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={imageChangeHandler}
        accept="image/*"
      />

      {!profilePic ? (
        <div className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 shadow-md transition hover:scale-105">
          <LuUser className="text-primary text-4xl" />
          <button
            type="button"
            onClick={chooseFileHandler}
            className="bg-primary hover:bg-primary/90 absolute right-0 bottom-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition"
            title="Upload Photo"
          >
            <LuUpload size={18} />
          </button>
        </div>
      ) : (
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105">
          <img
            src={previewUrl}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
          <button
            type="button"
            onClick={removeImageHandler}
            className="absolute right-0 bottom-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
            title="Remove Photo"
          >
            <LuTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
