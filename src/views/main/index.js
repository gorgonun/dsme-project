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
    console.log(1);
   device.active = !device.active;
   await DeviceService.patch(device);
   const devices = await DeviceService.getAll(); 
   this.setState({devices});
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '5%',
        }}>
        <Text style={{ fontSize: 30}}>Fantastic Controller</Text>
        <View style={{justifyContent: 'center', width: '100%', height: '100%'}}>
          {this.state.devices && this.state.devices.length > 0
            ? this.state.devices.map(device => {
                return (
                  <View
                    style={{
                      flexDirection: 'column'
                    }} key={device.device_id}>
                    <View>
                      <Text style={{ fontSize: 30}}>
                        {device.device_name ? device.device_name : "No named device"}
                      </Text>
                    </View>
                    <View>
                      <Button onPress={()=>this.ativarDispositivo(device)} style={{backgroundColor: device.active? "red":"green"}} title={device.active ? "Desativar": "Ativar"}>
                      </Button>
                      <Text>
                      Id: {device.device_id}{"\n"}
                      Ultima temperatura registrada: {device.temperature ? device.temperature : 11.2}{"\n"}
                      Ativo: {device.active ? "Sim" : "Nao"}{"\n"}
                      </Text>
                    </View>
                  </View>
                );
              })
            : null}
        </View>
      </View>
    );
  }
}
