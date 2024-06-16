import { FC, useState, useRef, useEffect, ChangeEvent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ImageUploadIcon } from "@/components/parts/ImageUploadIcon";
import { toast, Toaster } from "sonner";
import { VideoUploadWithDuration } from "@/utils/cloudinary/uploadVideoWithDuration";

interface CustomVideoFileInputDurationProps {
  onChange: (file: { url: string, duration: number } | null) => void;
  theme: string;
  initialValue?: { url: string; duration: number } | null;
}

export const CustomVideoFileInputDuration: FC<CustomVideoFileInputDurationProps> = ({
  onChange,
  theme,
  initialValue = null,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(initialValue?.url || null);
  const [duration, setDuration] = useState<number | null>(initialValue?.duration || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      setVideoUrl(initialValue.url);
      setDuration(initialValue.duration);
    }
  }, [initialValue]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setLoading(true);
    setSelectedFile(file);

    try {
      const result = await VideoUploadWithDuration(file);

      if (!result) {
        throw new Error("Video upload failed");
      }

      const { secure_url, duration } = result;

      setVideoUrl(secure_url);
      setDuration(duration);
      onChange({ url: secure_url, duration });
    } catch (error) {
      toast.error("Video upload failed. Please check the console for details.");
      console.error("Video upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setVideoUrl(null);
    setDuration(null);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 rounded-lg text-center ${
        theme === "light" ? "bg-gray-100 border-gray-200" : "bg-gray-800 border-gray-700"
      }`}
    >
      <Toaster position="top-center" richColors />
      {videoUrl ? (
        <div className="mt-4 lg:h-80 lg:mt-0 relative">
          <video src={videoUrl || ""} className="w-full h-full" controls />
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 rounded-lg">
              <ClipLoader color={theme === "light" ? "#000000" : "#ffffff"} />
            </div>
          )}
          <button
            className="z-50 mt-4 bg-gray-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear Video
          </button>
        </div>
      ) : (
        <div className="lg:mt-20">
          <div className="flex justify-center">
            <ImageUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">Drag and drop a video file here, or click to upload</p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload Video
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
          <p className="text-xs leading-5 p-1 text-gray-400">Video up to 100MB</p>
        </div>
      )}
    </div>
  );
};
