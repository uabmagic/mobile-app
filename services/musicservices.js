import TrackPlayer from 'react-native-track-player';

module.exports = async () => {
  TrackPlayer.addEventListener('remote-play', () => {
    console.log('PLAY from service');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    console.log('PAUSE from service');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    console.log('STOP from service');
    TrackPlayer.stop();
  });
};
