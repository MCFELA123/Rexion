import { Button, Component, Pad, SpaceBetween, Text } from "../styles/computed/styles"
import { ConcaveBox, IconArrowRight, IconFavico } from "./icons/Icons"

export const Navbar = ({ wallet }) => {
  function openPortal() {
  document.querySelector('.portal-window').setAttribute('style','visibility: visible;opacity: 1;')
  document.querySelector('.portal-span').setAttribute('style','visibility: visible;opacity: 1;transform: none')
  }

  // Format wallet to max 10 characters with ellipsis
  const shortWallet = wallet ? `${wallet.slice(0, 10)}...` : null;

  return (
  <div className="navbar flex center">
  <Component className="flex align justify-start w-100 nav-scaled">
  <div className="absolute" style={{ transform: 'translateY(6px) translateX(-5em)' }}>
    <IconFavico />
  </div>
  <SpaceBetween px={1.5} />
  <Text className="heavy col-white" size={1.3}>REXION</Text>
  <SpaceBetween px={.3} />
  <div className="tag"><Text size={1}>network</Text></div>
  </Component>

  <Component className="flex center w-100 link-hold">
  <div className="nav-items">
    <Text>Portfolio</Text>
  </div>
  <ConcaveBox />
  <div className="nav-items">
    <Text>Technology</Text>
  </div>
  <ConcaveBox />
  <div className="nav-items">
    <Text>Developers</Text>
  </div>
  <ConcaveBox />
  <div className="nav-items">
    <Text>Company</Text>
  </div>
  <ConcaveBox />
  <div className="nav-items">
    <Text>Ecosystem</Text>
  </div>
  </Component>

  <Component className="flex align justify-end w-100 nav-scaled">
  <Component className="flex center btn-house linear-gbg" px={.11} py={.11} radius={5}>
    <Button
    onClick={openPortal}
    px={.4}
    py={.4}
    radius={5}
    className="w-100 h-100 flex align bg-darker pointer col-white linear-gbg-hover cnct-btn"
    >
    <Pad radius={5} className="flex center bg-white col-dark icon-arrow">
    <div className="arrow-icon flex center"><IconArrowRight /></div>
    </Pad>
    <SpaceBetween px={.3} />
    <Text size={.995}>
    {shortWallet || 'Connect Wallet'}
    </Text>
    <SpaceBetween px={.3} />
    </Button>
  </Component>
  </Component>
  </div>
  );
};
