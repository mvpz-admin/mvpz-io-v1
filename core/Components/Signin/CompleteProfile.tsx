import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import Image from "next/image";
import { HiPencilSquare } from "react-icons/hi2";
import TextFeild from "../../Atoms/Inputs/TextFeild";
import { Button, Loader } from "@mantine/core";
import Tooltip from "../../Atoms/Others/Tooltip";
import { callAPI, SportPositions } from "../../../lib/utils";
import { useCompleteProfileStore } from "../../../store/useGlobalStore";
import { FaInfoCircle } from "react-icons/fa";
import RadioFeild from "../../Atoms/Inputs/RadioFeild";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import SelectField from "../../Atoms/Inputs/SelectFeild";

const CompleteProfile = () => {
  const { user, setUser } = useAuthStore((state) => state);
  const {
    step,
    setStep,
    profileImage,
    username,
    setUsername,
    accountType,
    setAccountType,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    instgramId,
    setInstgramId,
    position,
    setPositon,
    sport,
    setSport,
    school,
    setSchool,
    dob,
    setDOB,
    setReset,
  } = useCompleteProfileStore((state) => state);
  const handleNext = () => setStep(step + 1);

  const RenderForm = () => {
    switch (step) {
      case 1:
        return (
          <CPStep1
            user={user}
            handleNext={handleNext}
            profileImage={profileImage}
            username={username}
            setUsername={setUsername}
          />
        );
      case 2:
        return (
          <CPStep2
            handleNext={handleNext}
            accountType={accountType}
            setAccountType={setAccountType}
          />
        );
      case 3:
        return (
          <CPStep3
            accountType={accountType}
            handleNext={handleNext}
            setStep={setStep}
            profileImage={profileImage}
            email={user?.email}
            username={username}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            gender={gender}
            setGender={setGender}
            dob={dob}
            setDOB={setDOB}
            user={user}
            setUser={setUser}
            setReset={setReset}
          />
        );
      case 4:
        return (
          <CPStep4
            setStep={setStep}
            profileImage={profileImage}
            email={user?.email}
            username={username}
            firstName={firstName}
            lastName={lastName}
            gender={gender}
            dob={dob}
            instgramId={instgramId}
            setInstgramId={setInstgramId}
            position={position}
            setPositon={setPositon}
            sport={sport}
            setSport={setSport}
            school={school}
            setSchool={setSchool}
            user={user}
            setUser={setUser}
            setReset={setReset}
          />
        );

      default:
        return (
          <CPStep1
            profileImage={profileImage}
            user={user}
            handleNext={handleNext}
            username={username}
            setUsername={setUsername}
          />
        );
    }
  };

  const getProgressWidth = () => {
    switch (step) {
      case 1:
        return "w-[25%]";
      case 2:
        return "w-[50%]";
      case 3:
        return "w-[75%]";
      case 4:
        return "w-[100%]";
      default:
        return "w-[25%]";
    }
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center flex-col z-0 space-y-10">
      {/* bar */}
      <div className="relative w-full flex justify-center items-center">
        <div className="relative w-[200px] h-2 bg-ternary rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full bg-white rounded-r-full transition-all duration-300 ${getProgressWidth()}`}
          />
        </div>
      </div>
      {/* content */}
      {RenderForm()}
    </div>
  );
};

