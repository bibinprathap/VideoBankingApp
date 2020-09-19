import axios from 'axios';
// import envConfig from './config';
import alertsHelper from './helperServices/alerts';
import createError from './helperServices/errors';
import {store} from '../redux/store/store';

export default class RestApi {
  static cancelTokens = {};
  constructor({controller, dispatch = null, secure = true}) {
    //if (!dispatch || dispatch == null) throw Error(`Dispatch cannot be null. controller: ${controller}`);

    //const env = 'test';
    //const env = 'development';
    //const env =   store.getState().environmentReducer;
    // 'bibin';

    this.header = {
      // Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      //'Content-Type': 'application/x-www-form-urlencoded',
      // Accept: '*/*',
    };
    this.controller = controller || '';

    this.dispatch = dispatch;
    this.secure = secure;
    this.envConfig = store.getState().environmentReducer;
  }
  get = ({
    url,
    parameters,
    body,
    headers,
    isFormData,
    showAlerts,
    cancelable,
  }) => {
    return this.restApi(
      'GET',
      url,
      parameters,
      body,
      headers,
      isFormData,
      showAlerts,
      cancelable,
    );
  };

  post = ({
    url,
    parameters,
    body,
    headers,
    isFormData,
    showAlerts,
    cancelable,
  }) => {
    return this.restApi(
      'POST',
      url,
      parameters,
      body,
      headers,
      isFormData,
      showAlerts,
      cancelable,
    );
  };
  restApi = (
    method = 'GET',
    url = '',
    parameters = {},
    body = {},
    headers = {},
    isFormData = false,
    showAlerts = true,
    cancelable = false,
  ) => {
    if (!url) url = '';
    if (!parameters) parameters = {};
    if (!headers) headers = {};
    //let requestUrl = this.gis === true ? url : this.parseUrl(url, parameters);
    let requestUrl = RestApi.parseUrl(
      this.envConfig,
      this.controller,
      url,
      parameters,
    );

    // if (isFormData) {
    //     //set correct Content-Type in the headers
    // }

    const defaultHeaders = {
      // Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      
      //'Content-Type': 'application/json',
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip, deflate, br',
      Authorization:'Bearer fXHc9tc50lBmscQyANeTeTaX-PwCWtLuSt-t6He5d2zaThVBgEs3lp8lUMS5Ukc9YcmDHfBc8bM96ILFE1jR0H1_QVcdfB4L1FWdEQrPCxLyG6he7cJ8KE2I-MxmUUSbjVuiEsaBZvWeCk2UD9AA4dgKW8zla8xs59SL4aedfH1J4aDg_DHB6yrbfDRwIq9LwdCI-p8LXCwWZJePjlqzjw',
    
      };
     //...{
     //Authorization: `Bearer ${`prNc5HfrKNDBeaLlr6Way1vccEIVQfPEBF2xjffVueylVVWeN8iZgN1mI_0qQ9WgfRdZF4CTAeiUTyr9yFU7sLniAxYFgL6xE8s6Jp3l6_t4MppiiWJ5x3cPO7038LZkg8jJC7H4s0kGSf1r5WyhP1UW0XZQ8If0252-l9qp6LrFdq6-xq4sI-5wdQqQ_DPtFIxLIfm0hHNY2C8iOdStYnOk--Tm6L_lpLoL3Wig4noTNlUcDg1pHRgFRUzW0xU7xX1Q-ZqOFinRANcaGiz2Mc02E0yNpb5bhaXwTmBhjWCVZPwsvwMQdlFocS-lcr8UIqOz9FQaZ2q9YkL6Aj9L9CIEFsmkBIMdISd6hC_2eZCKiAsGy7DscqALam3hh2k7qB-k5ms_4FNW_k3iRXTrtEwQrbyPgN820vLypV1KaSg`}`,
    //},
    const requestConfig = {
      
      url: requestUrl,
      method: method,
      headers: {
        ...defaultHeaders,
        ...headers,
        //'Authorization': 'Bearer '+store.getState().login.userDetail.access_token
       // Authorization:'Bearer'+' '+'R4V4i4ycCr8U61dSM2hXFMVb3JxFEY21BFgKddsp0sov7iBY0fkcUO1lDPHsiD3LPfwrfeeiC4eZhsU3O26zyRhAvBg1tcSnr3x-xRfPLbwz5fbgUGLoRuLsTLXTZNTRz3zMLnH1GA3qjpMw_YaGMrQid4zU3qlfSh2DyAoijP75smmT-Nmrp0o3L7TpA6d-2yUPInM7VzhdF-IxIWCTkew',
    
      },
      data: body,
      //data: typeof body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
      //body: JSON.stringify(body),
      //timeout: this.envConfig.timeout || 0, //doesn't always work. need to fix this
      //withCredentials: true,
      //todo: add token if it is secure call
    };

    // if (cancelable) {
    //   RestApi.cancelRequest({
    //     endpoint: this.endpoint,
    //     url: requestUrl,
    //     message: 'One request allowed per url',
    //   });

    //   const newTokenSource = axios.CancelToken.source();
    //   newTokenSource.isCancelled = false;
    //   RestApi.cancelTokens[requestUrl] = newTokenSource;
    //   requestConfig.cancelToken = newTokenSource.token;
    // }
    //debugger;
    if (method == 'GET') return this.sendRequest(requestConfig, showAlerts);
    else return this.sendRequestPOST(requestConfig, showAlerts);
    //return this.fetchRequest(requestConfig, showAlerts);
  };

