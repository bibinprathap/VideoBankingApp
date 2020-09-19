import RNBackgroundUpload from 'react-native-background-upload';
import RestApi from '../restapi';
import envConfig from '../config';
import {
  addattachment,
  uploadAttachmentSuccess,
  uploadAttachmentError,
  uploadAttachmentStarted,
} from '../../redux/actions/attachmentactions';
import {store} from '../../redux/store/store';
//'../redux/store/store';
//'./restapi';

const resolveUpload = function(uploadId) {
  return new Promise((resolve, reject) => {
    let l1 = RNBackgroundUpload.addListener('error', uploadId, data => {
      reject(data);
      store.dispatch(uploadAttachmentError({customUploadId: uploadId}));

      cleanup();
    });
    let l2 = RNBackgroundUpload.addListener('cancelled', uploadId, data => {
      reject(data);
      store.dispatch(uploadAttachmentError({customUploadId: uploadId}));
      cleanup();
    });
    let l3 = RNBackgroundUpload.addListener('completed', uploadId, data => {
      resolve(data);

      if (data.responseCode >= 400)
        store.dispatch(uploadAttachmentError({customUploadId: uploadId}));
      else store.dispatch(uploadAttachmentSuccess({customUploadId: uploadId}));

      cleanup();
    });
    let cleanup = () => {
      l1.remove();
      l2.remove();
      l3.remove();
    };
  });
};
export default class uploadHelper {
  static async startUpload(uri, formData, uploadUrl, controller) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    var customUploadID = `u-${new Date().getTime()}`;
    store.dispatch(addattachment({customUploadID, uri}));
    const env = store.getState().environmentReducer;

    const requestUrl = RestApi.parseUrl(env, controller, uploadUrl);
    // const requestUrl = 'http://185.227.239.7:2020/api/SaveFile';

    console.log(requestUrl, 'urll');

    const options = {
      url: requestUrl,
      path: uri || undefined,
      method: 'POST',
      field: 'fileData',
      headers: headers,
      type: 'multipart',

      customUploadId: customUploadID,
    };
    if (formData) options.parameters = formData;

    let res;
    let responseData = null;

    try {
      store.dispatch(uploadAttachmentStarted({customUploadID}));
      await RNBackgroundUpload.startUpload(options);

      res = await resolveUpload(customUploadID);
    } catch (err) {
      throw {
        status: -1,
        _error: err,
        data: {
          code: null,
          detail: null,
          message: 'Network error',
        },
      };
    }

    responseData = res.responseBody;

    if (res.responseCode >= 400) {
      //store.dispatch(uploadAttachmentError({customUploadId:formData.customUploadId }));
      throw {
        _error: res,
        status: res.responseCode,
        data: JSON.stringify(responseData),
        //api.processError(responseData)
      };
    } else {
      return {
        data: responseData,
        status: res.responseCode,
        _response: res,
      };
    }
  }
}
