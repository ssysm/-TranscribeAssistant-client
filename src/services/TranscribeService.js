import axios from 'axios';
import config from '../constant';

export default class TranscribeService {

  getProcessStatus = (requestID) => {
    return axios.get(config.API_ROOT + '/process_status?requestID=' + requestID)
        .then(res => res.data)
  }

  requestDownload = (requestID) => {
    return axios.get(config.API_ROOT + '/retrive_tracks?requestID=' + requestID)
        .then(res => res.data)
  }
}
