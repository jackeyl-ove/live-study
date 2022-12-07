import '../style/video.scss'
import { Input, List } from 'antd'
import { useRef, useEffect, useState } from 'react'
import flvjs from 'flv.js'
import moment from 'moment'
import { videoProps, BulletListType, serverProps } from '../types'
import { io } from 'socket.io-client'

const Video: React.FC<videoProps> = (props) => {
  const { user } = props
  const videoElement = useRef<HTMLVideoElement>(null)
  const mediaBox = useRef<HTMLDivElement>(null)
  const [bulletList, setBulletList] = useState<BulletListType[]>([])
  const [inputVal, setInputVal] = useState('')

  // 连接推流服务器
  const STREAM_API_HOST: String = window.location.protocol + "//" + window.location.hostname + ':8000/'
  useEffect(() => {
    // 推流服务器方法
    const streamKey: String = '1234'
    try {
      const flvPlayer: flvjs.Player = flvjs.createPlayer({
        isLive: true,
        type: 'flv',
        url: `${STREAM_API_HOST}live/${streamKey}.flv`
      })
      flvPlayer.attachMediaElement(videoElement.current as HTMLVideoElement);
      flvPlayer.load()
      // flvPlayer.play()
    } catch (err) {
    }
  })

  // ws连接
  const WS_API_HOST = `ws://${window.location.hostname}:5000`
  const socket = io(WS_API_HOST)
  socket.on('chat', (msg) => {
    setBulletList(JSON.parse(msg) as Array<BulletListType>)
  })

  /**
   * 发送弹幕方法
   */
  const sendBullet = () => {
    const newBullet: Array<BulletListType> = [...bulletList, { value: inputVal, time: moment().format('hh:mm:ss') }]
    socket.emit('message', JSON.stringify(newBullet)) 
  }

  return (
    <>
      <div className='media-box' ref={mediaBox}>
        <video className='media-video' ref={videoElement} controls controlsList='noremoteplayback'></video>
        <div className='media-comments'>
          <List
            className='media-comments-dashboard'
            bordered
            dataSource={bulletList}
            renderItem={(item) => (
              <List.Item>
                <div className='item-value'>{item.value}</div>
                <div className='item-time'>{item.time}</div>
              </List.Item>
            )}
          />
          <div className='media-comments-bullet'>
            <Input value={inputVal} placeholder='请输入你想要说的话' type="text" className='media-comments-bullet-input' onInput={e => { setInputVal(e.currentTarget.value) }} />
            <button className='media-comments-bullet-button' onClick={sendBullet}>
              <div className='media-comments-bullet-button-word'>发送</div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Video