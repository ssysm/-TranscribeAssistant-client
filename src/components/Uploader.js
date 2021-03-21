import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import config from '../constant'
export default function Uploader(props){
  const uploadProps = {
    accept: 'audio/*',
    name: 'file',
    maxCount: 1,
    action: config.API_ROOT + '/request_audio_sep',
    beforeUpload: file => {
      console.log(file.type !== 'audio/mpeg')
      if (file.type !== 'audio/mpeg' && file.type !== 'audio/vnd.wav') {
        message.error(`${file.name} is not a mp3/wav file`);
      }
      return (file.type === 'audio/mpeg' || file.type === 'audio/vnd.wav' ) ? true : Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        props.router.push('/wait/' + info.file.response.data.requestID)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload Audio File</Button>
      </Upload>
  );
};
