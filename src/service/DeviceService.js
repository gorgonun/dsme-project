import axios from 'axios';

const url = 'http://192.168.0.13:3000/v1/device';

export default class DeviceService {
  static async patch(device) {
    let response = await axios.patch(url + "/" + device.device_id, device);
    console.log(response);
    return response.data;
  }

  static async post(device) {
    let response = await axios.post(url, device);
    return response.data;
  }

  static async getAll() {
    let response = await axios.get(url);
    console.log(response);
    return response.data;
  }

  static async get(id) {
    let response = await axios.get(url + '/' + id);
    return response.data;
  }

  static async delete(id) {
    let response = await axios.delete(url + '/' + id);
    return response.data;
  }
}
