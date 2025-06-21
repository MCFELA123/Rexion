import { Component, Pad, Portalgrid } from "../styles/computed/styles"

export const PortalGrid = () => {
  return (
   <div className="flex justify relative portal-grid index-in">
   <Component className="flex justify">
   <div className="flex align-start absolute index-out op-06" style={{transform:'translateX(2.2em) translateY(2.4em)'}}>
    <Pad px={2.5} py={.08} background={'#ff7700'}/>
    <Pad px={.08} py={1.5} background={'linear-gradient(#ff7700, #ff770080, #ff770040, #ff770010,  #ff770000) !important'}/>
   </div>

   <div className="flex align-start absolute index-out op-06" style={{transform:'translateX(-6.55em) translateY(11.5em) scaleX(-1) rotate(180deg)'}}>
    <Pad px={1.9} py={.08} background={'linear-gradient(to right, #00ff88, #00ff7399, #00ff5580, #00ff1540, #00ff1535) !important'}/>
    <Pad px={.08} py={1.5} background={'linear-gradient(#00ff1545, #00ff1530, #00ff1520, #00ff1510,  #ff770000) !important'}/>
   </div>

   <div className="flex align-start absolute index-out op-06" style={{transform:'translateX(-9.6em) translateY(7.6em)'}}>
    <Pad px={2.5} py={.08} background={'linear-gradient(to right, #00ff88, #00ff7380, #00ff5540, #00ff1510,  #ff770000) !important'}/>
   </div>

   <div className="flex align-start absolute index-out op-06" style={{transform:'translateX(9.6em) translateY(7.6em)'}}>
    <Pad px={2.5} py={.08} background={'linear-gradient(to left, #ff7700, #ff770080, #ff770040, #ff770010,  #ff770000) !important'}/>
   </div>
   </Component>
   <Portalgrid className="flex">
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   <div className="line-grid-y w-100"/>
   </Portalgrid>
   <Pad className="flex flex-column absolute w-100 h-100">
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   <div className="line-grid-x h-100"/>
   </Pad>
   <Pad className="absolute portal-glow-eff"/>
   <Pad className="absolute portal-sh-eff"/>
   </div>
  )
}

    // <Pad px={2.5} py={.08} background={'linear-gradient(to right, #00ff88, #00ff7380, #00ff5540, #00ff1510,  #ff770000) !important'}/>