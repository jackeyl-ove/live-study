import { bulletProps } from '../types'
import { useEffect, useRef } from 'react'

const Bullet: React.FC<bulletProps> = (props) => {
  const { color, backgroundColor, size, msg } = props
  const divRef = useRef<HTMLSpanElement | null>(null)
  useEffect(()=>{
    if(!divRef.current)return
    divRef.current.style.color = color
    divRef.current.style.backgroundColor = backgroundColor
    divRef.current.style.fontSize = size
  })

  return (
    <>
     <span ref={divRef}>{msg}</span>
    </>
  )
}

export default Bullet