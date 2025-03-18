import {
  Autocomplete,
  Button,
  FileInput,
  Group,
  Image,
  Loader,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { DateTimePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import {
  callAPI,
  classOptions,
  getOrganizationName,
  uploadImageToBackblaze,
} from "../lib/utils";
import * as CryptoJS from "crypto-js";
import axios from "axios";
import { IconAt } from "@tabler/icons-react";

export default function AthleteForm(props) {
  const isAdmin = props.isAdmin || false;
  const router = useRouter();
  const [currentShcool, setCurrentShcool] = useState([]);
  const [currentSchoolError, setSchoolError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log({
    props: props.user,
  });

  const [user, setUser] = useState(
    props.user
      ? {
          ...props.user,
          class: props?.user?.class || "",
        }
      : {
          email: "",
          name: "",
          image: "",
          bannerImage: "",
          cardImage: "",
          firstname: "",
          lastname: "",
          mobile: "",
          aboutMe: "",
          username: "",
          role: "",
          sex: "",
          currentSchool: "",
          previousSchool: "",
          conference: "",
          primarySport: "",
          secondarySport: "",
          primaryPosition: "",
          secondaryPosition: "",

          homeTown: "",

          class: "",
        }
  );

  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [cardImage, setCardImage] = useState(null);

  const submitUser = async () => {
    setLoading(true);
    let userBody = user;
    if (!!profileImage || !!bannerImage || !!cardImage) {
      const backblazeImage = await callAPI({
        endpoint: "/api/image/uploadBackBlaze",
        method: "GET",
        params: { bucketType: "user" },
      });

      if (backblazeImage.uploadUrl) {
        const uploadUrl = backblazeImage.uploadUrl;
        const authToken = backblazeImage.authorizationToken;
        const name = `${(user.name || user.firstname).replace(
          " ",
          ""
        )}_${user.username.replace(".", "").replace(" ", "")}`;
        // Profile image
        if (profileImage) {
          const extn = profileImage.name.split(".");
          const imageName = `${name}_profileimage.${extn[1] || "png"}`;
          const response = await uploadImageToBackblaze(
            profileImage,
            imageName,
            uploadUrl,
            authToken
          );
          if (response) {
            userBody.image = imageName;
          }
        }
        if (!!bannerImage) {
          const extn = bannerImage.name.split(".");
          const imageName = `${name}_bannerImage.${extn[1] || "png"}`;
          const response = await uploadImageToBackblaze(
            bannerImage,
            imageName,
            uploadUrl,
            authToken
          );
          if (response) {
            userBody.bannerImage = imageName;
          }
        }
        if (!!cardImage) {
          const extn = cardImage.name.split(".");
          const imageName = `${name}_cardImage.${extn[1] || "png"}`;
          const response = await uploadImageToBackblaze(
            cardImage,
            imageName,
            uploadUrl,
            authToken
          );
          if (response) {
            userBody.cardImage = imageName;
          }
        }
      }
    }

    if (!userBody.socialLinks?.length) {
      userBody.socialLinks = [];
    }
    if (userBody.facebookUrl) {
      const fbLink = userBody.socialLinks?.find(
        (l) => l.socialBrand === "facebook"
      );
      !!fbLink
        ? (fbLink.link = userBody.facebookUrl)
        : userBody.socialLinks.push({
            socialBrand: "facebook",
            link: userBody.facebookUrl,
          });
    }
    if (userBody.twitterUrl) {
      const twitterLink = userBody.socialLinks?.find(
        (l) => l.socialBrand === "X" || l.socialBrand === "twitter"
      );
      !!twitterLink
        ? (twitterLink.link = userBody.twitterUrl)
        : userBody.socialLinks.push({
            socialBrand: "twitter",
            link: userBody.twitterUrl,
          });
    }
    if (userBody.instagramUrl) {
      const instaLink = userBody.socialLinks?.find(
        (l) => l.socialBrand === "instagram"
      );
      !!instaLink
        ? (instaLink.link = userBody.instagramUrl)
        : userBody.socialLinks.push({
            socialBrand: "instagram",
            link: userBody.instagramUrl,
          });
    }
    if (userBody.tiktokUrl) {
      const tiktokLink = userBody.socialLinks?.find(
        (l) => l.socialBrand === "tiktok"
      );
      !!tiktokLink
        ? (tiktokLink.link = userBody.tiktokUrl)
        : userBody.socialLinks.push({
            socialBrand: "tiktok",
            link: userBody.tiktokUrl,
          });
    }
    if (userBody.linkedinUrl) {
      const linkedinLink = userBody.socialLinks?.find(
        (l) => l.socialBrand === "linkedin"
      );
      !!linkedinLink
        ? (linkedinLink.link = userBody.linkedinUrl)
        : userBody.socialLinks.push({
            socialBrand: "linkedin",
            link: userBody.linkedinUrl,
          });
    }

    userBody.firstname = userBody?.name?.split(" ")[0];
    userBody.lastname = userBody?.name?.split(" ")[0];

    const response = await callAPI({
      method: "POST",
      endpoint: "/api/user/upsert",
      body: {
        ...userBody,
        currentSchool: currentShcool?.filter(
          (_) => _.label === userBody.currentSchool
        )[0]?.label,
      },
    });
    console.log({ response });
    setLoading(false);
    if (response) {
      router.reload();
    }
  };

  useEffect(() => {
    async function getShcool() {
      let names = await getOrganizationName();

      let schools = names?.map((_) => ({
        label: _.name || _.shortName,
        value: _.id,
      }));
      setCurrentShcool(schools);
    }

    getShcool();
  }, []);

  console.log(user);

  const handleOnChangeCurrentSchool = (e) => {
    setUser({ ...user, currentSchool: e });
    setSchoolError(null);
  };

  return (
    <Stack w={720} mb={64} className="w-full mt-[100px]">
      {/* <Title mb={32}>{props.user ? "Edit User" : "Create New User"}</Title> */}
      <Title order={3} align="center">
        Personal Information
      </Title>
      <Select
        label="Select Role"
        disabled={!isAdmin}
        placeholder="Pick one"
        value={user.role}
        data={[
          { label: "Athlete", value: "Athlete" },
          { label: "User", value: "User" },
        ]}
        onChange={(e) => {
          setUser({ ...user, role: e });
        }}
      />
      <SimpleGrid
        breakpoints={[
          { minWidth: 240, cols: 1 },
          { minWidth: "md", cols: 1 },
        ]}
      >
        <TextInput
          label={"Full Name"}
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
        />
      </SimpleGrid>
      <SimpleGrid
        breakpoints={[
          { minWidth: 240, cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <TextInput
          label={"Email"}
          disabled={!isAdmin}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
        />
        <TextInput
          label={"Mobile"}
          value={user.mobile}
          onChange={(e) => setUser({ ...user, mobile: e.currentTarget.value })}
        />
      </SimpleGrid>
      <SimpleGrid
        breakpoints={[
          { minWidth: 240, cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <TextInput
          label={"Username"}
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.currentTarget.value })
          }
        />
        <Select
          label="Select Sex"
          placeholder="Pick one"
          value={user.sex}
          data={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          onChange={(e) => {
            setUser({ ...user, sex: e });
          }}
        />
      </SimpleGrid>
      <Textarea
        autosize
        label={"About me"}
        value={user.aboutMe}
        onChange={(e) => setUser({ ...user, aboutMe: e.currentTarget.value })}
      />

      <Title order={3} align="center">
        Additional Information
      </Title>

      <div className="w-full">
        <Select
          label="Current school"
          placeholder="Type to search and select"
          data={currentShcool}
          value={
            props?.user?.currentSchool
              ? currentShcool?.filter(
                  (_) => _.label === props?.user?.currentSchool
                )[0]?.value
              : user?.currentSchool || user?.currentSchool || ""
          }
          onChange={(e) => handleOnChangeCurrentSchool(e)}
          error={currentSchoolError}
          readOnly
        />
        <article className="text-[10px] mt-1">
          If you want to update your current school, Contact to{" "}
          <a
            href="mailTo:team@mvpz.io?subject=Request for update current school."
            className="text-primary"
          >
            MVPz
          </a>
        </article>
      </div>
      <TextInput
        label={"Previous School"}
        value={user.previousSchool}
        onChange={(e) =>
          setUser({ ...user, previousSchool: e.currentTarget.value })
        }
      />
      <TextInput
        label={"Conference"}
        value={user.conference}
        onChange={(e) =>
          setUser({ ...user, conference: e.currentTarget.value })
        }
      />
      <TextInput
        label={"Primary Sport"}
        value={user.primarySport}
        onChange={(e) =>
          setUser({ ...user, primarySport: e.currentTarget.value })
        }
      />
      <TextInput
        label={"Secondary Sport"}
        value={user.secondarySport}
        onChange={(e) =>
          setUser({ ...user, secondarySport: e.currentTarget.value })
        }
      />
      <TextInput
        label={"Primary Position"}
        value={user.primaryPosition}
        onChange={(e) =>
          setUser({ ...user, primaryPosition: e.currentTarget.value })
        }
      />
      <TextInput
        label={"Secondary Position"}
        value={user.secondaryPosition}
        onChange={(e) =>
          setUser({ ...user, secondaryPosition: e.currentTarget.value })
        }
      />

      <TextInput
        label={"Hometown"}
        value={user.homeTown}
        onChange={(e) => setUser({ ...user, homeTown: e.currentTarget.value })}
      />

      <Select
        label="Class"
        placeholder="Pick one"
        data={classOptions}
        value={user?.class}
        onChange={(e) => setUser({ ...user, class: e })}
      />

      <Title order={3} align="center">
        Upload Images
      </Title>

      <FileInput
        label="Upload Profile Image"
        // placeholder="Select file"
        onChange={setProfileImage}
        accept="image/png,image/jpeg,image/jpg/image/gif"
      />
      {!!profileImage ? (
        <Image src={URL.createObjectURL(profileImage)} width={200}></Image>
      ) : !!user.profileDisplayImage ? (
        <Image src={user.profileDisplayImage} width={200}></Image>
      ) : null}
      <FileInput
        label="Upload Banner Image"
        // placeholder="Select file"
        onChange={setBannerImage}
        accept="image/png,image/jpeg,image/jpg,image/gif"
      />

      {!!bannerImage ? (
        <Image src={URL.createObjectURL(bannerImage)} width={200}></Image>
      ) : !!user.bannerDisplayImage ? (
        <Image src={user.bannerDisplayImage} width={200}></Image>
      ) : null}
      <FileInput
        label="Upload Card Image"
        // placeholder="Select file"
        onChange={setCardImage}
        accept="image/png,image/jpeg,image/jpg"
      />
      {!!cardImage ? (
        <Image src={URL.createObjectURL(cardImage)} width={200}></Image>
      ) : !!user.cardDisplayImage ? (
        <Image src={user.cardDisplayImage} width={200}></Image>
      ) : null}

      <Title order={3} align="center">
        Social Information
      </Title>
      <Stack>
        <SimpleGrid
          breakpoints={[
            { minWidth: 240, cols: 1 },
            { minWidth: "md", cols: 2 },
          ]}
        >
          <TextInput
            value={user.facebookUrl}
            icon={<IconAt size={18} />}
            label="Facebook handle"
            onChange={(e) =>
              setUser({ ...user, facebookUrl: e.currentTarget.value })
            }
          />
          <TextInput
            value={user.twitterUrl}
            icon={<IconAt size={18} />}
            label="Twitter handle"
            onChange={(e) =>
              setUser({ ...user, twitterUrl: e.currentTarget.value })
            }
          />
        </SimpleGrid>
        <SimpleGrid
          breakpoints={[
            { minWidth: 240, cols: 1 },
            { minWidth: "md", cols: 2 },
          ]}
        >
          <TextInput
            value={user.instagramUrl}
            icon={<IconAt size={18} />}
            label="Instagram handle"
            onChange={(e) =>
              setUser({ ...user, instagramUrl: e.currentTarget.value })
            }
          />
          <TextInput
            value={user.linkedinUrl}
            icon={<IconAt size={18} />}
            label="Linkedin handle"
            onChange={(e) =>
              setUser({ ...user, linkedinUrl: e.currentTarget.value })
            }
          />
        </SimpleGrid>
        <SimpleGrid
          breakpoints={[
            { minWidth: 240, cols: 1 },
            { minWidth: "md", cols: 2 },
          ]}
        >
          <TextInput
            value={user.tiktokUrl}
            icon={<IconAt size={18} />}
            label="Tiktok handle"
            onChange={(e) =>
              setUser({ ...user, tiktokUrl: e.currentTarget.value })
            }
          />
        </SimpleGrid>
      </Stack>
      <Group mb={64} mt={32}>
        <Button onClick={submitUser} className="gap-2">
          Submit {loading && <Loader color="white" ml={8} size={20} />}
        </Button>
        <Button variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
      </Group>
    </Stack>
  );
}
