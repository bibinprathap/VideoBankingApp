export const addattachment = (propertyvalue ) => ({
    type: 'ADD_NEWATTACHMENT',
    payload:propertyvalue
  });
  export const uploadAttachmentSuccess = (propertyvalue ) => ({
    type: 'ATTACHMENT_UPLOAD_SUCCESS',
    payload:propertyvalue
  });
  export const uploadAttachmentError = (propertyvalue ) => ({
    type: 'ATTACHMENT_UPLOAD_ERROR',
    payload:propertyvalue
  });
  export const uploadAttachmentStarted = (propertyvalue ) => ({
    type: 'ATTACHMENT_STARTED_UPLOADING',
    payload:propertyvalue
  });