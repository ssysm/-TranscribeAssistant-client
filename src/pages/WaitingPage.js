import React, {useState} from 'react';
import {Result, Button, Spin, message} from 'antd';
import {useHistory, useParams} from 'react-router-dom';
import TranscribeService from '../services/TranscribeService';
import StatusDict from '../constant';
export default function WaitingPage(props) {

  const { id } = useParams();
  const history = useHistory();

  const [fileMessage, setFileMessage] = useState(StatusDict.STATUS_CODE['SUBMITTED']);
  const [isErrored, setIsErrored] = useState(false);
  const [inProcessLoop, setInProcessLoop] = useState(0);

  let requestInterval = setInterval(undefined, undefined, undefined);

  const transcribeService = new TranscribeService();

  useState(()=>{
    const checkIntervalFunc = ()=>{
      updateFileStatus(id);
    }
    requestInterval = setInterval(checkIntervalFunc, 10 * 1000);
    return function cleanup() {
      clearInterval(requestInterval)
    };
  },[id]);


  const updateFileStatus = async (requestID)=>{
    try{
      const fileStatusRes = await transcribeService.getProcessStatus(requestID);
      if(fileStatusRes.success === 'true'){
        let scopeFileStatus = fileStatusRes.data.status;
        setFileMessage(StatusDict.STATUS_CODE[scopeFileStatus]);
        if(scopeFileStatus === 'PROCESSING'){
          setInProcessLoop(inProcessLoop + 1);
        }
        if(scopeFileStatus === 'DONE'){
          clearInterval(requestInterval);
          history.push('/view-track/' + requestID);
        }
        if(inProcessLoop > 50){
          setIsErrored(true);
          setFileMessage("Processing timed out.")
          clearInterval(requestInterval);
        }
      }else{
        setIsErrored(true);
        clearInterval(requestInterval);
        setFileMessage("Errored while requesting file.")
        message.error('Errored while requesting file: ' + fileStatusRes.data.msg);
      }
    }catch (e) {
      setIsErrored(true);
      setFileMessage("Errored while requesting file.")
      message.error('Errored while requesting file status.');
      console.error(e);
      setIsErrored(true);
      clearInterval(requestInterval);
    }
  }

  return (
      <div style={{margin: 'auto',width: '50%', textAlign:'center', paddingTop: 50 }}>
        {
          isErrored ?
              <div>
                <Result
                    status="error"
                    title="Submission Failed"
                    subTitle="Server failed to process your request or your request ID was incorrect."
                    extra={[
                      <Button onClick={()=> history.push('/')} type="primary" key="console">
                        Home
                      </Button>,
                    ]}
                />
              </div>
              :
              <div>
                <Spin size="large" />
                <p>{fileMessage}</p>
                <p>This should take around 3-5 minutes. <br/> You can copy the link from address bar and check back later.</p>
              </div>

        }
      </div>
  );
}
