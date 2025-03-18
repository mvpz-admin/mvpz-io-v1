// import {
//   Autocomplete,
//   Button,
//   Group,
//   Loader,
//   MultiSelect,
//   Select,
//   SimpleGrid,
//   Stack,
//   Stepper,
//   Switch,
//   Text,
//   TextInput,
// } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";
// import { IconAt, IconDevicesX } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import {
//   callAPI,
//   getOrganizationName,
//   NCAA_SPORTS,
//   remainingEligibility,
//   SCHOOLS,
//   // SportTeams,
// } from "../lib/utils";
// import SearchAthlete from "./SearchAthlete";

// interface UserSession {
//   name: string;
//   email: string;
//   image: string;
//   username: string;
//   role?: string;
//   currentSchool?: string;
//   previousSchool?: string;
//   primarySport?: string;
//   secondarySport?: string;
//   primaryPosition?: string;
//   secondaryPosition?: string;
//   homeTown?: string;
//   remainingEligibility?: number;
//   facebookUrl?: string;
//   twitterUrl?: string;
//   instagramUrl?: string;
//   linkedinUrl?: string;
//   favoriteCollegeTeam?: string;
//   cardanoWalletAvailable?: boolean;
//   referralType?: string;
//   referredById?: string;
// }

// const ProfileForm = (props) => {
//   const router = useRouter();
//   const { update } = useSession();
//   const { user, role } = props;
//   const { callbackUrl } = router.query;
//   const [referralUsers, setReferralUsers] = useState([]);
//   const [currentShcool, setCurrentShcool] = useState([]);
//   const [userProfile, setUserProfile] = useState<UserSession>({
//     name: user.name,
//     image: user.image,
//     email: user.email,
//     username: user.username,
//     role: user.role,
//     currentSchool: user.currentSchool,
//     previousSchool: user.previousSchool,
//     primarySport: "",
//     secondarySport: "",
//     primaryPosition: "",
//     secondaryPosition: "",
//     homeTown: user.homeTown,
//     remainingEligibility: user.remainingEligibility,
//     facebookUrl: user.facebook?.link,
//     twitterUrl: user.twitter?.link,
//     instagramUrl: user.instagram?.link,
//     linkedinUrl: user.linkedin?.link,
//     favoriteCollegeTeam: user.favoriteCollegeTeam,
//     cardanoWalletAvailable: user.cardanoWalletAvailable,
//     referralType: "WEB",
//   });
//   const [activeStep, setActiveStep] = useState(0);
//   const [usernameError, setUsernameError] = useState("");
//   const [currentSchoolError, setSchoolError] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [pNCCASportError, setPNCCASportError] = useState("");
//   const [pPositionError, setPPositionError] = useState("");
//   const [eligibilityError, setEligibilityError] = useState("");
//   const primarySportOptions = SportTeams?.map((team) => team?.team)
//   const secondarySportOptions = SportTeams?.map((team, idx) => team?.team)
//   const isMediumScreen = useMediaQuery("(min-width: 768px)");
  
//   const [primarySportPositionOptions, setPrimarySportPositionOptions] =
//     useState([]);
//   const [secondarySportPositionOptions, setSecondarySportPositionOptions] =
//     useState([]);

//   // let role = 'User'
//   const STEPS_COUNT = 4;

//   const setAthleteProfile = (athlete) => {
//     setUserProfile({
//       ...userProfile,
//       name: athlete.Name,
//       currentSchool: athlete.SchoolName,
//       previousSchool: athlete.PreviousSchool,
//       primarySport: athlete.Sport?.toUpperCase() || "",
//       primaryPosition: athlete.Position,
//       homeTown: athlete.Hometown,
//     });
//   };

//   const checkUserNameAvailability = (): Promise<boolean> => {
//     const options = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     return fetch(`/api/user/username?username=${userProfile.username}`, options)
//       .then((res) => res.json())
//       .then((resJSON) => {
//         return !resJSON;
//       })
//       .catch((err) => false);
//   };

