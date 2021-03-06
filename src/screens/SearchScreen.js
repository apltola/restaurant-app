import React, { useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
import { iosColors } from '../util/globalStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
//     https://www.npmjs.com/package/react-native-alert-pro
import useRestaurants from '../hooks/useRestaurants';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('sushi');
  const [searchApi, results, showErrorDialog] = useRestaurants();

  const filterRestaurantsByPrice = price => {
    // price === '€' || '€€' || '€€€'
    return results.filter(v => {
      return v.price === price;
    })
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchTerm}
        onValueChange={setSearchTerm}
        onValueSubmit={() => searchApi(searchTerm)}
      />
      <Animated.ScrollView>
        <RestaurantList restaurants={filterRestaurantsByPrice('€')}   title="Cost Effective €" />
        <RestaurantList restaurants={filterRestaurantsByPrice('€€')}  title="Bit Pricier €€"   />
        <RestaurantList restaurants={filterRestaurantsByPrice('€€€')} title="Big Spender €€€"  />

        {/* <View style={{marginTop: 50}}>
          <Text>
            results: {JSON.stringify(results, null, 2)}
          </Text>
        </View> */}
      </Animated.ScrollView>

      <AwesomeAlert
        show={showErrorDialog}
        showProgress={false}
        title="Jokin meni pieleen!"
        message="Yritä myöhemmin uudestaan..."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText=""
        confirmText="     OK     "
        confirmButtonColor={iosColors.red}
        onCancelPressed={() => setShowErrorDialog(false)}
        onConfirmPressed={() => setShowErrorDialog(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    //minHeight: SCREEN_HEIGHT,
    //paddingHorizontal: 10,
  },
});

export default SearchScreen;
