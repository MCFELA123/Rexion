import { Break, Component, Pad, Text } from "../styles/computed/styles"
import { IconDiscord, IconSend, IconTwitter } from "./icons/Icons"

export const AppContent = () => {
  return (
  <>
  <div className="flex center">
  <div>
  <Break sy={4}/>
  <div className="text-center">
  <Text size={5.5} lnh={0.9} className="themed-text">
  <Text className="heavy gradient-white">Most Liquid</Text>
  <br />
  <Text className="heavy gradient-white">primary market</Text>
  </Text><br />
  <Break sy={2.5}/>
  <Text size={1.2} opacity={.8}>Claim first access to the most <br /> important tokens in crypto.</Text>
  <Break sy={1.5}/>
  <div className="flex center">
  <Component className="floating-card">
  <Component className="card-floater flex" gap={.3}>
  <Pad px={1.5} py={.6} radius={5} className="flex center pointer bg-darker card-links"><IconSend/></Pad>
  <Pad px={1.5} py={.6} radius={5} className="flex center pointer bg-darker card-links"><IconTwitter/></Pad>
  <Pad px={1.5} py={.6} radius={5} className="flex center pointer bg-darker card-links"><IconDiscord/></Pad>
  </Component>
  </Component>
  </div>
  <Break sy={4.5}/>
  </div>
  </div>
  </div>
  </>
  )
}