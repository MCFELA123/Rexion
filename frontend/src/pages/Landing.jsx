import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Component, View } from '../styles/computed/styles';
import { Navbar } from '../components/Navbar';
import { AppContent } from '../components/AppContent';
import { Details } from '../components/Details';
import { Portal } from '../components/Portal';
import Background from '../components/Background';

function Landing() {
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
  const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;

  const connectWallet = async () => {
    if (!window.ethereum) return alert('MetaMask no dey');
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

  return (
  <div>
   <View size={100} className="flex flex-column">
   <Navbar/>
   <Component className="app-view flex flex-column overflow" py={2}>
    <AppContent/>
    <Details/>
   </Component>
   </View>
   <Portal/>
   </div>
  );
}

export default Landing;