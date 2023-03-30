import Video from './body/video'
import './style/index.scss'

interface mediaProps {
  user: string,
  serial: string
}

const LoginMain: React.FC<mediaProps> = (props) => {
  const user: number = Math.ceil(Math.random()*6)
  const users = ['张三','Macel','May','张三丰','杰哥']
  const serial = '1234'
  const liver = {
    name: 'Mc.张',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fd5e02748-f605-4be6-900b-cee6f93bbcdd%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682259884&t=fa56a201f8e45f01f9fcab8c27db47a6',
    remarks: '一起来加入快乐的高等数学大家庭~~'
  }
  return (
    <>
      <div className='Media-index-bgc'>
        <Video user={users[user]} serial={serial} liver={liver}/>
      </div>
    </>
  )
}

export default LoginMain