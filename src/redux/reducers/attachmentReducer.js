import update, { extend } from 'immutability-helper';


// Initial State
const initialState = {
    pendingUploads:[],
    allattachments:[]
  };
    const createNewattachment  = (customUploadId, uri)=>{
      return {
        customUploadId,
        uri,
        uploaded:false,
        uploading:false,
        error:false,
        createdDate:new Date(),
        log:[] 
      } 
    };

    const createUploadedAttachment  = (image)=>{
        return {
            ...image,
            uploaded:true,
          uploading:false,
          error:false,
          
        } 
      };
const createErrorAttachment  = (image)=>{
        return {
           ...image,
          uploaded:false,
          uploading:false,
          error:true 
        } 
      };

const createUploadingAttachment  = (image)=>{
        return {
           ...image,
          uploaded:false,
          uploading:true,
          error:false 
        } 
      };
      const clearExistingAttachment  = (state,action)=>{
        let customUploadIdPendingindex = state.pendingUploads
        .map(function (e) {
            return e.customUploadId || 0;
        })
        .indexOf(action.payload.customUploadId || 0);

        let customUploadAllIdindex = state.allattachments
        .map(function (e) {
            return e.customUploadId || 0;
        })
        .indexOf(action.payload.customUploadId || 0); 
         return update(state, {
            pendingUploads:  { $splice: [[customUploadIdPendingindex, 1]] } ,
            allattachments:  { $splice: [[customUploadAllIdindex, 1]] } 
        });

      };
  
// Reducers (Modifies The State And Returns A New State)
const attachmentReducer = (state = initialState, action) => {
    let currentAttachement  = null;
    switch (action.type) { 
       // Decrease Counter
    case 'ADD_NEWATTACHMENT': { 
            const newattachment=createNewattachment(action.payload.customUploadId,action.payload.uri)
            return update(state, {
                pendingUploads: { $push: [newattachment] },
                allattachments: { $push: [newattachment] }
            });
    }
    // Decrease Counter
    case 'ATTACHMENT_UPLOAD_SUCCESS': { 
          currentAttachement  = state.allattachments
        .find(function (e) {
             return e.customUploadId == action.payload.customUploadId
        }) ; 
        const uploadedAttachemnt = createUploadedAttachment(currentAttachement);
         return update(clearExistingAttachment(state,action), { 
            allattachments: { $push: [uploadedAttachemnt] }
        });
    }
    case 'ATTACHMENT_UPLOAD_ERROR': { 
          currentAttachement  = state.allattachments
        .find(function (e) {
             return e.customUploadId == action.payload.customUploadId
        }) ; 
        const errorAttachemnt = createErrorAttachment(currentAttachement);
         return update(clearExistingAttachment(state,action), { 
            pendingUploads: { $push: [errorAttachemnt] },
                allattachments: { $push: [errorAttachemnt] }
        });
    }
    case 'ATTACHMENT_STARTED_UPLOADING': { 
        currentAttachement  = state.allattachments
      .find(function (e) {
           return e.customUploadId == action.payload.customUploadId
      }) ; 
      const uploadingAttachemnt = createUploadingAttachment(currentAttachement);
       return update(clearExistingAttachment(state,action), { 
          pendingUploads: { $push: [uploadingAttachemnt] },
              allattachments: { $push: [uploadingAttachemnt] }
      });
    }// Default
    default: {
      return state;
    }
  }
};

// Exports
export default attachmentReducer;