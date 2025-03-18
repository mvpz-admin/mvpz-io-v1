import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";

export const getIcons = (name,color = "white" ,size = 20 ) => {
    switch(name){
        case "Facebook":
        case "facebook":
        case "FACEBOOK":
            return <FaFacebook color={color} size={size} />
        case "Instagram":
        case "instagram":
        case "INSTAGRAM":
            return <FaInstagram color={color} size={size} />
        case "Twitter":
        case "twitter":
        case "TWITTER":
        case "X":
        case "x":
            return <FaXTwitter color={color} size={size} />
        case "Tiktok":
        case "tiktok":
        case "TIKTOK":
            return <FaTiktok color={color} size={18} />
        case "Linkedin":
        case "linkedin":
        case "LIKEDIN":
            return <FaLinkedin color={color} size={size} />
        case "Youtube":
        case "youtube":
        case "YOUTUBE":
            return <FaYoutube color={color} size={size} />
    }
}