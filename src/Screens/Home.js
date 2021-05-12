import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {LOAD_IMAGE} from '../Redux/Actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const {imagePath} = useSelector((state) => state.loadImageReducer);

  useEffect(() => {
    try {
      fetch(
        `http://shibe.online/api/shibes?count=50&urls=true&httpsUrls=true`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((json) => {
          console.log('IMAGE', json);
          dispatch({
            type: LOAD_IMAGE,
            payload: {
              imagePath: json,
            },
          });
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } catch (e) {
      console.log('error', e);
    }
  }, []);

  const ImageCarouselArray = imagePath.slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginTop: 10}}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}>
            {ImageCarouselArray.length > 0 &&
              ImageCarouselArray.map((item) => {
                return <ImageCarousel item={item} />;
              })}
          </ScrollView>
        )}
      </View>
      <View
        style={{
          flex: 2,
          marginTop: 10,
          marginBottom: 10,
        }}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <FlatList
            data={imagePath}
            renderItem={({item}) => <ImageGrid path={item} />}
            numColumns={2}
          />
        )}
      </View>
    </View>
  );
}

const ImageCarousel = (props) => {
  return (
    <View style={{paddingBottom: 5, marginTop: 10}}>
      <TouchableOpacity>
        <View
          style={{
            height: 200,
            margin: 5,
            borderRadius: 15,
            width: Dimensions.get('window').width - 20,
            marginTop: 15,
          }}>
          <Image
            source={{
              uri: props.item,
            }}
            resizeMode="stretch"
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ImageGrid = (props) => {
  console.log('EEEEEEEEEE', props.path);
  return (
    <View style={styles.GridViewBlockStyle}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: props.path,
          }}
          style={styles.imageBox}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  GridViewBlockStyle: {
    flex: 1,
    maxWidth: '49%',
    height: 200,
    margin: 2,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    marginRight: 5,
  },
  imageBox: {
    width: '100%',
    height: '100%',
  },
});
