import '../style/video.scss'
import { Input, List } from 'antd'
import { useEffect, useState, useRef } from 'react'
import flvjs from 'flv.js'
import moment from 'moment'
import { videoProps, BulletListType, serverProps } from '../types'
import { io } from 'socket.io-client'
import BulletScreen from 'rc-bullets';
import Bullet from './bullet'

const Video: React.FC<videoProps> = (props) => {
  const { user } = props
  const videoElement = useRef<HTMLVideoElement>(null)
  const mediaBox = useRef<HTMLDivElement>(null)
  const [bulletList, setBulletList] = useState<BulletListType[]>([])
  const [inputVal, setInputVal] = useState<string>('')

  // 连接推流服务器
  const STREAM_API_HOST: String = window.location.protocol + "//" + window.location.hostname + ':8000/'
  
  useEffect(() => {
    if (!videoElement.current?.src) {
      // 推流服务器方法
      const streamKey: String = '1234'
      const flvPlayer: flvjs.Player = flvjs.createPlayer({
        isLive: true,
        type: 'flv',
        url: `${STREAM_API_HOST}live/${streamKey}.flv`
      })
      flvPlayer.attachMediaElement(videoElement.current as HTMLVideoElement);
      flvPlayer.load()
      // flvPlayer.play()
    }
  })

  // ws连接
  const WS_API_HOST = `ws://${window.location.hostname}:5000`
  const socket = io(WS_API_HOST)
  useEffect(()=>{
    socket.on('chat', (msg) => {
      const temp: BulletListType = JSON.parse(msg)
      pushBulletList(temp)
      screen && bulletPush(temp.value)
    })
    return ()=>{
      socket.close();
    }
  })

  //  弹幕实现
  const [screen, setScreen] = useState<BulletScreen | null>(null)
  useEffect(() => {
    const bulletScreen = new BulletScreen('.media-screen')
    setScreen(bulletScreen)
  }, [])

  /**
   * 发送弹幕方法
   */
  const sendBullet = () => {
    if (!inputVal) return
    const newBullet: BulletListType = { value: inputVal, time: moment().format('hh:mm:ss'), user: user}
    socket.emit('message', JSON.stringify(newBullet))
    bulletPush(inputVal)
    pushBulletList(newBullet)
    setInputVal('')
  }

  /**
   * 增加弹幕列表
   */
  const pushBulletList = (item: BulletListType)=>{
    setBulletList([...bulletList, item])
  }

  /**
   * 弹幕选项
   */
  const bulletPush = (msg:string, color:string = '#fff', size:string = 'large')=>{
    screen.push(<Bullet color={color} size={size} msg={msg} backgroundColor="transparent"/>)
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
                <span className='item-value'>{item.user}</span>:
                <span className='item-value'>{item.value}</span>
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
      <div className='media-screen'></div>
    </>
  )
}

export default Video