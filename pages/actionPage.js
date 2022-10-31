import * as React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {motions, control, looks, event} from '../utils/spriteActions';
import {
  addAction,
  addClickAction,
  removeAction,
  setRepeatMode,
} from '../redux/action';

import {DraxProvider, DraxView} from 'react-native-drax';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionPage = () => {
  const dispatch = useDispatch();
  const steps = useSelector(state => state.actionReducer);
  const [data, setData] = React.useState(motions);
  const actions = ['Motions', 'Looks', 'Event', 'Control'];

  const handleClick = item => {
    if (item == 'Motions') {
      setData(motions);
    } else if (item == 'Looks') {
      setData(looks);
    } else if (item == 'Event') {
      setData(event);
    } else {
      setData(control);
    }
  };
  return (
    <DraxProvider style={{backgroundColor: 'rgb(255, 191, 0)', height: '100%'}}>
      <View style={styles.actions}>
        {actions?.map(item => {
          return (
            <TouchableWithoutFeedback onPress={() => handleClick(item)}>
              <View style={styles.actionContainer}>
                <Text
                  style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                  {item}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <View style={styles.container}>
        <View style={styles.palette}>
          <ScrollView style={{paddingVertical: 10, marginBottom: 30}}>
            {data?.map(item => {
              return (
                <DraxView
                  style={[styles.centeredContent, styles.draggableBox]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={item}
                  longPressDelay={0}>
                  <Text style={styles.label}>{item?.label}</Text>
                </DraxView>
              );
            })}
          </ScrollView>
        </View>
        <DraxView
          style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
          receivingStyle={styles.receiving}
          renderContent={({viewState}) => {
            return (
              <ScrollView>
                <Text style={styles.actionsText}>Actions</Text>
                {steps?.map(item => {
                  return (
                    <View>
                      <Text style={styles.received}>{item.label}</Text>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          console.log('njnh');
                          dispatch(removeAction(item));
                        }}>
                        <Icon
                          name="delete"
                          size={14}
                          color="purple"
                          style={{
                            position: 'absolute',
                            left: '86%',
                            top: 0,
                            borderWidth: 1,
                            borderRadius: 50,
                            textAlign: 'center',
                            padding: 2,
                            backgroundColor:"white",
                            borderColor:"purple"
                          }}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  );
                })}
              </ScrollView>
            );
          }}
          onReceiveDragDrop={event => {
            if (event.dragged.payload?.action === 'O') {
              dispatch(addClickAction());
            }
            if (event.dragged.payload?.action === 'P') {
              dispatch(setRepeatMode(true));
            }
            dispatch(addAction(event.dragged.payload));
          }}
        />
      </View>
    </DraxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  centeredContent: {
    alignItems: 'center',
  },
  receivingZone: {
    borderRadius: 10,
    height: '80%',
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    fontSize: 10,
    color: 'black',
    backgroundColor: 'rgb(255, 191, 0)',
    width: 130,
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  palette: {},
  draggableBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
  },
  magenta: {
    backgroundColor: 'white',
    width: '45%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  actionContainer: {
    backgroundColor: 'purple',
    borderRadius: 5,
    width: 50,
    height: 20,
    justifyContent: 'center',
    margin: 5,
  },
  label: {
    fontSize: 10,
    color: 'black',
    width: 130,
    marginVertical: 5,
    paddingVertical: 0,
    borderRadius: 5,
    textAlign: 'center',
  },
  actionsText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default ActionPage;
