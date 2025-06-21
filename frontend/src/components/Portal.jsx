import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Break, Button, Component, Pad, PortalWindow, Text, View } from "../styles/computed/styles"
import { IconFavico, IconSwap, IconWallet } from "./icons/Icons"
import { PortalGrid } from "./Portalgrid"

export const Portal = () => {
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
  const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;

  const connectWallet = async () => {
    if (!window.ethereum) return alert('MetaMask is not installed');
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
    await saveWalletToBackend(accounts[0]);
    localStorage.setItem('wallet', accounts[0]);
    navigate('/dashboard');
  };

useEffect(() => {
  const autoConnect = async () => {
    const saved = localStorage.getItem('wallet');
    if (!saved) return;

    const accounts = await provider.send('eth_accounts', []);
    if (accounts.length > 0) {
      setWallet(accounts[0]);
      navigate('/dashboard');
    }
  };
  autoConnect();
}, []);

const saveWalletToBackend = async (address) => {
  try {
    await fetch('http://localhost:4000/save-wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
  } catch (err) {
    console.error("Error saving wallet:", err);
  }
};

function closePortal() {
  document.querySelector('.portal-window').setAttribute('style','hidden: visible;opacity: 0;')
  document.querySelector('.portal-span').setAttribute('style','hidden: visible;opacity: 0;transform: translateY(-2em)')
}

  return (
   <View size={100} className="flex center portal-window" background={'#00000080'}>
   <PortalWindow className="relative overflow-hidden portal-span">
   <div className="relative">
   <div className="absolute blur w-100 h-100">
   <Break sy={6}/>
   <Component className="flex center" gap={3.5}>
   <div>
   <Pad className="bd-lighter flex" px={.25} py={.25} radius={1.7} bd={.1}>
   <Pad className="flex center bd-light linear-green-dark" px={2.5} py={2.4} radius={1.4} bd={.01}>
   <div className="flex center absolute" style={{transform:'translateY(3px) translateX(2px)'}}>
   <IconFavico/>
   </div>
   </Pad>
   </Pad>
   </div>
   
   <div className="flex center absolute">
   <IconSwap/>
   </div>

   <div>
   <Pad className="bd-lighter flex" px={.25} py={.25} radius={1.7} bd={.1}>
   <Pad className="flex center bd-light linear-orange-dark" px={2.5} py={2.4} radius={1.4} bd={.01}>
   <div className="absolute">
   <IconWallet/>
   </div>
   </Pad>
   </Pad>
   </div>
   </Component>
   <Break sy={5}/>
   <Component className="flex-column center" px={2.5}>
   <div className="text-center">
   <Text className="col-white" size={2.2}>Connect Wallet</Text>
   <Break sy={.4}/>
   <Text opacity={.5} size={1}>Signing in with your wallet is required to <br />setup your web3 account.</Text>
   <Break sy={3}/>
   </div>
   <Button onClick={connectWallet} py={1} radius={5} className="w-100 bg-green bd-green-hover ease-2 col-white-hover pointer">
   <Text className="col-darker ease-2">Sign in with Meta mask</Text>
   </Button>
   <Break sy={.6}/>
   <Button onClick={closePortal} py={1} radius={5} className="w-100 bg-unset bd-light bd-white-hover ease-2 col-white-hover pointer">
   <Text className="col-white ease-2" opacity={.8}>Do it later</Text>
   </Button>
   </Component>
   </div>
   </div>
   <PortalGrid/>
   </PortalWindow>
   </View>
  )
}