import React, { useState, useRef, useCallback } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Image from "next/image";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { useAuthStore } from "../../../store/useAuthStore";
import { callAPI, uploadImageToBackblaze } from "../../../lib/utils";

// Constants
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const CROPPER_ASPECT_RATIO = 2 / 3;

// Interfaces

interface UploadError {
  message: string;
  code: "FILE_SIZE" | "FILE_TYPE" | "UPLOAD_FAILED" | "VALIDATION_ERROR";
}

// Step components interfaces
interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

// Header Component
const Header: React.FC<{ step: number }> = ({ step }) => (
  <div className="relative flex items-center justify-between px-8 py-5 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90 border-b border-gray-700/30">
    {/* Background Accent */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_50%)]" />

    {/* Left Section */}
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg shadow-primary/5">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-lg opacity-50" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create MVPz Card
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="relative group">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  num <= step
                    ? "bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                    : "bg-gray-600/30"
                }`}
              />
              {num < 3 && (
                <div
                  className={`w-8 h-[2px] mx-2 transition-all duration-300 ${
                    num < step ? "bg-primary" : "bg-gray-600/30"
                  }`}
                />
              )}
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800/90 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg border border-gray-700/50">
              {num === 1
                ? "Get Started"
                : num === 2
                ? "Upload Photo"
                : "Customize Card"}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CardCreator = () => {
  const [step, setStep] = useState<number>(1);
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [canUseSchoolLogo,setCanUseSchoolLogo] = useState(false)
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardData, setCardData] = useState<any>({});
  const cropperRef = useRef<Cropper>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useAuthStore((state) => state);

  // Function to convert base64 to File
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Function to generate random ID
  const generateRandomId = () => {
    return (
      "id-" +
      Math.random().toString(36).substr(2, 9) +
      "-" +
      Date.now().toString(36)
    );
  };

  // Function to upload image to Backblaze
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
          return `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-crickit/${path}`;
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
    return null;
  };

  // Function to get frame image as base64
  const getCardFile = async (
    frameRef: React.RefObject<HTMLDivElement>
  ): Promise<string> => {
    if (!frameRef.current) return "";

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return "";

    // Get the frame image element
    const frameImage = frameRef.current.querySelector("img");
    if (!frameImage) return "";

    canvas.width = frameImage.width;
    canvas.height = frameImage.height;

    context.drawImage(frameImage, 0, 0);
    return canvas.toDataURL("image/png");
  };

  const handleError = (error: UploadError) => {
    setError(error.message);
    setTimeout(() => setError(null), 5000);
  };

  // Step 1: Get Started Screen
  const GetStartedScreen: React.FC<StepProps> = ({ onNext }) => (
    <div className="flex flex-col h-full p-4 py-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Create Your MVPz Card
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your best action shot! Sports fans need a card to join the
            Tribe. Make sure they choose yours by selecting the best image!
          </p>
        </div>

        {/* Cards Showcase */}
        <div className="relative h-[300px] sm:h-[400px] mb-12">
          {/* Example Cards */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] z-30 transform hover:scale-110 transition-all duration-300 hover:rotate-0 -rotate-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dv667zlni/image/upload/v1742165837/Athlete_Cards_bsquyv.webp"
                alt="Example Card 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-sm font-semibold text-white text-center">
                    Premium Card
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] z-20 transform hover:scale-110 transition-all duration-300 hover:rotate-0 rotate-6">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dv667zlni/image/upload/v1742164043/4_as0jcj.png"
                alt="Example Card 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-sm font-semibold text-white text-center">
                    Special Edition
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] z-10 transform hover:scale-110 transition-all duration-300 hover:rotate-0 -rotate-6">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dv667zlni/image/upload/v1742164045/38_jaowqz.png"
                alt="Example Card 3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-sm font-semibold text-white text-center">
                    Limited Edition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Image requirements:
            </h2>
            <ul className="space-y-3">
              {[
                "High-quality",
                "Relevant to your sport",
                "Up to date",
                "Fits the frame",
                "You are clearly visible",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onNext}
            className="w-full mt-6 bg-primary text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 group font-semibold text-lg mb-10"
          >
            Get Started
            <svg
              className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Step 2: Photo Upload Screen
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        handleError({
          message: "Invalid file type. Please upload a JPG or PNG file.",
          code: "FILE_TYPE",
        });
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        handleError({
          message: "File size exceeds 5MB limit.",
          code: "FILE_SIZE",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.onerror = () =>
        handleError({
          message: "Failed to read file.",
          code: "UPLOAD_FAILED",
        });
      reader.readAsDataURL(file);
    },
    []
  );

  const handleCrop = useCallback(() => {
    if (!cropperRef.current) return;

    try {
      const croppedDataUrl = cropperRef.current.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      setCardData((prev) => ({ ...prev, imageUrl: croppedDataUrl }));
      setStep(3);
    } catch (error) {
      handleError({
        message: "Failed to crop image.",
        code: "UPLOAD_FAILED",
      });
    }
  }, []);

  const PhotoUploadScreen: React.FC<StepProps> = ({ onBack }) => (
    <div className="p-8 h-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Photo</h2>
      <p className="text-gray-300 mb-6">
        Finalize your card and submit for review
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-500 bg-opacity-20 text-red-500 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}

      {!image ? (
        <div
          className="border-2 md:w-[500px] w-full border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES.join(",")}
            onChange={handleFileUpload}
            className="hidden"
          />
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="text-lg mb-2">Click to upload or drag image here</div>
          <p className="text-sm text-gray-400">
            Supported formats: JPG, PNG (Max 5MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative h-[400px] border rounded-lg overflow-hidden">
            <img
              ref={(node) => {
                if (node) {
                  cropperRef.current = new Cropper(node, {
                    aspectRatio: CROPPER_ASPECT_RATIO,
                    viewMode: 1,
                    guides: true,
                    dragMode: "move",
                  });
                }
              }}
              src={image}
              alt="Upload preview"
              className="max-w-full h-auto"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setImage(null);
                cropperRef.current?.destroy();
                if (onBack) onBack();
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              Confirm Crop
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Step 3: Final Upload Screen
  const handleUpload = async () => {
    if (!isAccepted || !croppedImage || !image) return;

    setIsUploading(true);
    setError(null);

    try {
      // Convert images to files
      const croppedFile = base64ToFile(
        croppedImage,
        `cropped_image_${generateRandomId()}.png`
      );
      const originalFile = base64ToFile(
        image,
        `original_image_${generateRandomId()}.png`
      );
      const frameBase64 = await getCardFile(frameRef);
      const frameFile = base64ToFile(
        frameBase64,
        `frame_image_${generateRandomId()}.png`
      );

      // Define paths for upload
      const croppedImagePath = `card-request/${
        process?.env?.NEXT_PUBLIC_BACKBLAZE_TYPE
      }/${user?.username}/cropped_${generateRandomId()}.png`;
      const originalImagePath = `card-request/${
        process?.env?.NEXT_PUBLIC_BACKBLAZE_TYPE
      }/${user?.username}/original_${generateRandomId()}.png`;
      const frameImagePath = `card-request/${
        process?.env?.NEXT_PUBLIC_BACKBLAZE_TYPE
      }/${user?.username}/frame_${generateRandomId()}.png`;

      // Upload all images
      const [croppedImageUrl, originalImageUrl, frameImageUrl] =
        await Promise.all([
          uploadImage(croppedFile, croppedImagePath),
          uploadImage(originalFile, originalImagePath),
          uploadImage(frameFile, frameImagePath),
        ]);

      if (croppedImageUrl && originalImageUrl && frameImageUrl) {
        // Send request to API

        let response = await callAPI({
          endpoint: `/v1/athlete/request_card`,
          method: "POST",
          body: {
            cropped_image_url: croppedImageUrl,
            origin_image_url: originalImageUrl,
            frame_image_url: frameImageUrl,
            canUseSchoolLogo
          },
        });

        if (response.sucess) {
          setUser({
            ...user,
            isCardCreated: "PENDING",
          });
        } else {
          throw new Error("Failed to create card");
        }
      }
    } catch (error) {
      handleError({
        message: "Failed to create card. Please try again.",
        code: "UPLOAD_FAILED",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const FinalUploadScreen: React.FC<StepProps> = ({ onBack }) => (
    <div className="p-4 sm:p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          Customize Your Card
        </h2>
        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
          Add your details and customize how your card will appear.
        </p>

        {error && (
          <div className="mb-4 p-3 sm:p-4 bg-red-500 bg-opacity-20 text-red-500 rounded-lg flex items-center gap-2 text-sm">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Card Preview */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-medium mb-4">Card Preview</h3>
            <div
              ref={frameRef}
              className="relative w-[280px] sm:w-[300px] h-[420px] sm:h-[450px] border rounded-lg overflow-hidden bg-gray-800"
            >
              {croppedImage && (
                <>
                  <img
                    src={croppedImage}
                    alt="Card Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 w-full h-full">
                    <Image
                      src="https://res.cloudinary.com/dv667zlni/image/upload/v1742166047/Athlete_Cards_1_rqbip3.webp"
                      alt="200"
                      width={500}
                      height={500}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Info Sections */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Card Approval Process */}
              <div className="flex items-start gap-3 sm:gap-4 pb-6 border-b border-gray-700">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-glow">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">
                    Card Approval Process
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Your card will undergo a brief review process to ensure
                    quality standards. This typically takes 24-48 hours. We'll
                    notify you once your card is approved.
                  </p>
                </div>
              </div>

              {/* Earning Potential */}
              <div className="flex items-start gap-3 sm:gap-4 pb-6 border-b border-gray-700">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-glow">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">
                    Earning Potential
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Once approved, your card becomes available for purchase.
                    Share your card with family and friends and ask them to
                    share. You earn 40-80% of each sale!
                  </p>
                </div>
              </div>

              {/* Personalization Options */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-glow">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">
                    Personalise Your Card
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Unlock enhancements and collaborate with artists to redesign
                    your card. Unique and rare designs can increase your card's
                    value.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-700/50">
                    <label className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={canUseSchoolLogo}
                        onChange={(e) => setCanUseSchoolLogo(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 bg-gray-700"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        I do not have permission to use the school's logo and
                        require MVPz to remove it from the image
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 bg-gray-700"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  I confirm I have permission to use this image and accept the
                  terms
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={onBack}
            className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
            disabled={isUploading}
          >
            Back
          </button>
          <button
            onClick={handleUpload}
            disabled={!isAccepted || isUploading}
            className={`px-4 sm:px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2 text-sm sm:text-base ${
              !isAccepted || isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            } transition`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="sm:inline">Creating Card...</span>
              </>
            ) : (
              "Create Card"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Render current step
  const renderStep = () => {
    const goToNext = () => setStep((prev) => prev + 1);
    const goBack = () => setStep((prev) => prev - 1);

    switch (step) {
      case 1:
        return <GetStartedScreen onNext={goToNext} />;
      case 2:
        return <PhotoUploadScreen onNext={goToNext} onBack={goBack} />;
      case 3:
        return <FinalUploadScreen onNext={goToNext} onBack={goBack} />;
      default:
        return <GetStartedScreen onNext={goToNext} />;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center font-inter">
      <div className="relative w-[90%] h-[90%] rounded-xl bg-secondary flex flex-col overflow-hidden">
        <Header step={step} />
        <div className="flex-1 overflow-y-auto">{renderStep()}</div>
        {/* line loading */}
        {isUploading && (
          <div className="absolute top-0 left-0 w-full">
            <LineLoadingEffect />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCreator;
