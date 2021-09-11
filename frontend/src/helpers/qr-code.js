import axios from 'axios';

export const BASE_PROXY_ADDRESS = "/qr-code"

export const CREATE_QR_CODE_ENDPOINT = `${BASE_PROXY_ADDRESS}/create-qr-code`;
export const READ_QR_CODE_ENDPOINT = `${BASE_PROXY_ADDRESS}/read-qr-code`;

const REQUEST_TYPES = ['get', 'create'];

export const AVAILABLE_PARAMS = {
  create: [
    'param_data',
    'param_size',
    'param_charsetsource',
    'param_charsettarget',
    'param_ecc',
    'param_color',
    'param_bgcolor',
    'param_margin',
    'param_qzone',
  ],
  read: [
    'param_fileurl',
    'param_file',
    'param_outputformat'  ,
  ]
}

export function getQrCode(url, params, headers) {
  const urlParams =  new URLSearchParams(params).toString();

  url = new URL(`${READ_QR_CODE_ENDPOINT}?${urlParams}`);

  try {
    return axios
      .get(url, headers)
      .then((resp) => resp)
      .catch((error) => error)
  } catch(error) {
    return error;
  }
}

export function createQrCode(url, params, headers) {
  const urlParams =  new URLSearchParams(params).toString();

  url = new URL(`${CREATE_QR_CODE_ENDPOINT}?${urlParams}`);

  try {
    return axios
      .post(url, headers)
      .then((resp) => resp)
      .catch((error) => error)
  } catch(error) {
    return error;
  }
}

function hasCorrectParams(type, params) {
  return params.constructor == Object && Object.keys(params).every((key) => {
    return AVAILABLE_PARAMS[type] && AVAILABLE_PARAMS[type].includes(key);
  })
}

function executeQrCodeRequest(type, params, headers) {
  if (!REQUEST_TYPES.includes(type)) {
    throw  new Error(`request must be one of ${REQUEST_TYPES.join(', ')}`);
  } else if (hasCorrectParams(type, params)) {
    throw  new Error(`params must be one of ${AVAILABLE_PARAMS[type].join(', ')}`);
  } else if (type === 'create') {
    return createQrCode(type, params, headers)
  } else {
    return getQrCode(type, params, headers)
  }
}

export function qrCodeRequest(type, params, headers) {
  try {
    return executeQrCodeRequest(type, params, headers);
  } catch(error) {
    return error;
  }
}
