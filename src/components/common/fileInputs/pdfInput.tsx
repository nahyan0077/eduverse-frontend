import { FC, useState, useRef, ChangeEvent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PdfUploadIcon } from "@/components/parts/PdfUploadIcon";
import { toast, Toaster } from "sonner";
import { PdfUpload } from "@/utils/cloudinary/uploadPDF";

interface CustomPdfFileInputProps {
  onChange: (file: File | null | string) => void;
  theme: string;
}

export const CustomPdfFileInput: FC<CustomPdfFileInputProps> = ({
  onChange,
  theme,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setLoading(true);
    setSelectedFile(file);

    try {
      const pdfUrl = await PdfUpload(file);

      if (!pdfUrl) {
        throw new Error("PDF upload failed");
      }

      setPdfUrl(pdfUrl);
      onChange(pdfUrl);
    } catch (error) {
      toast.error("PDF upload failed. Please check the console for details.");
      console.error("PDF upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPdfUrl(null);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-40 border-dashed border-2 rounded-lg text-center ${
        theme === "light"
          ? "bg-gray-100 border-gray-200"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <Toaster position="top-center" richColors />
      {selectedFile ? (
        <div className="mt-4 lg:h-40 lg:mt-0 relative">
          <iframe src={pdfUrl || ""} className="w-full h-full" />
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 rounded-lg">
              <ClipLoader color={theme === "light" ? "#000000" : "#000000"} />
            </div>
          )}
          <button
            className="z-50 mt-4 bg-gray-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear File
          </button>
        </div>
      ) : (
        <div className="lg:mt-3">
          <div className="flex justify-center">
            <PdfUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop a PDF file here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload PDF
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">PDF up to 10MB</p>
        </div>
      )}
    </div>
  );
};
