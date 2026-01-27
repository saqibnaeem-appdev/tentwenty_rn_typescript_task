import useOrientation from '@/features/movies/hooks/useOrientation';
import { colors, textStyles } from '@/theme';
import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface VideoPlayerProps {
  visible: boolean;
  onClose: () => void;
  videoKey: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  visible,
  onClose,
  videoKey,
}) => {
  const isLandscape = useOrientation();
  const [loading, setLoading] = useState(true);

  const { width, height } = Dimensions.get('window');

  const playerWidth = isLandscape ? height : width;
  const playerHeight = isLandscape ? width : height * 0.35;

  const onStateChange = useCallback(
    (state: string) => {
      if (state === 'playing') setLoading(false);
      if (state === 'ended') onClose();
    },
    [onClose],
  );

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <StatusBar hidden={isLandscape} />
      <View style={styles.container}>
        <YoutubePlayer
          width={playerWidth}
          height={playerHeight}
          play={visible}
          videoId={videoKey}
          onChangeState={onStateChange}
          forceAndroidAutoplay
          onReady={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        )}

        {!isLandscape && (
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={textStyles.h2}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  doneButton: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 24,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
