export interface videoProps {
  user: string;
  serial: string;
  liver: liveObjType
}

export interface BulletListType {
  value: string;
  time: string;
  user: string;
}

export interface serverProps {
  videoElement: HTMLVideoElement
}

export interface bulletProps {
  color: string;
  msg: string;
  size: string;
  backgroundColor: string
}

export interface liveObjType {
  name: string
  img: string
  remarks: string
}