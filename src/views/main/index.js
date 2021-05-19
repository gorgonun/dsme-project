import React from 'react';
import {View, Text, Button} from 'react-native';
import DeviceService from '../../service/DeviceService';

export default class MainPage extends React.Component {
  state = {
    devices: null,
  };

  constructor(props) {
    super(props);
    this.getDevices();
  }

  async getDevices() {
    let devices = await DeviceService.getAll();
    this.setState({devices});
  }

  async ativarDispositivo(device){
   device.active = !device.active;
   await DeviceService.patch(device);
   const devices = await DeviceService.getAll(); 
   this.setState({devices});
  }

  async beforeMount() {}

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.state.devices && this.state.devices.length > 0
          ? this.state.devices.map(device => {
              return (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row'
                  }} key={device.device_id}>
                  <View style={{flex: 8}}>
                    <Text>
                      {device.name}
                      </Text>
                  </View>
                  <View style={{flex: 2}}>
                    <Button onClick={()=>ativarDispositivo(device)} style={{backgroundColor: device.active? "red":"green"}} title={device.active ? "Ativar" : "Desativar"}>
                    </Button>
                  </View>
                </View>
              );
            })
          : null}
        <Text>MainPage</Text>
      </View>
    );
  }
}
