import xgrad from '../assets/Images/xgrad.png'
import graphgrad from '../assets/Images/graphgrad.png'
import { Component, Pad, Text } from '../styles/computed/styles'

export const Details = () => {
  return (
  <>
  <div className="flex w-100">
  <Component className="flex w-100 center card-details-container" px={4}>
  <Pad className='flex align w-100 span-card-details' gap={.5} size={80}>
  <Pad className="flex center w-100 card-details flex-column" wallpaper={xgrad}>
  <Text className='heavy col-white' size={2.2}>15x</Text><Text opacity={.7}>AVG ROI</Text>
  </Pad>
  <Pad className="flex justify w-100 flex-column card-details" px={0} wallpaper={graphgrad}>
  <Component px={1.5} className='flex flex-column'>
  <Text className='heavy col-white' size={2.2}>113,050</Text><Text opacity={.7}>Participants</Text>
  </Component>
  </Pad>
  <Pad className="flex center w-100 card-details flex-column" wallpaper={xgrad}>
  <Text opacity={.7}>Total assets</Text>
  <Text className='heavy col-white' size={2.2} ltsp={.03}>$1 billion+</Text>
  <Text opacity={.7}>Connected</Text>
  </Pad>
  </Pad>
  </Component>
  </div>
  </>
  )
}