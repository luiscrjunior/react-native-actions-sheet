import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from '../..';

const colors = ['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71'];
const items = [
  100, 60, 150, 200, 170, 80, 41, 101, 61, 151, 202, 172, 82, 43, 103, 64, 155,
  205, 176, 86, 46, 106, 66, 152, 203, 173, 81, 42,
];
function ExampleSheet(props: SheetProps<{data: string}>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      onBeforeShow={() => {
        console.log('sheet payload', props.payload?.data);
      }}
      isModal={false}
      snapPoints={[100]}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      useBottomSafeAreaPadding
      defaultOverlayOpacity={0.3}>
      <View
        style={{
          paddingHorizontal: 12,
          maxHeight: '100%',
          height: 500,
        }}>
        <View style={styles.container}>
          {colors.map(color => (
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.snapToRelativeOffset(30);
              }}
              key={color}
              style={[
                styles.circle,
                {
                  backgroundColor: color,
                },
              ]}
            />
          ))}
        </View>
        <ScrollView {...scrollHandlers} style={styles.scrollview}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Write your text here"
            defaultValue="Write your text here"
          />
          <View>
            {items.map(item => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item}
                onPress={() => {
                  SheetManager.hide(props.sheetId);
                }}
                style={styles.listItem}>
                <View
                  style={[
                    styles.placeholder,
                    {
                      width: '100%',
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/*  Add a Small Footer at Bottom */}
          {/* <View style={styles.footer} /> */}
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    height: 100,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    borderRadius: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollview: {
    width: '100%',
    padding: 12,
  },
});

export default ExampleSheet;