//   const nextStep = async () => {
//     switch (activeStep) {
//       case 0:
//         if (!userProfile?.name) {
//           return setNameError("Provide name to proceed with next step");
//         } else if (userProfile?.name?.length < 3) {
//           return setNameError("Name should greater than 3 char.");
//         }

//         if (!userProfile?.username) {
//           return setUsernameError("Provide username to proceed with next step");
//         } else {
//           if (userProfile?.username?.length < 5) {
//             return setUsernameError("Username should greater than 5 char.");
//           }
//           let spacRegex = /^\S+$/;
//           if(!spacRegex.test(userProfile?.username)){
//             return setUsernameError("Username should not have space.");
//           }
//           const usernameAvailable = await checkUserNameAvailability();
//           if (!usernameAvailable) {
//             return setUsernameError(
//               "Username not available, please choose another one"
//             );
//           }
//         }
//         return setActiveStep((current) =>
//           current < STEPS_COUNT ? current + 1 : current
//         );
//       case 1:
//         if (role === "Athlete") {
//           if (!userProfile?.currentSchool) {
//             return setSchoolError(
//               "Provide Current School to proceed with next step"
//             );
//           }

//           if (!userProfile?.primarySport) {
//             return setPNCCASportError(
//               "Provide Primary NCAA Sport to proceed with next step"
//             );
//           }

//           if (!userProfile?.primaryPosition) {
//             return setPPositionError(
//               "Provide Primary Position to proceed with next step"
//             );
//           }

//           if (userProfile?.remainingEligibility === null) {
//             return setEligibilityError(
//               "Provide Remaining Eligibility to proceed with next step"
//             );
//           }
//         }
//         return setActiveStep((current) =>
//           current < STEPS_COUNT ? current + 1 : current
//         );
//       case 2:
//       case 3:
//         return setActiveStep((current) =>
//           current < STEPS_COUNT ? current + 1 : current
//         );
//     }
//     setActiveStep((current) => (current < STEPS_COUNT ? current + 1 : current));
//   };

//   const prevStep = () =>
//     setActiveStep((current) => (current > 0 ? current - 1 : current));

//   const saveProfile = async () => {
//     const userBody = userProfile;
//     userBody.role = userBody.role || role;
//     userBody["socialLinks"] = [];
//     if (userProfile.twitterUrl) {
//       userBody["socialLinks"].push({
//         link: userProfile.twitterUrl,
//         socialBrand: "twitter",
//         id: user.twitter?.id || null,
//       });
//     }
//     if (userProfile.facebookUrl) {
//       userBody["socialLinks"].push({
//         link: userProfile.facebookUrl,
//         socialBrand: "facebook",
//         id: user.facebook?.id || null,
//       });
//     }
//     if (userProfile.linkedinUrl) {
//       userBody["socialLinks"].push({
//         link: userProfile.linkedinUrl,
//         socialBrand: "linkedin",
//         id: user.linkedin?.id || null,
//       });
//     }
//     if (userProfile.instagramUrl) {
//       userBody["socialLinks"].push({
//         link: userProfile.instagramUrl,
//         socialBrand: "instagram",
//         id: user.instagram?.id || null,
//       });
//     }
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userBody),
//     };
//     const response = await fetch(`/api/user/upsert`, options);
//     const responseJSON = await response.json();
//     if (responseJSON.id) {
//       update();
//     }
//     if (callbackUrl && role !== "Athlete") {
//       router.push(callbackUrl.toString());
//     }

//     if (userBody.role === "Athlete") {
//       router.push(`/fanzone/tribe/profile/athlete`);
//     } else {
//       router.push(`/fanzone/profile/user`);
//     }
//   };

//   useEffect(() => {
//     if (activeStep === STEPS_COUNT) {
//       saveProfile();
//     }
//   }, [activeStep]);

//   useEffect(() => {
//     async function getShcool() {
//       let names = await getOrganizationName();

      
//       setCurrentShcool(names?.map((_) => ({
//         label : _.name || _.shortName,
//         value : _.id
//       })));
     
      
//     }

