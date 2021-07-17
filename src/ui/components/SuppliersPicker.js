import { Icon, Picker } from 'native-base';
import React, {useState} from 'react';
import { Platform } from 'react-native';

const SuppliersPicker =({defultValue, renderItems, onItemSelected, style = {}})=> {
    const [selectedSupplier, setSelectedSupplier] = useState(defultValue)

    const isIos=()=>{
      return Platform.OS === 'ios'
    }

    onValueChange=(value)=>{
      setSelectedSupplier(value)
      onItemSelected(value)
    }

    renderIosPicker=()=> {
      return (
          <Picker
          mode="dropdown"
          placeholder="Select Supplier"
          placeholderStyle={{ color: "#2874F0"}}
          style={{alignSelf: 'center'}}
          note={false}
          selectedValue={selectedSupplier}
          onValueChange={onValueChange}
          iosIcon={<Icon name="arrow-down" />}
          icon={<Icon name="arrow-down" />}
        >
            {renderItems}
        </Picker>
      )
    }

    renderAndroidPicker=()=> {
      return (
          <Picker
            mode="dropdown"
            placeholder="Select Supplier"
            style={style}
            selectedValue={selectedSupplier}
            onValueChange={onValueChange}
        >
            {renderItems}
        </Picker>
      )
    }

    return isIos() ? renderIosPicker() : renderAndroidPicker()
}

export default SuppliersPicker