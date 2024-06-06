interface ApiResponseError extends Error {
    response?: {
      data?: {
        message?: string;
      };
    };
  }


export const handleError = (error: ApiResponseError, rejectWithValue: (value: string | unknown) => void) => {
    console.error('Error occurred:', error);
  
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Server error:', error.response.data.message);
      return rejectWithValue(error.response.data.message);
    } 
    else if (error.message) {
      console.log('Error message:', error.message);
      return rejectWithValue(error.message);
    } 
    else {
      console.log(error.response,"%%%%%%%%%%%%%%%%%%");
      console.log('Generic error handler triggered.');
      return rejectWithValue("An unknown error occurred");
    }
  }