//     getShcool();
//   }, []);

//   useEffect(() => {
//     if (userProfile?.username && usernameError) {
//       setUsernameError("");
//     }
//   }, [userProfile?.username]);

//   const handleOnChangeName = (e) => {
//     setUserProfile({ ...userProfile, name: e.currentTarget.value });
//     setNameError(null);
//   };

//   const handleOnChangeCurrentSchool = (e) => {
//     setUserProfile({ ...userProfile, currentSchool: e });
//     setSchoolError(null);
//   };

//   const handleOnChangePNCAASport = (e) => {
    
//     setUserProfile({ ...userProfile, primarySport: e });
//     setPNCCASportError(null);
//   };

//   const handleOnChangePPosition = (e) => {
//     setUserProfile({ ...userProfile, primaryPosition: e });
//     setPPositionError(null);
//   };

//   const handleOnChangeRemainingEligibility = (e) => {
//     setUserProfile({ ...userProfile, remainingEligibility: +e });
//     setEligibilityError(null);
//   };

//   useEffect(() => {
//     if (userProfile?.primarySport) {

//       console.log({profile : userProfile?.primarySport, SportTeams});
      
//       let list = SportTeams?.filter(
//         (team) =>{
//           return team.team === userProfile?.primarySport}
//       )[0]

      
//       setPrimarySportPositionOptions(list?.positions || []);
//     }
//   }, [userProfile?.primarySport]);

//   useEffect(() => {
//     if (userProfile?.secondarySport) {
//       let list = SportTeams?.filter(
//         (team) => team.team.toLowerCase === userProfile?.secondarySport.toLowerCase
//       )[0];
//       setSecondarySportPositionOptions(list?.positions || []);
//     }
//   }, [userProfile?.secondarySport]);

