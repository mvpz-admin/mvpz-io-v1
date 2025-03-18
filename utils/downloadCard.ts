import { toPng, toSvg } from "html-to-image";

export const downloadCard = async (ref,cardName) => {
    if (ref.current) {
        try {
          const dataUrl = await toSvg(ref.current);
          // Create a download link
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = cardName+'.svg';
          link.click();
        } catch (error) {
          console.error('Failed to convert to image', error);
        }
      }
}

export const getCardFile = async (ref) => {
    if (ref.current) {
        try {
          // Get the SVG markup as a string directly
          const dataUrl = await toPng(ref.current);
          const base64String = dataUrl.split(',')[1]; // Base64 part
          return "data:image/png;base64,"+base64String
        } catch (error) {
          console.error('Failed to convert to SVG file', error);
          return null;
        }
      }
      return null;
}