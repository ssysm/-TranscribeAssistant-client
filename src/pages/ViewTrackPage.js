import React, {useEffect, useState} from 'react';
import {Button, message, Col, Row, Divider, Select, Spin} from 'antd';
import {useHistory, useParams} from 'react-router-dom';
import TranscribeService from '../services/TranscribeService';
import dict from '../constant';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import {nanoid} from 'nanoid';
const { Option } = Select;

export default function ViewTrackPage(props) {

  const { id } = useParams();
  const history = useHistory();

  const [trackURLDict, setTrackURLDict] = useState({});
  const [ttl, setTTL] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioPlayer = React.useRef();
  const audioContainer = React.useRef();
  let ttlTimerIntv;

  const transcribeService= new TranscribeService();

  useEffect(()=>{
    getTrackURL(id);
    const audioMotion = new AudioMotionAnalyzer(document.getElementById('visualizer'));
    audioMotion.connectInput(audioPlayer.current);
    return function(){
      clearInterval(ttlTimerIntv);
    }
  },[id]);

  const getTrackURL = async (requestID)=>{
    try{
      setIsLoading(true);
      const urlResponse = await transcribeService.requestDownload(requestID);
      setIsLoading(false);
      if(urlResponse.success === 'true'){
        setTrackURLDict(urlResponse.data.urls);
        setupTTLTimer(urlResponse.data.ttl);
        audioPlayer.current.crossOrigin = 'anonymous';
        audioPlayer.current.src = urlResponse.data.urls['vocals.wav'];
        audioPlayer.current.load();
      }else{
        message.error(urlResponse.data.msg);
        history.push('/404')
      }
    }catch (e){
      console.error(e);
    }
  }

  const setupTTLTimer = (ttl_time)=>{
    let localTTL = ttl_time;
    ttlTimerIntv = setInterval(()=>{
      localTTL--;
      setTTL(localTTL);
      if(localTTL<= 0){
        clearInterval(ttlTimerIntv);
        history.push('/');
        message.warn('Your track has expired.')
      }
    },1000);
  }

  const changeAudio = (audioSource)=> {
    audioPlayer.current.src = audioSource;
  }

  const handleTrackChange = (value)=>{
    changeAudio(value);
  }

  return (
      <div>
        <Row>
          <Col>
            <h3>
              Download extracted track and archive(Job ID:{id}):
            </h3>
            <div>
              {
                isLoading ? <Spin size="large" /> : null
              }
              {
                Object.entries(trackURLDict).map(elemenet =>{
                  return(
                      <Button key={nanoid()} href={elemenet[1]}>{dict.TRACK_DICT[elemenet[0]]}</Button>
                  )
                })
              }
            </div>
            <p>
              Files will expire after: <span id='ttl'>{ttl}</span> second(s).
            </p>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <div>
            <div>
              <h3>Audio spectrum visualizer</h3>
              <Select defaultValue="Vocal Track" style={{ width: 120 }} onChange={handleTrackChange}>
                {
                  Object.entries(trackURLDict).map(elemenet =>{
                    if(elemenet[0] !== 'zip'){
                      return(
                          <Option key={nanoid()}  value={elemenet[1]}>{dict.TRACK_DICT[elemenet[0]]}</Option>
                      )
                    }
                  })
                }
              </Select>
            </div>
            <audio id="audio" ref={audioPlayer} controls crossOrigin="anonymous"/>
            <div ref={audioContainer} id='visualizer' style={{height: '60vh', width: '100vw'}}/>
          </div>
        </Row>
      </div>
  );
}
