import { Autocomplete, Button, FileInput, Group, Image, Loader, MultiSelect, NumberInput, Select, SimpleGrid, Stepper, Textarea, TextInput, Title } from "@mantine/core";
import {  useState } from "react";
import { useRouter } from "next/router";
import { callAPI, NCAA_SPORTS, SCHOOLS, uploadImageToBackblaze } from "../lib/utils";
import { IconAt } from "@tabler/icons-react";
import { useSession } from "next-auth/react";


export default function UserForm(props){
    const isAdmin = props.isAdmin || false
    const router = useRouter()
    const {update} = useSession()
    const [user, setUser] = useState(props.user ? props.user : {
        email                : '',
        name                 : '',
        image                : '',
        bannerImage          : '',
        cardImage            : '',
        firstname            : '',
        lastname             : '',
        mobile               : '',
        aboutMe              : '',
        username             : '',
        role                 : '',
        sex                  : '',
        currentSchool        : '',
        previousSchool       : '',
        conference           : '',
        primarySport         : '',
        secondarySport       : '',
        primaryPosition      : '',
        secondaryPosition    : '',
        remainingEligibility : '',
        homeTown             : '',
        onboardingNo         : ''
    })
    const [profileImage, setProfileImage] = useState(null)
    const [bannerImage, setBannerImage] = useState(null)
    const [cardImage, setCardImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitUser = async() => {
        let userBody = user
        if(!!profileImage || !!bannerImage || !!cardImage){
            const backblazeImage = await callAPI({endpoint: '/api/image/uploadBackBlaze', method: 'GET', params: {bucketType: 'user'}})
                
            if(backblazeImage.uploadUrl){
                const uploadUrl = backblazeImage.uploadUrl
                const authToken = backblazeImage.authorizationToken
                const name = `${(user.name || user.firstname).replace(' ','')}_${user.username.replace('.','')}`
                // Profile image
                if(profileImage){
                    const extn = profileImage.name.split(".")
                    const imageName = `${name}_profileimage.${extn[1]|| 'png'}`
                    const response = await uploadImageToBackblaze(profileImage, imageName, uploadUrl, authToken)
                    if(response){
                        userBody.image = imageName
                    }
                }
                if(!!bannerImage){
                    const extn = bannerImage.name.split(".")
                    const imageName = `${name}_bannerImage.${extn[1]|| 'png'}`
                    const response =  await uploadImageToBackblaze(bannerImage, imageName, uploadUrl, authToken)
                    if(response){
                        userBody.bannerImage = imageName
                    }
                }
                if(!!cardImage){
                    const extn = cardImage.name.split(".")
                    const imageName = `${name}_cardImage.${extn[1]|| 'png'}`
                    const response =  await uploadImageToBackblaze(cardImage, imageName, uploadUrl, authToken)
                    if(response){
                        userBody.cardImage = imageName
                    }
                }
            }
        }
        userBody.name = user?.name
        userBody.firstname = user?.name?.split(" ")[0]
        userBody.lastname = user?.name?.split(" ")[1]
        if(!userBody.socialLinks?.length){
            userBody.socialLinks = []
        }
        if(userBody.facebookUrl){
            const fbLink = userBody.socialLinks?.find(l => l.socialBrand === 'facebook')
            !!fbLink ? fbLink.link = userBody.facebookUrl : userBody.socialLinks.push({socialBrand: 'facebook', link: userBody.facebookUrl})
        }
        if(userBody.twitterUrl){
            const twitterLink = userBody.socialLinks?.find(l => l.socialBrand === 'X' || l.socialBrand === 'twitter')
            !!twitterLink ? twitterLink.link = userBody.twitterUrl : userBody.socialLinks.push({socialBrand: 'twitter', link: userBody.twitterUrl})
        }
        if(userBody.instagramUrl){
            const instaLink = userBody.socialLinks?.find(l => l.socialBrand === 'instagram')
            !!instaLink ? instaLink.link = userBody.instagramUrl : userBody.socialLinks.push({socialBrand: 'instagram', link: userBody.instagramUrl})
        }
        if(userBody.linkedinUrl){
            const linkedinLink = userBody.socialLinks?.find(l => l.socialBrand === 'linkedin')
            !!linkedinLink ? linkedinLink.link = userBody.linkedinUrl : userBody.socialLinks.push({socialBrand: 'linkedin', link: userBody.linkedinUrl})
        }
        setLoading(true)
        const response = await callAPI({method: 'POST', endpoint: '/api/user/updateProfile', body: userBody})
        setLoading(false)
        if(response){
            router.push('/fanzone/profile/user')
        }
        update()
    }

    return ( loading ? <Group position="center"><Loader/></Group> :
        <div>
            {/* <Title mb={32}>{props.user ? "Edit User" : "Create New User"}</Title> */}
            <Title  order={3} align="center">Personal Information</Title>
            <SimpleGrid mb={20} breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'md', cols: 1}]}>
                {/* <TextInput className="w-full" label={"First Name"} value={user.firstname} onChange={e => setUser({...user, firstname: e.currentTarget.value})}/>
                <TextInput className="w-full" label={"Last Name"} value={user.lastname} onChange={e => setUser({...user, lastname: e.currentTarget.value})}/> */}
                <TextInput className="w-full" label={"Full Name"} value={user.name} onChange={e => setUser({...user, name: e.currentTarget.value})}/>
            </SimpleGrid>
            <SimpleGrid mb={20} breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'md', cols: 2}]}>
                <TextInput className="w-full" label={"Email"} disabled={!isAdmin} value={user.email} onChange={e => setUser({...user, email: e.currentTarget.value})}/>
                <TextInput className="w-full" label={"Mobile"} value={user.mobile} onChange={e => setUser({...user, mobile: e.currentTarget.value})}/>
            </SimpleGrid>
            <SimpleGrid mb={20} breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'md', cols: 2}]}>
                <TextInput className="w-full" label={"Username"} value={user.username} onChange={e => setUser({...user, username: e.currentTarget.value})}/>
                <Select
                    label="Select Sex"
                    placeholder="Pick one"
                    value={user.sex}
                    data={[{label: "Male", value: "Male"},{label: "Female", value: "Female"}]}
                    onChange={e => {
                            setUser({...user, sex: e})
                        }
                    }
                />
            </SimpleGrid>
            <Textarea label={"About me"} value={user.aboutMe} onChange={e => setUser({...user, aboutMe: e.currentTarget.value})}/>
            <Title order={3} align="center" mt={64} mb={10}>Additional Information</Title>
            <Autocomplete
                label="What's your favourite college team?"
                placeholder="Type to search and select"
                data={SCHOOLS}
                value={user.favoriteCollegeTeam || ''}
                onChange={e => setUser({...user, favoriteCollegeTeam: e})}
                mb={20}
            />
            <Select
                label="What's your favourite NCAA sport?"
                placeholder="Pick one"
                data={NCAA_SPORTS}
                value={user?.primarySport || ''}
                onChange={e => setUser({...user, primarySport: e})}
                mb={20}
            />
            <MultiSelect
                label="What other sports do you like or follow?"
                placeholder="Pick one or more"
                data={NCAA_SPORTS}
                value={user?.secondarySport?.split(',')}
                onChange={e => setUser({...user, secondarySport: e.join()})}
                mb={20}
            />
            <Title order={3} align="center" mt={64} mb={10}>Upload Images</Title>
            <FileInput label="Upload Profile Image" 
             mb={20}
            // placeholder="Select file"
             onChange={setProfileImage} accept="image/png,image/jpeg,image/jpg,image/gif"/>
            {!!profileImage ? <Image src={URL.createObjectURL(profileImage)} width={200}></Image> : !!user.profileDisplayImage ? <Image src={user.profileDisplayImage} width={200}></Image> : null}
            <FileInput  mb={20} label="Upload Banner Image" 
            // placeholder="Select file"
             onChange={setBannerImage} accept="image/png,image/jpeg,image/jpg,image/gif"/>
            {!!bannerImage ? <Image src={URL.createObjectURL(bannerImage)} width={200}></Image> : !!user.bannerDisplayImage ? <Image src={user.bannerDisplayImage} width={200}></Image> : null}
            <Title order={3} align="center" mt={64} mb={10}>Social Information</Title>
            <div>
                <SimpleGrid mb={20} breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'md', cols: 2}]}>
                    <TextInput className="w-full" value={user.facebookUrl} icon={<IconAt size={18}/>} label="Facebook handle" onChange={e => setUser({...user, facebookUrl: e.currentTarget.value})}/>
                    <TextInput className="w-full" value={user.twitterUrl} icon={<IconAt size={18}/>} label="Twitter handle" onChange={e => setUser({...user, twitterUrl: e.currentTarget.value})}/>
                </SimpleGrid>
                <SimpleGrid mb={20} breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'md', cols: 2}]}>
                    <TextInput className="w-full" value={user.instagramUrl} icon={<IconAt size={18}/>} label="Instagram handle" onChange={e => setUser({...user, instagramUrl: e.currentTarget.value})}/>
                    <TextInput className="w-full" value={user.linkedinUrl} icon={<IconAt size={18}/>} label="Linkedin handle" onChange={e => setUser({...user, linkedinUrl: e.currentTarget.value})}/>
                </SimpleGrid>
            </div>
            <Group mb={64} mt={32}>
                <Button onClick={submitUser}>Save</Button>
                <Button variant={'outline'} onClick={() => router.back()}>Cancel</Button>
            </Group>
        </div>
    )
}