import {showMessage} from 'react-native-flash-message';

function buildDefaultMessageConfig(message, type) {
  return {
    duration: 3000,
    icon: 'auto',
    message,
    type,
  };
}

const showSuccessMessage = message => {
  const messageConfig = buildDefaultMessageConfig(message, 'success');

  showMessage(messageConfig);
};

const showInfoMessage = message => {
  const messageConfig = buildDefaultMessageConfig(message, 'default');

  showMessage(messageConfig);
};

const showErrorMessage = message => {
  const messageConfig = buildDefaultMessageConfig(message, 'danger');

  showMessage(messageConfig);
};

export default {
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
};
