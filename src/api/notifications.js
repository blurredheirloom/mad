import * as Permissions from 'expo-permissions';

async function registerForPushNotificationsAsync(token, title, body, data) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  

  if (finalStatus !== 'granted') {
    return;
  }

  

  return fetch("https://exp.host/--/api/v2/push/send", {
    body: JSON.stringify({
      to: token,
      title: title,
      body: body,
      channelId: 'mad-notification',
      data: data,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST'
  }).then((response) => response.json())   
  .then((responseJson) => {  })
  .catch((error) => { console.log(error) });;
}

export default registerForPushNotificationsAsync;
