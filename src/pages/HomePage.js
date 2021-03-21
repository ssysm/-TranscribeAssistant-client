import React, { useEffect, useState } from "react";
import {Row, Col, Button, Divider} from 'antd';
import { useHistory } from "react-router-dom";
import Uploader from '../components/Uploader';

export default function HomePage() {
  const history = useHistory();

  return (
      <div style={{textAlign: 'center', fontSize: '16px'}}>
        <Row>
          <Col span={24}>
            <h1>
              Transcribe Assistant
            </h1>
            <h3>
              An online AI platform to help sheet music transcribing! Powered by Spleeter.
            </h3>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p>
              Upload an audio file(mp3, wav.) that is smaller than 16Mb to get started with your music transcription.
            </p>
          </Col>
        </Row>
        <Row style={{display:'block'}}>
          <Uploader router={history} />
        </Row>
        <Row style={{display:'block'}}>
          <p>Once your file is uploaded. The extracted audio track will expire in 1 hour.</p>
        </Row>
        <Divider/>
        <Row>
          <Col span={24}>
            <h3>What is Transcription Assistant?</h3>
            <p>Transcription Assistant is a tool based on Spleeter.<br/>
              A Deezer source separation library with pretrained models written in Python and uses Tensorflow.<br/>
              It uses AI model to predict and extract "stems" from music.<br/>
              The stems that can extracted: Vocals / drums / bass / piano / other.
            </p>
            <br/>
            <h3>What tracks does Transcription Assistant extract?</h3>
            <p>Transcription Assistant uses the "5stems" model from the official Spleeter repo. <br/>
              That mean you'll receive 5 separate audio files as described in the "What is TA" section.<br/>
              A compressed zip file will also be provided.
            </p>
            <br/>
            <h3>What other tools does Transcription Assistant provide?</h3>
            <p>Transcription Assistant provides a online preview of the separated tracks.<br/>
              The track will also played with an audio visualizer.
            </p>
          </Col>
        </Row>
      </div>
  );
}
