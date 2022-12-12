import Video from './body/video'
import './style/index.scss'

interface mediaProps {
  user: string,
}

const LoginMain: React.FC<mediaProps> = (props) => {
  const user: number = Math.ceil(Math.random()*6)
  const users = ['张三','Macel','May','张三丰','杰哥']
  return (
    <>
      <div className='Media-index-bgc'>
        <Video user={users[user]} />
      </div>
    </>
  )
}

export default LoginMain