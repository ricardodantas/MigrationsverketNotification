import AppSettings from '../settings';

export const requestApplicationInfo = async ({ number, type, deviceUniqueId }) => {
  const response = await fetch(
    `${AppSettings.restApiBaseUrl}/application-status?number=${number}&type=${type}&deviceUniqueId=${deviceUniqueId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
  );
  return await response.json();
};
