import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Animated} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {removeAction, removeClickAction, setRepeatMode} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {xml, costumeXml} from '../utils/imageXml';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Home = ({navigation}) => {
  const [image, setImage] = useState(xml);
  const [display, setDisplay] = useState(true);
  const [sizeOffset, setSizOffsete] = useState(0);
  const positionX = new Animated.Value(0);
  const positionY = new Animated.Value(0);
  const [rotateDeg, setRotateDeg] = useState(0);
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const [state, setState] = useState();
  const [xCord, setXCord] = useState(0);
  const [yCord, setYCord] = useState(0);
  const steps = useSelector(state => state.actionReducer);
  const {isEnabledClick, repeatMode} = useSelector(state => state.clickReducer);
  const dispatch = useDispatch();
  const style = {
    borderColor: '#ededed',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  };

  Animated.timing(positionX, {
    toValue: 1,
    useNativeDriver: true,
    duration: 1000,
  }).start(() => {});

  const xInterpolate = positionX.interpolate({
    inputRange: [0, 1],
    outputRange: [xCord ? xCord : 0, xCord ? xCord : 0],
  });

  Animated.timing(positionY, {
    toValue: 1,
    useNativeDriver: true,
    duration: 1000,
  }).start(() => {});

  const yInterpolate = positionY.interpolate({
    inputRange: [0, 1],
    outputRange: [yCord ? yCord : 0, yCord ? yCord : 0],
  });

  Animated.timing(rotateAnim, {
    toValue: rotateDeg ? 1 : 0,
    duration: 1000,
    useNativeDriver: true,
  }).start(({finished}) => {
    if (finished) {
      // rotateAnim?.setValue(0);
    }
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${rotateDeg}deg`],
  });

  const handleClick = () => {
    console.log(repeatMode, 'mode');
    const loop = () => {
      console.log(repeatMode, 'mode');
      steps?.map((item, i) => {
        if (item?.action === 'O') return;
        if (
          item?.action === 'A' ||
          item?.action === 'E' ||
          item?.action === 'G'
        ) {
          setTimeout(() => {
            setXCord(prevState => prevState + item?.steps);
          }, 600 * i);
        }
        if (item?.action === 'F' || item?.action === 'H') {
          setTimeout(() => {
            setYCord(prevState => prevState + item?.steps);
          }, 600 * i);
        }
        if (item?.action === 'B' || item?.action === 'C') {
          setTimeout(() => {
            setRotateDeg(prevState => prevState + item?.degree);
          }, 600 * i);
        }
        if (item?.action === 'Q') {
          setTimeout(() => {
            setRotateDeg(item?.degree);
          }, 600 * i);
        }
        if (item?.action === 'G') {
          setTimeout(() => {
            setXCord(0);
          }, 600 * i);
        }
        if (item?.action === 'H') {
          setTimeout(() => {
            setYCord(0);
          }, 600 * i);
        }
        if (item?.action === 'D') {
          setTimeout(() => {
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            setXCord(x);
            setYCord(y);
          }, 600 * i);
        }

        if (item?.action === 'I') {
          setTimeout(() => {
            setState('Think');
            setTimeout(() => {
              setState('na');
            }, 2000);
          }, 600 * i);
        }
        if (item?.action === 'J') {
          setTimeout(() => {
            setState('Say');
            setTimeout(() => {
              setState('na');
            }, 2000);
          }, 200 * i);
        }
        if (item?.action === 'K') {
          setTimeout(() => {
            if (image === xml) {
              setImage(costumeXml);
            } else {
              setImage(xml);
            }
          }, 200 * i);
        }
        if (item?.action === 'L') {
          setTimeout(() => {
            setSizOffsete(prevState => prevState + 10);
          }, 200 * i);
        }
        if (item?.action === 'M') {
          setTimeout(() => {
            setDisplay(true);
          }, 200 * i);
        }
        if (item?.action === 'N') {
          setTimeout(() => {
            setDisplay(false);
          }, 200 * i);
        }
        if (item?.action === 'R') {
          setTimeout(() => {
            setYCord(prevState => prevState - 10);
            setTimeout(() => {
              setYCord(prevState => prevState + 10);
            }, 300);
          }, 600 * i);
        }
      });
      if (repeatMode) setTimeout(loop, 1000);
      else return;
    };
    loop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
          position: 'absolute',
          zIndex: 1,
          left: '38%',
        }}>
        <TouchableWithoutFeedback onPress={async () => handleClick()}>
          <View style={styles.button}>
            <Icon name="play-circle" size={18} color="green" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setXCord(0);
            setYCord(0);
            dispatch(removeAction());
            setRotateDeg(0);
            setSizOffsete(0);
            setDisplay(true);
            setImage(xml);
            dispatch(removeClickAction());
            dispatch(setRepeatMode(false));
          }}>
          <View style={styles.button}>
            <Icon name="stop" size={17} color="red" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          height: '65%',
          marginTop: 30,
          ...style,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
        }}>
        <Animated.View
          style={{
            width: 30 + sizeOffset,
            display: !display ? 'none' : 'flex',
            transform: [
              {translateX: xInterpolate},
              {translateY: yInterpolate},
              {
                rotate: rotateInterpolate,
              },
            ],
          }}>
          {(state == 'Think' || state == 'Say') && (
            <Text
              style={{
                color: 'black',
                marginLeft: 20,
                borderWidth: 1,
                width: 50,
                textAlign: 'center',
                borderRadius: 5,
              }}>
              {state == 'Think' && 'Hmm...'}
              {state == 'Say' && 'Hello'}
            </Text>
          )}
          <TouchableWithoutFeedback onPress={isEnabledClick && handleClick}>
            <SvgXml
              xml={image}
              height={40 + sizeOffset}
              width={30 + sizeOffset}
            />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      <View
        style={{
          height: '4%',
          ...style,
          flexDirection: 'row',
        }}>
        <Text style={{color: 'black'}}>X: {xCord} </Text>
        <Text style={{color: 'black'}}> Y: {yCord}</Text>
      </View>

      <View
        style={{
          ...style,
        }}>
        <View style={styles.sprites}>
          <SvgXml xml={xml} height={50} width={30} />
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Actions');
            }}>
            <View style={{...styles.actionButton, width: 60}}>
              <Text style={{fontSize: 12,color:"white"}}>Action</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'hsla(215, 100%, 65%, 1)', height: '100%'},
  sprites: {
    width: 80,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    margin: 5,
    borderColor: '#ededed',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
    padding: 5,
  },
  actionButton: {
    backgroundColor: 'rgb(255, 191, 0)',
    width: 50,
    height: 20,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
});
