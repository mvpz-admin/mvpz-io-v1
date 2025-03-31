import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import TextFeild from "../../Atoms/Inputs/TextFeild";
import TextAreaFeild from "../../Atoms/Inputs/TextareaFeild";
import { useAuthStore } from "../../../store/useAuthStore";
import { callAPI, uploadImageToBackblaze } from "../../../lib/utils";
import { useEditProfileStore } from "../../../store/useGlobalStore";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { BB_BASE_URL } from "../../../utils/global/global";
import { Notification } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const EditProfile = () => {
  const { user, setUser } = useAuthStore((state) => state);
  const { setCloseEditProfile } = useEditProfileStore((state) => state);
  const [profileData, setProfileData] = useState({
    username: "",
    bannerImage: "",
    profileImage: "",
    name: "",
    bio: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    name: "",
  });
  const [selectedBannerImage, setSelectedBannerImage] = useState<File | null>(
    null
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInfo() {
      const response = await callAPI({
        endpoint: `/v1/profiles/${
          user?.role === "Athlete" ? "athlete" : "user"
        }/${user?.username}`,
      });
      setProfileData(response.data);
      setBannerPreview(response.data.bannerImage || "");
      setProfilePreview(response.data.profileImage || "");
    }
    if (user) {
      fetchInfo();
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      username: "",
      name: "",
    };
    let isValid = true;

    if (!profileData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (
    file: File,
    path: string
  ): Promise<string | null> => {
    try {
      // Request a new upload URL and authorization token for each image upload
      const backblazeImage = await callAPI({
        endpoint: "/v1/global/image/uploadBackBlaze",
        method: "GET",
      });

      if (backblazeImage.uploadUrl && backblazeImage.authorizationToken) {
        const uploadUrl = backblazeImage.uploadUrl;
        const authToken = backblazeImage.authorizationToken;

        // Upload the image using the provided URL and token
        const response = await uploadImageToBackblaze(
          file,
          path,
          uploadUrl,
          authToken
        );
        if (response) {
          // Return the public URL of the uploaded image
          return `${BB_BASE_URL}/${path}`;
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
    return null;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    let bannerImageUrl = null;
    if (selectedBannerImage) {
      bannerImageUrl = await uploadImage(
        selectedBannerImage,
        `user-profiles/${process.env.NEXT_PUBLIC_BACKBLAZE_TYPE}/${user?.username}/banner.png`
      );
    }
    let profileImageUrl = null;
    if (selectedProfileImage) {
      profileImageUrl = await uploadImage(
        selectedProfileImage,
        `user-profiles/${process.env.NEXT_PUBLIC_BACKBLAZE_TYPE}/${user?.username}/profile.png`
      );
    }

    let body: any = {
      username: profileData.username,
      name: profileData.name,
      bio: profileData.bio,
    };

    if (bannerImageUrl) {
      body = {
        ...body,
        bannerImage: bannerImageUrl,
      };
    }
    if (profileImageUrl) {
      body.profileImage = profileImageUrl;
    }

    let response = await callAPI({
      endpoint: `/v1/profiles/${user?.username}/update`,
      method: "PUT",
      body: body,
    });

    if (!response.success) {
      notifications.show({
        title: "Error",
        message: response.error,
        color: "red",
      });

      return false;
    }

    setUser({
      ...user,
      ...response.data.user,
    });

    setLoading(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000] "
      onClick={() => setCloseEditProfile()}
    >
      <div
        className="relative md:w-[500px] w-full md:h-[80vh] h-full bg-secondary rounded-xl overflow-y-auto scroller-hidden "
        onClick={(e) => e.stopPropagation()}
      >
        {/* banner image */}
        <div className="relative w-full h-[200px] rounded-xl ">
          <>
            {bannerPreview && (
              <Image
                src={bannerPreview}
                alt="banner"
                fill
                className="object-cover rounded-xl brightness-50"
              />
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <label className="flex justify-center items-center gap-2 cursor-pointer">
                <FaEdit size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </>
        </div>
        {/* data */}
        <div className="relative w-full p-4 -mt-[75px] ">
          <div className="w-[150px] h-[150px] bg-secondary rounded-full p-2 mb-5">
            <div className="relative w-full h-full bg-black rounded-full">
              {profilePreview && (
                <Image
                  src={profilePreview}
                  alt="profile"
                  fill
                  className="object-cover rounded-full brightness-50"
                />
              )}
              {/* edit */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <label className="flex justify-center items-center gap-2 cursor-pointer">
                  <FaEdit size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="relative w-full space-y-4">
            <div className="relative w-full space-y-2">
              <article className="text-[14px] font-inter font-medium">
                Username <span className="text-red-500">*</span>
              </article>
              <TextFeild
                placeholder="Enter Your Username"
                inputStyle={"text-[12px]"}
                maxLength={20}
                value={profileData?.username}
                onChange={(e) => {
                  setProfileData({ ...profileData, username: e.target.value });
                  setErrors({ ...errors, username: "" });
                }}
                error={errors.username}
              />
              <article className="text-[10px] font-inter font-medium opacity-50">
                This will be your public display name.
              </article>
            </div>
            <div className="relative w-full space-y-2">
              <article className="text-[14px] font-inter font-medium">
                Name <span className="text-red-500">*</span>
              </article>
              <TextFeild
                placeholder="Enter Your Full Name"
                inputStyle={"text-[12px]"}
                maxLength={20}
                value={profileData?.name}
                onChange={(e) => {
                  setProfileData({ ...profileData, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                error={errors.name}
              />
            </div>
            <div className="relative w-full space-y-2">
              <article className="text-[14px] font-inter font-medium">
                Bio
              </article>
              <TextAreaFeild
                placeholder="Enter Your Bio"
                inputStyle={"text-[12px] resize-none h-[100px]"}
                value={profileData?.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-4 flex justify-end items-center gap-2">
        <div>
            <button
              onClick={() => !loading && setCloseEditProfile()}
              className="w-full bg-secondary text-white px-4 py-3 rounded-md font-inter font-bold text-[10px]"
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              onClick={() => !loading && handleSaveChanges()}
              className="w-full bg-primary text-white px-4 py-3 rounded-md font-inter font-bold text-[10px]"
            >
              Save Changes
            </button>
          </div>
        </div>
        {/* lineLoading */}
        {loading && (
          <div className="absolute top-0 left-0 w-full">
            <LineLoadingEffect />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
