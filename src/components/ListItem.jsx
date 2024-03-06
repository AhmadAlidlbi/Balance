import { StyleSheet, View, Text, Pressable } from 'react-native';

function ListItem(props) {
  return (
    <View style={styles.listItem}>
      <Pressable
        android_ripple={{ color: '#210644' }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.listText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    margin: 7,
    borderRadius: 7,
    justifyContent: 'center',
    width: 350,
    backgroundColor: '#E9E9E9',
    height: 50,
    paddingHorizontal: 15,
  },
  pressedItem: {
    opacity: 0.5,
  },
  listText: {
    color: '#000000',
  },
});