const CPStep1 = ({
  user,
  handleNext,
  profileImage,
  username: storeUsername,
  setUsername: setStoreUsername,
}) => {
  const [editForm, setEditForm] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [checkingLoading, setCheckingLoading] = useState(false);
  useEffect(() => {
    
    if (storeUsername) {
      setUsername(storeUsername || user?.username);
    }
  }, [storeUsername]);

  const handleSubmit = async () => {
    setError(null);
    setCheckingLoading(true);
    let modifyUsername = username[0] !== "@" ? `@${username}` : username;
    const response = await callAPI({
      endpoint: `/v1/global/search/profile/${modifyUsername}`,
    });

    if (!response.success) {
      setCheckingLoading(false);
      return setError(response?.message);
    }

    setUsername(modifyUsername);
    setStoreUsername(modifyUsername);
    setEditForm(false);
    setCheckingLoading(false);
  };

  return (
    <div className="relative w-full h-full flex-1 ">
      <div className="relative w-full h-full flex flex-col justify-center items-center space-x-5">
        {/* profile */}
        <div className="relative w-[125px] h-[125px] bg-ternary rounded-full flex justify-center items-center">
          <Image
            src={profileImage}
            alt="profile Image"
            title={user?.email}
            width={500}
            height={500}
            className="relative w-full h-full"
          />
        </div>
        {/* body */}
        <div className="relative w-full h-full flex-1 font-inter py-5">
          <article className="text-center text-[14px] mb-5">
            {user?.email}
          </article>
          <article className="text-4xl font-bold text-center mb-2">
            Welcom To MVPz
          </article>
          <div className="flex justify-center items-center mb-4  gap-2 cursor-pointer md:max-w-[60%] mx-auto">
            {editForm ? (
              <>
                <div className="w-full my-2 flex justify-center items-center gap-2">
                  <TextFeild
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minlength="3"
                    maxlength="20"
                    inputStyle="!h-[45px]"
                    type="email"
                    loading={checkingLoading}
                    clickSubmit={() => !checkingLoading && handleSubmit()}
                    error={error}
                  />
                </div>
              </>
            ) : (
              <>
                <Tooltip text="Username" position="bottom">
                  <article className="text-2xl font-bold text-center opacity-80">
                    {username}
                  </article>
                </Tooltip>
                <HiPencilSquare size={20} onClick={() => setEditForm(true)} />
              </>
            )}
          </div>
          <article className="text-[12px] opacity-50 text-center md:max-w-[75%] mx-auto">
            Fill in your basic information to complete your profile and let the
            world know who you are — whether you're an athlete making headlines,
            a fan showing support, or an artist creating magic.
          </article>
        </div>
        <div
          className={`w-full py-2 flex justify-center items-center ${
            editForm ? "bg-ternary" : "bg-primary"
          } max-w-[75%] mx-auto rounded-full font-inter font-bold cursor-pointer`}
          onClick={() => !editForm && handleNext()}
        >
          Get Started
        </div>
      </div>
    </div>
  );
};

