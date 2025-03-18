import { Button, Group, Loader, Modal, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandX } from "@tabler/icons-react"
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";

export default function SocialLinks({socialLinks=[], isMyProfile=false}){
   
    const [loading, setLoading] = useState(false)
    const [socialOpened, { close: closeSocialModal, open: openSocialModal }] =  useDisclosure()
    const [twitterUrl, setTwitterUrl] = useState(null)
    const [instagramUrl, setInstagramUrl] = useState(null)
    const [facebookUrl, setFacebookUrl] = useState(null)
    const [linkedinUrl, setLinkedinUrl] = useState(null)
    const [tiktokUrl, setTiktokUrl] = useState(null)
    const saveSocial = async () => {
        if (facebookUrl) {
          const fbLink = socialLinks?.find(
            (l) => l.socialBrand === "facebook"
          );
          !!fbLink
            ? (fbLink.link = facebookUrl)
            : socialLinks.push({
                socialBrand: "facebook",
                link: facebookUrl,
              });
        }
        if (twitterUrl) {
          const twitterLink = socialLinks?.find(
            (l) => l.socialBrand === "X" || l.socialBrand === "twitter"
          );
          !!twitterLink
            ? (twitterLink.link = twitterUrl)
            : socialLinks.push({
                socialBrand: "twitter",
                link: twitterUrl,
              });
        }
        if (instagramUrl) {
          const instaLink = socialLinks?.find(
            (l) => l.socialBrand === "instagram"
          );
          !!instaLink
            ? (instaLink.link = instagramUrl)
            : socialLinks.push({
                socialBrand: "instagram",
                link: instagramUrl,
              });
        }
        if (linkedinUrl) {
          const linkedinLink = socialLinks?.find(
            (l) => l.socialBrand === "linkedin"
          );
          !!linkedinLink
            ? (linkedinLink.link = linkedinUrl)
            : socialLinks.push({
                socialBrand: "linkedin",
                link: linkedinUrl,
              });
        }
        if (tiktokUrl) {
          const tiktokLink = socialLinks?.find(
            (l) => l.socialBrand === "tiktok"
          );
          !!tiktokLink
            ? (tiktokLink.link = tiktokUrl)
            : socialLinks.push({
                socialBrand: "tiktok",
                link: tiktokUrl,
              });
        }
        if (socialLinks.length) {
          setLoading(true);
          const response = await callAPI({
            method: "POST",
            body: { socialLinks: socialLinks },
            endpoint: "/api/user/updateProfile",
          });
          setLoading(false);
        }
        closeSocialModal();
    };

    useEffect(() => {
        function setUrls(){
            setInstagramUrl(socialLinks?.find((l) => l.socialBrand === "instagram")?.link || null)
            setTiktokUrl(socialLinks?.find((l) => l.socialBrand === "tiktok")?.link || null)
            setFacebookUrl(socialLinks?.find((l) => l.socialBrand === "facebook")?.link || null)
            setLinkedinUrl(socialLinks?.find((l) => l.socialBrand === "linkedin")?.link || null)
            setTwitterUrl(socialLinks?.find((l) => l.socialBrand === "X" || l.socialBrand === 'twitter')?.link || null)
        }
        setUrls()
    },[socialLinks])

    return(
        <Group position="apart">
            {socialLinks.length ? 
            <Group spacing={"xl"} position="center" mt={32}>
            {!!instagramUrl && (
                <a href={instagramUrl} target="_blank">
                <IconBrandInstagram size={36} />
                </a>
            )}
            {!!twitterUrl && (
                <a href={twitterUrl} target="_blank">
                <IconBrandX size={36} />
                </a>
            )}
            {!!facebookUrl && (
                <a href={facebookUrl} target="_blank">
                <IconBrandFacebook size={36} />
                </a>
            )}
            {!!linkedinUrl && (
                <a href={linkedinUrl} target="_blank">
                <IconBrandLinkedin size={36} />
                </a>
            )}
            {!!tiktokUrl && (
                <a href={tiktokUrl} target="_blank">
                <IconBrandTiktok size={36} />
                </a>
            )}
            </Group> : 
            <Text>None</Text>}
            {isMyProfile && <Button variant={'subtle'}  onClick={openSocialModal}>Edit</Button>}
            <Modal
                size={"lg"}
                centered
                opened={socialOpened}
                onClose={closeSocialModal}
                title="Social Links"
                overlayProps={{ opacity: 0.55, blur: 3 }}
              >
                <Stack>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                        <TextInput
                        value={facebookUrl}
                        icon={<IconAt size={18} />}
                        label="Facebook handle"
                        onChange={(e) =>
                            setFacebookUrl(e.currentTarget.value)
                        }
                        />
                        <TextInput
                        value={twitterUrl}
                        icon={<IconAt size={18} />}
                        label="Twitter handle"
                        onChange={(e) =>
                            setTwitterUrl(e.currentTarget.value)
                        }
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                        <TextInput
                        value={instagramUrl}
                        icon={<IconAt size={18} />}
                        label="Instagram handle"
                        onChange={(e) =>
                            setInstagramUrl(e.currentTarget.value)
                        }
                        />
                        <TextInput
                        value={linkedinUrl}
                        icon={<IconAt size={18} />}
                        label="Linkedin handle"
                        onChange={(e) =>
                            setLinkedinUrl(e.currentTarget.value)
                        }
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                        <TextInput
                        value={tiktokUrl}
                        icon={<IconAt size={18} />}
                        label="Tiktok handle"
                        onChange={(e) =>
                            setTiktokUrl(e.currentTarget.value)
                        }
                        />
                    </SimpleGrid>
                    <Group position="right">
                        <Button variant={"outline"} onClick={closeSocialModal}>
                        Cancel
                        </Button>
                        {loading ? <Loader size={'sm'}/>  : <Button onClick={saveSocial}>Save</Button>}
                    </Group>
                </Stack>
              </Modal>
        </Group>
    )
}