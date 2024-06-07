import axios from 'axios';

export const ImageUpload = async (file: File) => {
  const presetKey = import.meta.env.VITE_REACT_APP_PRESET_KEY;
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

  console.log(file, "filee");

  if (!presetKey || !cloudName) {
    console.error('Cloudinary preset key or cloud name is missing');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', presetKey);

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
    const { secure_url } = res.data;

    console.log(secure_url, "secure url");
    console.log(res.data, "resp data");

    return secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
