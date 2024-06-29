import { FC, useState, useRef, useEffect, ChangeEvent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ImageUploadIcon } from "@/components/parts/ImageUploadIcon";
import { toast, Toaster } from "sonner";
import { ImageUpload } from "@/utils/cloudinary/uploadImage";

interface CustomImageFileInputProps {
	onChange: (file: File | null | string) => void;
	theme: string;
	initialValue?: string; // Add initialValue prop
}

export const CustomImageFileInput: FC<CustomImageFileInputProps> = ({
	onChange,
	theme,
	initialValue = "", // Set default value to empty string
}) => {

	const [imageUrl, setImageUrl] = useState<string | null>(initialValue); // Use initialValue
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (initialValue) {
			setImageUrl(initialValue);
		}
	}, [initialValue]);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		setLoading(true);


		try {
			const imageUrl = await ImageUpload(file);

			if (!imageUrl) {
				throw new Error("Image upload failed");
			}

			setImageUrl(imageUrl);
			onChange(imageUrl);
		} catch (error) {
			toast.error("Image upload failed. Please check the console for details.");
			console.error("Image upload error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleClearFile = () => {

		setImageUrl(null);
		onChange(null);
	};

	return (
		<div
			className={`lg:h-80 border-dashed border-2 rounded-lg text-center ${
				theme === "light" ? "bg-gray-100 border-gray-200" : "bg-gray-800 border-gray-700"
			}`}
		>
			<Toaster position="top-center" richColors />
			{imageUrl ? ( // Check for imageUrl instead of selectedFile
				<div className="mt-4 lg:h-80 lg:mt-0 relative">
					<img
						src={imageUrl || ""}
						alt="Uploaded"
						className="w-full h-full object-cover rounded-lg"
					/>
					{loading && (
						<div className="absolute inset-0 flex justify-center items-center bg-opacity-50 rounded-lg">
							<ClipLoader color={theme === "light" ? "#000000" : "#FFFFFF"} />
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
				<div className="lg:mt-20">
					<div className="flex justify-center">
						<ImageUploadIcon />{" "}
						{/* Update this line with the correct component */}
					</div>
					<p className="text-sm text-gray-400 my-2">
						Drag and drop an image file here, or click to upload
					</p>
					<button
						type="button"
						className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
						onClick={handleButtonClick}
					>
						Upload Image
					</button>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						accept="image/*"
						className="hidden"
					/>
					<p className="text-xs leading-5 p-1 text-gray-400">
						Image up to 10MB
					</p>
				</div>
			)}
		</div>
	);
};
 