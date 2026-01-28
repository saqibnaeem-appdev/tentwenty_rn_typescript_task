import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackIcon, SeatIcon } from '@/assets/svgs';
import { colors, getFontSize, getHeight, getWidth, textStyles } from '@/theme';
import { AppButton } from '@/components';
import routes from '@/navigation/routes';
import { seatMap } from '@/assets/images';
import ScreenHeader from '@/components/movie/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const TicketBookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { movieTitle, date } = route.params || {};

  const [selectedDate, setSelectedDate] = useState<string>('5 Mar');
  const [selectedHall, setSelectedHall] = useState<string>('12:30');

  const dates = ['5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar'];

  const halls = [
    {
      id: '1',
      time: '12:30',
      name: 'Cinetech + Hall 1',
      price: '50$ or 2500 bonus',
    },
    {
      id: '2',
      time: '13:30',
      name: 'Cinetech + Hall 2',
      price: '75$ or 3000 bonus',
    },
    {
      id: '3',
      time: '16:30',
      name: 'Cinetech + Hall 3',
      price: '60$ or 2800 bonus',
    },
  ];

  const handleSelectSeats = () => {
    const selectedHallData = halls.find(h => h.time === selectedHall);
    navigation.navigate(routes.seatSelectionScreen, {
      movieTitle,
      dateString: selectedDate + ', 2021',
      hall: selectedHallData ? `${selectedHallData.name}` : undefined,
      price: selectedHallData ? parseInt(selectedHallData.price) : 50,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.white }}
      edges={['top']}
    >
      <View style={styles.container}>
        <ScreenHeader
          title={movieTitle || "The King's Man"}
          description={`${
            movieTitle || "The King's Man"
          }  In Theaters December 22, 2021`}
          onPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionLabel}>Date</Text>
          <View style={styles.dateListContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateScroll}
            >
              {dates.map(d => {
                const isSelected = selectedDate === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.dateChip,
                      isSelected && styles.dateChipSelected,
                    ]}
                    onPress={() => setSelectedDate(d)}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && styles.dateTextSelected,
                      ]}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.hallsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hallsContainer}
            >
              {halls.map(hall => {
                const isSelected = selectedHall === hall.time;
                return (
                  <View key={hall.id} style={styles.hallItemContainer}>
                    <View style={styles.hallHeader}>
                      <Text style={styles.hallTime}>{hall.time}</Text>
                      <Text style={styles.hallName}>{hall.name}</Text>
                    </View>
                    {/* <TouchableOpacity
                    style={[
                      styles.hallCard,
                      isSelected && styles.hallCardSelected,
                    ]}
                    onPress={() => setSelectedHall(hall.time)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.seatMapPreview}>
                      {Array.from({ length: 10 }).map((_, rowIndex) => (
                        <View key={rowIndex} style={styles.previewRow}>
                          {Array.from({ length: 14 }).map((_, seatIndex) => (
                            <SeatIcon
                              key={seatIndex}
                              width={getWidth(5)}
                              height={getHeight(5)}
                              color={
                                rowIndex % 2 === 0
                                  ? seatIndex % 2 === 0
                                    ? colors.primary
                                    : colors.secondary
                                  : seatIndex % 2 === 0
                                  ? colors.grayLight
                                  : colors.error
                              }
                            />
                          ))}
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity> */}
                    <TouchableOpacity
                      style={[
                        styles.hallCard,
                        isSelected && styles.hallCardSelected,
                      ]}
                      onPress={() => setSelectedHall(hall.time)}
                      activeOpacity={0.9}
                    >
                      <Image source={seatMap} style={styles.seatMapPreview} />
                    </TouchableOpacity>
                    <Text style={styles.priceText}>
                      From{' '}
                      <Text style={styles.boldPrice}>
                        {hall.price.split(' ')[0]}
                      </Text>{' '}
                      or {hall.price.split(' or ')[1]}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            title="Select Seats"
            variant="primary"
            width={getWidth(335)}
            onPress={handleSelectSeats}
            style={styles.selectButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TicketBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
    paddingBottom: getHeight(20),
    marginTop: getHeight(10),
  },
  backButton: {
    padding: 5,
    marginRight: 15,
    marginTop: 5,
    width: 30,
  },
  headerTitleContainer: {
    flex: 1,
    marginRight: 45,
    alignItems: 'center',
  },
  headerTitle: {
    ...textStyles.h2,
    color: colors.black,
    fontSize: getFontSize(16),
    textAlign: 'center',
  },
  headerSubtitle: {
    ...textStyles.body1,
    color: colors.secondary,
    marginTop: 4,
    fontSize: getFontSize(12),
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: getHeight(150),
    justifyContent: 'center',
    flex: 1,
  },
  sectionLabel: {
    ...textStyles.h2,
    color: colors.black,
    fontSize: getFontSize(16),
    marginLeft: getWidth(20),
    marginBottom: getHeight(12),
    fontWeight: 'bold',
  },
  dateListContainer: {
    marginBottom: getHeight(30),
  },
  dateScroll: {
    paddingHorizontal: getWidth(20),
    gap: 10,
  },
  dateChip: {
    backgroundColor: colors.grayLight + '40',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
  },
  dateChipSelected: {
    backgroundColor: colors.secondary,
  },
  dateText: {
    fontSize: getFontSize(12),
    color: colors.black,
    fontWeight: '600',
  },
  dateTextSelected: {
    color: colors.white,
  },
  hallsWrapper: {
    // Wrapper if needed
  },
  hallsContainer: {
    paddingHorizontal: getWidth(20),
    gap: 10,
  },
  hallItemContainer: {
    width: getWidth(240), // Fixed width card
    marginRight: 10,
  },
  hallHeader: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  hallTime: {
    fontSize: getFontSize(12),
    fontWeight: 'bold',
    color: colors.black,
  },
  hallName: {
    fontSize: getFontSize(12),
    color: colors.grayMedium,
  },
  hallCard: {
    height: getHeight(140),
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grayLight,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  hallCardSelected: {
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  seatMapPreview: {
    width: getWidth(130),
    height: getHeight(100),
  },
  previewRow: {
    flexDirection: 'row',
    gap: 3,
  },

  priceText: {
    fontSize: getFontSize(12),
    color: colors.grayMedium,
  },
  boldPrice: {
    fontWeight: 'bold',
    color: colors.black,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  selectButton: {
    height: getHeight(55),
    borderRadius: 15,
  },
});
