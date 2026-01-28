import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SeatIcon } from '@/assets/svgs';
import {
  colors,
  fonts,
  getBorderRadius,
  getFontSize,
  getHeight,
  getWidth,
  textStyles,
} from '@/theme';
import { AppButton } from '@/components';
import ScreenHeader from '@/components/movie/ScreenHeader';
import Svg, { Path } from 'react-native-svg';

interface Seat {
  id: string;
  row: number;
  col: number;
  type: 'regular' | 'vip';
  status: 'available' | 'taken' | 'selected';
  price: number;
}

const ROWS = 10;
const COLS = 14;
const VIP_ROWS = 2;

const SeatSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const {
    movieTitle,
    dateString = 'March 5, 2021',
    hall = '12:30 Hall 1',
  } = route.params || {};

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [scale, setScale] = useState(1);

  const initialSeats = useMemo(() => {
    const seats: Seat[] = [];
    for (let r = 1; r <= ROWS; r++) {
      for (let c = 1; c <= COLS; c++) {
        const isTaken = Math.random() < 0.2;
        const isVip = r > ROWS - VIP_ROWS;
        seats.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          type: isVip ? 'vip' : 'regular',
          status: isTaken ? 'taken' : 'available',
          price: isVip ? 150 : 50,
        });
      }
    }
    return seats;
  }, []);

  const [seats, setSeats] = useState<Seat[]>(initialSeats);

  const handleSeatPress = (seatId: string) => {
    setSeats(prev =>
      prev.map(seat => {
        if (seat.id !== seatId) return seat;
        if (seat.status === 'taken') return seat;

        if (seat.status === 'selected') {
          setSelectedSeats(s => s.filter(id => id !== seatId));
          return { ...seat, status: 'available' };
        } else {
          setSelectedSeats(s => [...s, seatId]);
          return { ...seat, status: 'selected' };
        }
      }),
    );
  };

  const totalPrice = seats
    .filter(s => s.status === 'selected')
    .reduce((sum, seat) => sum + seat.price, 0);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={movieTitle || "The King's Man"}
        description={`${
          movieTitle || "The King's Man"
        } ${dateString} | ${hall}`}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.horizontalScroll}
      >
        <View style={styles.screenShapeContainer}>
          <Svg
            width={getWidth(250)}
            height={getHeight(50)}
            viewBox="0 0 100 20"
          >
            <Path
              d="M-2 16 Q50 -2 102 16"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="1"
              opacity={0.5}
            />
          </Svg>
          <Text style={styles.screenText}>SCREEN</Text>
        </View>

        <View style={[styles.seatGrid, { transform: [{ scale: scale }] }]}>
          {Array.from({ length: ROWS }).map((_, rIndex) => {
            const rowNum = rIndex + 1;
            const rowSeats = seats.filter(s => s.row === rowNum);
            return (
              <View key={rowNum} style={styles.rowContainer}>
                <Text style={styles.rowLabel}>{rowNum}</Text>
                <View style={styles.rowSeats}>
                  {rowSeats.map(seat => {
                    let seatColor = colors.secondary;
                    if (seat.status === 'taken') seatColor = colors.grayLight;
                    if (seat.status === 'selected') seatColor = colors.gold;
                    if (seat.type === 'vip' && seat.status !== 'selected')
                      seatColor = colors.primary;

                    return (
                      <TouchableOpacity
                        key={seat.id}
                        onPress={() => handleSeatPress(seat.id)}
                        disabled={seat.status === 'taken'}
                        style={styles.seatWrapper}
                      >
                        <SeatIcon
                          color={seatColor}
                          width={14}
                          height={14}
                          style={
                            seat.status === 'taken' ? { opacity: 0.5 } : {}
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => setScale(s => Math.min(s + 0.1, 1.5))}
          >
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => setScale(s => Math.max(s - 0.1, 0.5))}
          >
            <Text style={styles.zoomText}>-</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <SeatIcon color={colors.gold} width={18} height={18} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
            <View style={styles.legendItem}>
              <SeatIcon
                color={colors.grayMedium}
                width={18}
                height={18}
                style={{ opacity: 0.5 }}
              />
              <Text style={styles.legendText}>Not available</Text>
            </View>
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <SeatIcon color={colors.primary} width={18} height={18} />
              <Text style={styles.legendText}>VIP (150$)</Text>
            </View>
            <View style={styles.legendItem}>
              <SeatIcon color={colors.secondary} width={18} height={18} />
              <Text style={styles.legendText}>Regular (50 $)</Text>
            </View>
          </View>
        </View>

        {/* {selectedSeats.length > 0 && (
          <View style={styles.selectedTagsContainer}>
            {seats
              .filter(s => s.status === 'selected')
              .map(s => (
                <View key={s.id} style={styles.selectedTag}>
                  <Text style={styles.selectedTagText}>
                    {s.col} / {s.row} row
                  </Text>
                  <TouchableOpacity onPress={() => handleSeatPress(s.id)}>
                    <Text style={styles.selectedTagText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )} */}
        {selectedSeats.length > 0 && (
          <ScrollView
            style={styles.selectedTagsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {seats
              .filter(s => s.status === 'selected')
              .map(s => (
                <View key={s.id} style={styles.selectedTag}>
                  <Text style={styles.selectedTagText}>
                    {s.col} / {s.row} row
                  </Text>
                  <TouchableOpacity onPress={() => handleSeatPress(s.id)}>
                    <Text style={styles.closeText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.priceContainer}>
            <Text style={textStyles.h4}>Total Price</Text>
            <Text style={[textStyles.h2, { color: colors.textMain }]}>
              $ {totalPrice}
            </Text>
          </View>
          <AppButton
            title="Proceed to pay"
            variant="primary"
            onPress={() => Alert.alert('Payment', `Pay $${totalPrice}`)}
            style={styles.payButton}
          />
        </View>
      </View>
    </View>
  );
};

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screenShapeContainer: {
    alignItems: 'center',
    marginTop: getHeight(20),
    marginBottom: getHeight(30),
  },
  screenCurve: {
    width: getWidth(250),
    height: 10,
    borderTopWidth: 2,
    borderTopColor: colors.secondary,
    borderRadius: 100,
    transform: [{ scaleY: 0.5 }],
    opacity: 0.5,
  },
  screenText: {
    fontSize: getFontSize(10),
    color: colors.grayMedium,
    fontFamily: fonts.poppins.poppins500,
  },
  horizontalScroll: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: getWidth(20),
    flexDirection: 'column',
  },
  seatGrid: {
    gap: getWidth(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
  rowLabel: {
    fontSize: getFontSize(10),
    color: colors.black,
    width: getWidth(15),
    fontFamily: fonts.poppins.poppins700,
  },
  rowSeats: {
    flexDirection: 'row',
    gap: getWidth(6),
  },
  seatWrapper: {
    padding: 2,
  },
  zoomControls: {
    flexDirection: 'row',
    gap: getWidth(10),
    position: 'absolute',
    bottom: getHeight(10),
    right: getWidth(10),
    zIndex: 10,
  },
  zoomButton: {
    width: getWidth(30),
    height: getHeight(30),
    backgroundColor: colors.white,
    borderRadius: getBorderRadius(15),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    alignContent: 'center',
  },
  zoomText: {
    fontSize: getFontSize(20),
    color: colors.textMain,
    fontFamily: fonts.poppins.poppins600,
  },
  legendContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
    width: '45%',
  },
  legendText: {
    fontSize: getFontSize(12),
    color: colors.grayMedium,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: getWidth(20),
    marginTop: getHeight(30),
    gap: getWidth(10),
  },
  selectedTag: {
    flexDirection: 'row',
    backgroundColor: colors.grayLight,
    paddingHorizontal: getWidth(12),
    borderRadius: getBorderRadius(8),
    alignItems: 'center',
    marginHorizontal: getWidth(8),
    gap: getWidth(10),
    justifyContent: 'center',
    alignContent: 'center',
  },
  selectedTagText: {
    fontSize: getFontSize(12),
    color: colors.black,
    fontFamily: fonts.poppins.poppins600,
  },
  closeText: {
    fontSize: getFontSize(25),
    color: colors.black,
    fontFamily: fonts.poppins.poppins500,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    height: getHeight(252),
    justifyContent: 'flex-end',
  },
  priceContainer: {
    backgroundColor: colors.background,
    borderRadius: getBorderRadius(12),
    width: getWidth(108),
    height: getHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  payButton: {
    width: getWidth(216),
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
    paddingVertical: getHeight(20),
  },
});