//   return (
//     <>
//       <Stepper
//         active={activeStep}
//         allowNextStepsSelect={false}
//         mt={32}
//         breakpoint="md"
//       >
//         {/* {role === 'Athlete' && 
//         <Stepper.Step
//         label="Step 0"
//         description="Search for an Athlete profile">
//             <Stack>
//                 <SearchAthlete handleAthleteSelect={(item) => setAthleteProfile(item)} forAthleteSignup/>
//             </Stack>
//         </Stepper.Step>} */}
//         <Stepper.Step label="Step 1" description="Create username">
//           <Stack>
//             <TextInput
//               label={"What's your name?"}
//               value={userProfile?.name || user?.name}
//               withAsterisk
//               onChange={(e) => handleOnChangeName(e)}
//               error={nameError}
//             />
//             {/* <TextInput
//               label={"What's your email?"}
//               value={user?.email}
//               disabled
//             /> */}
//             <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//               <Select
//                 label="How do you know about us?"
//                 placeholder="Pick one"
//                 withAsterisk
//                 data={[
//                   { value: "WEB", label: "Web" },
//                   { value: "REFERRAL", label: "Referral" },
//                   { value: "OPENDORSE", label: "Opendorse" },
//                   { value: "TWITTER", label: "Twitter" },
//                   { value: "INSTAGRAM", label: "Instagram" },
//                 ]}
//                 value={
//                   user.referralCode ? "REFERRAL" : userProfile?.referralType
//                 }
//                 disabled={!!user.referralCode}
//                 onChange={(e) =>
//                   setUserProfile({ ...userProfile, referralType: e })
//                 }
//               />
//               {userProfile?.referralType === "REFERRAL" ||
//                 (!!user.referralCode && (
//                   <TextInput
//                     label="Referral Code"
//                     value={user.referralCode}
//                     disabled={!!user.referralCode}
//                   />
//                 ))}
//             </SimpleGrid>
//             <TextInput
//               error={usernameError}
//               placeholder=""
//               label="What do you want your user name to be?"
//               withAsterisk
//               value={user?.username || userProfile?.username}
//               onChange={(e) =>
//                 setUserProfile({
//                   ...userProfile,
//                   username: e.currentTarget.value,
//                 })
//               }
//               onBlur={checkUserNameAvailability}
//             />
//           </Stack>
//         </Stepper.Step>
//         {role !== "Athlete" && (
//           <Stepper.Step label="Step 2" description={"Provide additional info"}>
//             <Stack>
//               <SimpleGrid
//                 breakpoints={[
//                   { minWidth: 240, cols: 1 },
//                   { minWidth: "md", cols: 2 },
//                 ]}
//               >
//                 <Autocomplete
//                   label="What's your favourite college team?"
//                   placeholder="Type to search and select"
//                   data={SCHOOLS}
//                   value={userProfile?.favoriteCollegeTeam || ""}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, favoriteCollegeTeam: e })
//                   }
//                 />
//                 <Select
//                   label="What's your favourite NCAA sport?"
//                   placeholder="Pick one"
//                   data={primarySportOptions}
//                   value={String(userProfile?.primarySport) || ""}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, primarySport: e })
//                   }
//                 />
//                 <MultiSelect
//                   label="What other sports do you like or follow?"
//                   placeholder="Pick one or more"
//                   data={secondarySportOptions}
//                   value={String(userProfile?.secondarySport)?.split(",")}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, secondarySport: e.join() })
//                   }
//                 />
//               </SimpleGrid>
//             </Stack>
//           </Stepper.Step>
//         )}
//         {role == "Athlete" && (
//           <Stepper.Step label="Step 2" description={"Provide school info"}>
//             <Stack>
//               <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//                 <Select
//                   label="Current school"
//                   placeholder="Type to search and select"
//                   data={currentShcool}
//                   value={userProfile?.currentSchool || ""}
//                   withAsterisk
//                   onChange={(e) => handleOnChangeCurrentSchool(e)}
//                   error={currentSchoolError}
//                 />
//                 <Autocomplete
//                   label="Previous school"
//                   placeholder="Type to search and select"
//                   data={currentShcool}
//                   value={userProfile?.previousSchool || ""}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, previousSchool: e })
//                   }
//                 />
//               </SimpleGrid>
//               <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//                 {/* <Select
//                     label="Conference"
//                     placeholder="Pick one"
//                     withAsterisk
//                     data={[
//                         {value: "CONFERENCE1", label: "Conference option 1"},
//                         {value: "CONFERENCE2", label: "Conference option 2"},
//                     ]}
//                     onChange={e => setUserProfile({...userProfile, conference: e})}
//                 /> */}
//                 <Autocomplete
//                   label="Primary NCAA Sport"
//                   placeholder="Select your primary sport "
//                   data={primarySportOptions}
//                   value={String(userProfile?.primarySport)}
//                   withAsterisk
//                   onChange={(e) => handleOnChangePNCAASport(e)}
//                   error={pNCCASportError}
//                 />
//                 <Autocomplete
//                   label="Secondary NCAA Sport"
//                   placeholder=" Select your secondary sport"
//                   data={secondarySportOptions}
//                   value={String(userProfile?.secondarySport)}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, secondarySport: e })
//                   }
//                 />
//               </SimpleGrid>
//               <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//                 <Autocomplete
//                   label="Primary position"
//                   placeholder="Select Your Primary Position"
//                   data={primarySportPositionOptions}
//                   value={userProfile?.primaryPosition || ""}
//                   withAsterisk
//                   onChange={(e) => handleOnChangePPosition(e)}
//                   error={pPositionError}
//                 />
//                 <Autocomplete
//                   label="Secondary position"
//                   placeholder="Select Your Secondary Position "
//                   data={secondarySportPositionOptions}
//                   value={String(userProfile?.secondaryPosition) || ""}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, secondaryPosition: e })
//                   }
//                 />
//               </SimpleGrid>
//               <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//                 <Select
//                   label="Class"
//                   placeholder="Pick one"
//                   withAsterisk
//                   defaultValue="ONE_YEAR"
//                   data={[
//                     {
//                       label: "Freshman",
//                       value: "1",
//                     },
//                     {
//                       label: "Sophomore",
//                       value: "2",
//                     },
//                     {
//                       label: "Junior",
//                       value: "3",
//                     },
//                     {
//                       label: "Senior",
//                       value: "4",
//                     },
//                     {
//                       label: "Fifth-Year",
//                       value: "5",
//                     },
//                     {
//                       label: "First-Year (Redshirt)",
//                       value: "6",
//                     },
//                     {
//                       label: "Second-Year (Redshirt)",
//                       value: "7",
//                     },
//                     {
//                       label: "Third-Year (Redshirt)",
//                       value: "8",
//                     },
//                     {
//                       label: "Fourth-Year (Redshirt)",
//                       value: "9",
//                     },
//                     {
//                       label: "Graduate",
//                       value: "10",
//                     },
//                   ]}
//                   value={userProfile?.remainingEligibility?.toString()}
//                   onChange={(e) => handleOnChangeRemainingEligibility(e)}
//                   error={eligibilityError}
//                 />
//                 <Autocomplete
//                   label="Hometown"
//                   placeholder="e.g 4304 Todds Lane, San Antonio, Texas"
//                   data={[]}
//                   value={userProfile?.homeTown || ""}
//                   onChange={(e) =>
//                     setUserProfile({ ...userProfile, homeTown: e })
//                   }
//                 />
//               </SimpleGrid>
//             </Stack>
//           </Stepper.Step>
//         )}
//         <Stepper.Step label="Step 3" description="Provide social info">
//           <Stack>
//             <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//               <TextInput
//                 value={userProfile?.facebookUrl}
//                 icon={<IconAt size={18} />}
//                 label="Facebook"
//                 onChange={(e) =>
//                   setUserProfile({
//                     ...userProfile,
//                     facebookUrl: e.currentTarget.value,
//                   })
//                 }
//               />
//               <TextInput
//                 value={userProfile?.twitterUrl}
//                 icon={<IconAt size={18} />}
//                 label="Twitter"
//                 onChange={(e) =>
//                   setUserProfile({
//                     ...userProfile,
//                     twitterUrl: e.currentTarget.value,
//                   })
//                 }
//               />
//             </SimpleGrid>
//             <SimpleGrid cols={isMediumScreen ? 2 : 1}>
//               <TextInput
//                 value={userProfile?.instagramUrl}
//                 icon={<IconAt size={18} />}
//                 label="Instagram"
//                 onChange={(e) =>
//                   setUserProfile({
//                     ...userProfile,
//                     instagramUrl: e.currentTarget.value,
//                   })
//                 }
//               />
//               <TextInput
//                 value={userProfile?.linkedinUrl}
//                 icon={<IconAt size={18} />}
//                 label="Linkedin"
//                 onChange={(e) =>
//                   setUserProfile({
//                     ...userProfile,
//                     linkedinUrl: e.currentTarget.value,
//                   })
//                 }
//               />
//             </SimpleGrid>
//           </Stack>
//         </Stepper.Step>
//         {role !== "Athlete" && (
//           <Stepper.Step label="Step 4" description="Provide wallet info">
//             <Stack mt={32} align="center">
//               <Group>
//                 <Text>Do you have Cardano wallet?</Text>
//                 <Switch
//                   size={"lg"}
//                   checked={!!userProfile?.cardanoWalletAvailable}
//                   onLabel="YES"
//                   offLabel="NO"
//                   onChange={(e) =>
//                     setUserProfile({
//                       ...userProfile,
//                       cardanoWalletAvailable: e.currentTarget.checked,
//                     })
//                   }
//                 />
//               </Group>
//             </Stack>
//           </Stepper.Step>
//         )}
//       </Stepper>
//       <Group position="center" mt="xl">
//         <Button variant="default" onClick={prevStep}>
//           Back
//         </Button>
//         <Button disabled={activeStep > STEPS_COUNT - 1} onClick={nextStep}>
//           {activeStep >= STEPS_COUNT - 1 ? "Submit" : "Next step"}
//         </Button>
//       </Group>
//     </>
//   );
// };

// export default ProfileForm;
