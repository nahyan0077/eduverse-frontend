import axios from 'axios';


export const PdfUpload = async (file: File) => {
  const presetKey = import.meta.env.VITE_REACT_APP_PRESET_KEY;
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

  console.log(file,"filee");
  

  if (!presetKey || !cloudName) {
    console.error('Cloudinary preset key or cloud name is missing');

    return null;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', presetKey);

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
    const { format, secure_url } = res.data;

    console.log(secure_url,"secure url");
    console.log(res.data,"resp data");
    

    if (format === 'pdf') {
      return secure_url;
    } else {
      console.error('Uploaded file is not a PDF:', res.data);
      console.error('Uploaded file is not a PDF.');
      return null;
    }
  } catch (error) {
    console.error('Error uploading PDF:', error);

    return null;
  }
};
