import { Icon, View } from "../styles/computed/styles";
import strong from "../assets/Images/strong.png"
import mcRex from "../assets/Images/mcRex.png"

const Background = () => {
  return (
  <div className="main-background">
   <div className="radal-shadow"/>
   <div className="neon-grid"/>
   <View size={100} className="flex center">
   <div className="radal-3d"/>
   <div className="radal-background">
   <div className="absolute index-out">
   <Icon size={22} className="absolute strg-text" src={strong} alt="" />
   <Icon size={20} className="absolute mcrex-text" src={mcRex} alt="" />
   </div>
   </div>
   </View>
  </div>
  );
};

export default Background