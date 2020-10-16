export interface HumanStatus {
  x: number
  y: number
  vx: number
  vy: number
  state: number
}

export interface Stat {
  s: number
  i: number
  r: number
}

export interface Parameters {
  number: number
  infect: number
  recover: number
  radius: number
  speed: number
  deltaIndex: number
}
