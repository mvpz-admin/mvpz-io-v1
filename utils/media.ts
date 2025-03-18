import { downloadFile } from "../lib/utils";

export const formatMessageToHTML = (text: string): string => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
  
    const lines = text
      .split("\n")
      .map((line) => {
        // Replace URLs with anchor tags
        const formattedLine = line.replace(linkRegex, (url) => {
          return `<a href="${url}" style="color: #8c52ff;" target="_blank">${url}</a>`;
        });
        return `<p>${formattedLine}</p><br/>`;
      })
      .join("");
  
    return lines;
  };
  

  export const formatMessageToHTMLForComment =  (text: string): string => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
  
    const lines = text
      .split("\n")
      .map((line) => {
        // Replace URLs with anchor tags
        const formattedLine = line.replace(linkRegex, (url) => {
          return "";
        });
        return `<p>${formattedLine}</p><br/>`;
      })
      .join("");
  
    return lines;
  };



  export async function downloadEncryptedImage({imagePath, authToken, bbUrl}) {
    let response 
    if (imagePath) {
        response = await downloadFile(
        `${bbUrl}${imagePath}`,
        authToken
      );
    }
    return response
  }