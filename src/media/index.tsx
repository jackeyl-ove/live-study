import Video from './body/video'
import './style/index.scss'

interface mediaProps {
  user: string,
}

const LoginMain: React.FC<mediaProps> = (props) => {
  return (
    <>
      <div className='Media-index-bgc'>
        <Video user={props.user} />
      </div>
    </>
  )
}

export default LoginMain