import validUrl from 'valid-url';

const validateUrl = (url) => {
  return validUrl.isUri(url);
};

export default validateUrl;
