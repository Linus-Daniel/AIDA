import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';

const ChangeValue = ({ visible, initialValue, onSave, onCancel,cardTitle }) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text>{cardTitle}</Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius:10, borderColor: 'gray', padding: 10, marginTop: 10 }}
            value={value}
            onChangeText={setValue}
            placeholder={initialValue}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Pressable onPress={onCancel}>
              <Text style={{ color: 'gray', fontWeight:"bold" }}>Cancel</Text>
            </Pressable>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: '#F87413',fontWeight:"bold", }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeValue;
