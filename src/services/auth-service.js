import ConnectyCube from 'react-native-connectycube';
import config from '../config';

export default class AuthService {
  init = () => ConnectyCube.init(...config);

  login = user => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(user)
        .then(() =>
          ConnectyCube.chat.connect({
            userId: user.Id,
            password: user.Password,
          }),
        )
        .then(resolve)
        .catch(reject);
    });
  };

  logout = () => {
    ConnectyCube.chat.disconnect();
    ConnectyCube.destroySession();
  };
}
