const constant ={
  API_ROOT: process.env.NODE_ENV === 'production' ? 'https://api.transcribe-assistant.tech' : 'http://localhost',
  STATUS_CODE:{
    'ERROR': 'System errored. Please try again.',
    'UPLOAD_ZIP': 'Uploading archive.',
    'UPLOAD_IND': 'Uploading tracks.',
    'SUBMITTED': 'Your have submitted the file. Waiting for process.',
    'ZIP': 'Track is being compressed.',
    'PROCESSING': 'Audio is being processed.',
    'DONE': 'Separation done.',
    'ERROR_CODE': {
      'UPLOAD_IND': 'Uploading tracks',
      'UPLOAD_ZIP': 'Uploading archive',
      'ZIP': 'Compressing Tracks.'
    }
  },
  TRACK_DICT: {
    'vocals.wav': 'Vocal Track',
    'piano.wav': 'Piano Track',
    'other.wav': 'Unidentifiable Track',
    'drums.wav': 'Drum Track',
    'bass.wav': 'Bass Track',
    'zip': 'Zip Archive'
  }
}
export default constant;