const CPStep2 = ({ handleNext, accountType, setAccountType }) => {
  const Block = ({
    id,
    image,
    title,
    description,
    selectedAT,
    setSelectedAT,
  }) => {
    return (
      <div
        className="relative flex flex-col justify-center items-center space-y-4 bg-ternary p-2 md:w-[300px] w-[200px] md:h-[300px] h-[200px]  rounded-2xl "
        onClick={() => setSelectedAT(id)}
      >
        <div className="md:w-[200px] w-[100px] md:h-[200px] h-[100px]">
          <Image
            src={image}
            alt={id}
            title={id}
            width={500}
            height={500}
            className="relative w-full h-full"
          />
        </div>
        <div className="flex justify-start items-center gap-1 ">
          <article className="font-bold">{title}</article>
          <Tooltip text={description}>
            <FaInfoCircle className="text-primary cursor-pointer" />
          </Tooltip>
        </div>
        {/* radio */}
        <div
          className={`absolute top-0 left-2 w-10 h-10 rounded-full border cursor-pointer ${
            selectedAT == id ? "border-primary" : "border-white"
          } p-1`}
        >
          {selectedAT == id && (
            <div className={`relative w-full h-full rounded-full bg-primary`} />
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="relative w-full h-full flex-1 ">
      <div className="relative w-full h-full flex flex-col justify-center items-center space-x-5">
        {/* header */}
        <div className="relative w-full flex flex-col justify-center items-center font-inter">
          <article className="text-2xl font-bold text-center mb-2">
            Step Into Your Role
          </article>
          <article className="text-[12px] opacity-50 text-center md:max-w-[75%] mx-auto">
            Are you an Athlete or a Sports Fan? Choose to shape your profile!
          </article>
        </div>
        {/* body */}
        <div className="relative w-full h-full flex-1 font-inter py-5 flex md:flex-row flex-col justify-center items-center gap-5">
          <Block
            id="fan"
            image="https://res.cloudinary.com/dv667zlni/image/upload/v1741643235/fan_fnxwca.png"
            title={"Sports Fan"}
            description={
              "Follow your favorite athletes, show support, and be part of the community. 🙌"
            }
            selectedAT={accountType}
            setSelectedAT={setAccountType}
          />
          <Block
            id="athlete"
            image="https://res.cloudinary.com/dv667zlni/image/upload/v1741643233/player_gvncku.png"
            title={"Athlete"}
            description={
              "Showcase your journey, connect with fans, and get the support you deserve. 🚀"
            }
            selectedAT={accountType}
            setSelectedAT={setAccountType}
          />
        </div>
        <div
          className={`w-full py-2 flex justify-center items-center ${
            false ? "bg-ternary" : "bg-primary"
          } max-w-[75%] mx-auto rounded-full font-inter font-bold cursor-pointer`}
          onClick={() => !false && handleNext()}
        >
          Next Step
        </div>
      </div>
    </div>
  );
};

const CPStep3 = ({
  accountType,
  handleNext,
  setStep,
  profileImage,
  email,
  username,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  gender,
  setGender,
  dob,
  setDOB,
  user,
  setUser,
  setReset,
}) => {
  const [errors, setErrors] = useState<any>({});
  const [processLoading, setProcesLoading] = useState(false);

  const handleCompleteProfile = async () => {
    if ((accountType = "athlete")) {
      return handleNext();
    }

    setErrors({});
    const nameRegex = /^[a-zA-Z\s]{2,40}$/;
    const currentDate = new Date();
    const userDOB = new Date(dob);

    if (!firstName) {
      return setErrors((prev) => ({
        ...prev,
        firstName: "First name is required",
      }));
    } else if (!nameRegex.test(firstName)) {
      return setErrors((prev) => ({
        ...prev,
        firstName:
          "First name must be 2-40 characters without special characters.",
      }));
    }

    // Validate Last Name (only if it's provided)
    if (lastName) {
      if (!nameRegex.test(lastName)) {
        return setErrors((prev) => ({
          ...prev,
          lastName:
            "Last name must be 2-40 characters without special characters.",
        }));
      }
    }

    // Validate Date of Birth
    if (!dob) {
      return setErrors((prev) => ({
        ...prev,
        dob: "Date of birth is required.",
      }));
    }

    setProcesLoading(true);

    let response = await callAPI({
      endpoint: `/v1/account/completeProfile`,
      method: "PUT",
      body: {
        profileImage,
        email,
        username,
        firstName,
        lastName,
        gender,
        dob,
      },
    });

    if (!response.success) {
      setProcesLoading(false);
      return setStep(1);
    }
    let token = user.token;
    setUser({
      ...response?.data,
      token,
    });
    setReset();
    setProcesLoading(false);
    return;
  };

  return (
    <>
      <div className="relative w-full h-full flex-1 ">
        <div className="relative w-full h-full flex flex-col justify-center items-center space-x-5">
          {/* header */}
          <div className="relative w-full flex flex-col justify-center items-center font-inter">
            <article className="text-2xl font-bold text-center mb-2">
              Tell Us About Yourself
            </article>
            <article className="text-[12px] opacity-50 text-center md:max-w-[75%] mx-auto">
              Add your name, gender, and date of birth to get started!
            </article>
          </div>
          {/* body */}
          <div className="relative w-full h-full flex-1 font-inter py-5 flex flex-col justify-center items-center gap-5 md:max-w-[80%] ">
            <div className="relative w-full gap-5 grid grid-cols-2">
              <div className="reltaive w-full space-y-2">
                <article className="text-[14px] font-medium">
                  Enter Your First Name{" "}
                  <span className="text-red-500 text-[16px]">*</span>
                </article>
                <TextFeild
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors?.firstName}
                />
              </div>
              <div className="reltaive w-full space-y-2">
                <article className="text-[14px] font-medium">
                  Enter Your Last Name{" "}
                </article>
                <TextFeild
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.lastName}
                />
              </div>
            </div>
            <div className="reltaive w-full space-y-2">
              <article className="text-[14px] font-medium">
                Enter Your DOB{" "}
                <span className="text-red-500 text-[16px]">*</span>
              </article>
              <TextFeild
                type="date"
                placeholder="DD/MM/YYYY"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                error={errors.dob}
              />
            </div>
            <div className="reltaive w-full space-y-2">
              <article className="text-[14px] font-medium">
                Select Your Gender{" "}
                <span className="text-red-500 text-[16px]">*</span>
              </article>
              <div className="flex flex-wrap justify-start items-center gap-4">
                <RadioFeild
                  label={"Man"}
                  id={"Male"}
                  selectedValue={gender}
                  onClick={(id) => setGender(id)}
                />
                <RadioFeild
                  label={"Women"}
                  id={"Female"}
                  selectedValue={gender}
                  onClick={(id) => setGender(id)}
                />
                <RadioFeild
                  label={"Perfer Not To Say"}
                  id={"Perfer_Not_To_Say"}
                  selectedValue={gender}
                  onClick={(id) => setGender(id)}
                />
              </div>
            </div>
          </div>
          <div
            className={`w-full py-2 flex justify-center items-center ${
              false ? "bg-ternary" : "bg-primary"
            } max-w-[75%] mx-auto rounded-full font-inter font-bold cursor-pointer h-[40px]`}
            onClick={() => !false && handleCompleteProfile()}
          >
            {processLoading ? (
              <Loader color="white" variant="dots" size={30} />
            ) : (
              <span>Complete Profile</span>
            )}
          </div>
        </div>
      </div>
      {processLoading && (
        <div className="absolute top-0 left-0 w-full">
          <LineLoadingEffect />
        </div>
      )}
    </>
  );
};

const CPStep4 = ({
  setStep,
  profileImage,
  email,
  username,
  firstName,
  lastName,
  gender,
  dob,
  instgramId,
  setInstgramId,
  position,
  setPositon,
  sport,
  setSport,
  school,
  setSchool,
  user,
  setUser,
  setReset,
}) => {
  const [errors, setErrors] = useState<any>({});
  const [processLoading, setProcesLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  const handleGetTribes = async () => {
    let response = await callAPI({
      endpoint: "/v1/global/get-all-tribes",
    });

    if (response?.success) {
      setTeams(response?.data);
    }
  };

  useEffect(() => {
    handleGetTribes();
  }, []);

  const validateInstagramHandle = (handle: string) => {
    // Instagram handle validation regex
    const instagramRegex = /^@?[a-zA-Z0-9._]{1,30}$/;
    if (!handle) {
      return "Instagram handle is required";
    }
    if (!instagramRegex.test(handle.replace("@", ""))) {
      return "Invalid Instagram handle format";
    }
    return null;
  };

  const handleCompleteWaitlist = async () => {
    setErrors({});

    // Validate Instagram handle
    const instagramError = validateInstagramHandle(instgramId);
    if (instagramError) {
      setErrors((prev) => ({ ...prev, instgramId: instagramError }));
      return;
    }

    // Validate other required fields
    if (!sport) {
      setErrors((prev) => ({ ...prev, sport: "Please select a sport" }));
      return;
    }
    if (!position) {
      setErrors((prev) => ({ ...prev, position: "Please select a position" }));
      return;
    }
    if (!school) {
      setErrors((prev) => ({ ...prev, school: "Please select a school" }));
      return;
    }

    setProcesLoading(true);

    let response = await callAPI({
      endpoint: `/v1/account/completeWaitlist`,
      method: "PUT",
      body: {
        profileImage,
        email,
        username,
        firstName,
        lastName,
        gender,
        dob,
        instgramId: instgramId.startsWith("@") ? instgramId : `@${instgramId}`,
        position,
        sport,
        school,
      },
    });

    if (!response.success) {
      setProcesLoading(false);
      return setStep(1);
    }
    let token = user.token;
    setUser({
      ...response?.data,
      token,
    });
    setReset();
    setProcesLoading(false);
    return;
  };

  return (
    <>
      <div className="relative w-full h-full flex-1">
        <div className="relative w-full h-full flex flex-col justify-center items-center space-x-5">
          {/* header */}
          <div className="relative w-full flex flex-col justify-center items-center font-inter">
            <article className="text-2xl font-bold text-center mb-2">
              Join Our Waitlist
            </article>
            <article className="text-[12px] opacity-50 text-center md:max-w-[75%] mx-auto">
              Complete your athletic profile to join our exclusive waitlist!
            </article>
          </div>
          {/* body */}
          <div className="relative w-full h-full flex-1 font-inter py-5 flex flex-col justify-center items-center gap-5 md:max-w-[80%]">
            <div className="relative w-full space-y-2">
              <article className="text-[14px] font-medium">
                Instagram Handle{" "}
                <span className="text-red-500 text-[16px]">*</span>
              </article>
              <TextFeild
                placeholder="@yourusername"
                value={instgramId}
                onChange={(e) => setInstgramId(e.target.value)}
                error={errors?.instgramId}
              />
            </div>

            <div className="relative w-full grid grid-cols-2 gap-4">
              <div className="relative space-y-2">
                <article className="text-[14px] font-medium">
                  Sport <span className="text-red-500 text-[16px]">*</span>
                </article>
                <div className="h-[40px]">
                  <SelectField
                    options={[
                      {
                        id: "Cricket",
                        label: "Cricket",
                      },
                    ]}
                    onChange={(data) => setSport(data?.id)}
                  />
                  {errors?.sport && (
                    <span className="text-red-500 text-xs">{errors.sport}</span>
                  )}
                </div>
              </div>

              <div className="relative space-y-2">
                <article className="text-[14px] font-medium">
                  Position <span className="text-red-500 text-[16px]">*</span>
                </article>
                <div className="h-[40px]">
                  <SelectField
                    options={SportPositions}
                    onChange={(data) => setPositon(data?.id)}
                  />
                </div>

                {errors?.position && (
                  <span className="text-red-500 text-xs">
                    {errors.position}
                  </span>
                )}
              </div>
            </div>

            <div className="relative w-full space-y-2">
              <article className="text-[14px] font-medium">
                School <span className="text-red-500 text-[16px]">*</span>
              </article>
              <div className="h-[40px]">
                <SelectField
                  options={teams}
                  onChange={(data) => setSchool(data?.id)}
                />
              </div>
              {errors?.school && (
                <span className="text-red-500 text-xs">{errors.school}</span>
              )}
            </div>
          </div>

          <div
            className={`w-full py-2 flex justify-center items-center ${
              false ? "bg-ternary" : "bg-primary"
            } max-w-[75%] mx-auto rounded-full font-inter font-bold cursor-pointer h-[40px]`}
            onClick={() => !false && handleCompleteWaitlist()}
          >
            {processLoading ? (
              <Loader color="white" variant="dots" size={30} />
            ) : (
              <span>Join Waitlist</span>
            )}
          </div>
        </div>
      </div>
      {processLoading && (
        <div className="absolute top-0 left-0 w-full">
          <LineLoadingEffect />
        </div>
      )}
    </>
  );
};

export default CompleteProfile;
