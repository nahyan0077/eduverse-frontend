import axios from 'axios';

export const VideoUploadWithDuration = async (file: File) => {
  const presetKey = import.meta.env.VITE_REACT_APP_PRESET_KEY;
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

  if (!presetKey || !cloudName) {
    console.error('Cloudinary preset key or cloud name is missing');
    return null;
  }

  // Create a promise to get the video duration
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.onerror = () => {
        reject('Failed to load video metadata');
      };

      video.src = URL.createObjectURL(file);
    });
  };

  try {
    // Get the video duration
    const duration = await getVideoDuration(file);

    // Prepare the form data for Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', presetKey);

    // Upload the video to Cloudinary
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
    const { format, secure_url } = res.data;

    if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'm4v'].includes(format)) {
      return { secure_url, duration }; // Return both URL and duration
    } else {
      console.error('Uploaded file is not a supported video format:', res.data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading video:', error);
    return null;
  }
};