  static parseUrl = (envConfig = {}, controller = '', url = '', parameters) => {
    if (url.toLowerCase().startsWith('https')) return url;
    if (url == '') return `${envConfig.baseURL}/${controller}`;
    const regex = /:(\w+)\/?/g;

    let m;

    while ((m = regex.exec(url)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach(match => {
        if (parameters[match]) {
          url = url.replace(`:${match}`, parameters[match]);
          delete parameters[match];
        }
      });
    }

    let prefix = url.lastIndexOf('?') > 0 ? '&' : '?';

    for (let propName in parameters) {
      url = url.concat(`${prefix}${propName}=${parameters[propName]}`);
      if (prefix === '?') {
        prefix = '&';
      }
    }
    let parsedUrl = '';
    if (url.startsWith('//')) {
      parsedUrl = `${envConfig.baseURL}/${url.slice(2)}`;
    } else {
      if (url.startsWith('/')) {
        url = url.slice(1);
      }
      if (url.startsWith('?')) {
        parsedUrl = `${envConfig.baseURL}/${controller}${url}`;
      } else {
        parsedUrl = `${envConfig.baseURL}/${controller}/${url}`;
      }
    }

    return parsedUrl;
  };

  sendRequest = (requestConfig, showAlerts) => {
    //Todo:  dispatch --> this.dispatch(ajax-call-counter-increment-action)
    console.log('restApi axios request: ', requestConfig);
    axios.defaults.withCredentials = true;
   // axios.defaults.timeout = requestConfig.timeout;
    const logLevel = 'error';

    // return axios
    //   .request(requestConfig)
    // return axios
    //   .get(requestConfig.url, requestConfig.data, requestConfig.header)     
    return axios({ method: 'get', url: requestConfig.url, headers: requestConfig.headers })
    .then(response => {
        const cancelToken = RestApi.cancelTokens[requestConfig.url];
        console.log(
          'restApi axios success... url:',
          requestConfig.url,
          'respose:',
          response,
        );
        if (cancelToken && cancelToken.isCancelled) {
          //Should never come here, but just in case...
          console.warn('restApi axios success - request was cancelled');
          throw 'isCancel';
        }
        //Todo:  dispatch --> this.dispatch(ajax-call-counter-decrement-action)

        delete RestApi.cancelTokens[requestConfig.url];
        if (logLevel === 'debug') {
          const logAction = {
            type: 'LOG_API_ERRORS',
            message: '',
            details: {response},
          };
          store.dispatch(logAction);
        }

        return response;
      })
      .catch(error => {
        //Todo:  dispatch --> this.dispatch(ajax-call-counter-decrement-action)
        console.log('restApi axios error: ', {error});
        let errorToThrow = createError(error);
        errorToThrow.isCancel = error === 'isCancell' || axios.isCancel(error);

        let errorMessage = errorToThrow.detail || errorToThrow.message;
        if (showAlerts && errorToThrow) {
          alertsHelper.show('error', errorToThrow.message, errorMessage);
          errorToThrow.handled = true;
        }

        const logAction = {
          type: 'LOG_API_ERRORS',
          message: errorMessage,
          details: {response: error && error.response},
        };
        store.dispatch(logAction);

        throw errorToThrow;
      });
  };
  sendRequestPOST = (requestConfig, showAlerts) => {
    //Todo:  dispatch --> this.dispatch(ajax-call-counter-increment-action)
    console.log('restApi axios post request: ', requestConfig);
    axios.defaults.withCredentials = true;
    //axios.defaults.timeout = requestConfig.timeout;
    const logLevel = 'error';

    // return axios
    //   .request(requestConfig)
    return axios
      .post(requestConfig.url, requestConfig.data, requestConfig.headers)
      .then(response => {
        const cancelToken = RestApi.cancelTokens[requestConfig.url];
        console.log(
          'restApi axios post success... url:',
          requestConfig.url,
          'response:',
          response,
        );
        if (cancelToken && cancelToken.isCancelled) {
          //Should never come here, but just in case...
          console.warn('restApi axios success - request was cancelled');
          throw 'isCancel';
        }
        //Todo:  dispatch --> this.dispatch(ajax-call-counter-decrement-action)

        delete RestApi.cancelTokens[requestConfig.url];
        if (logLevel === 'debug') {
          const logAction = {
            type: 'LOG_API_ERRORS',
            message: '',
            details: {response},
          };
          store.dispatch(logAction);
        }

        return response;
      })
      .catch(error => {
        //Todo:  dispatch --> this.dispatch(ajax-call-counter-decrement-action)
        console.log('restApi axios error: ', {error});
        let errorToThrow = createError(error);
        errorToThrow.isCancel = error === 'isCancell' || axios.isCancel(error);

        let errorMessage = errorToThrow.detail || errorToThrow.message;
        if (showAlerts && errorToThrow) {
          alertsHelper.show('error', errorToThrow.message, errorMessage);
          errorToThrow.handled = true;
        }

        const logAction = {
          type: 'LOG_API_ERRORS',
          message: errorMessage,
          details: {response: error && error.response},
        };
        store.dispatch(logAction);

        throw errorToThrow;
      });
  };
}
