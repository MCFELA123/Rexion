import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { Break, Button, Component, Pad, SpaceBetween, Text, View } from '../styles/computed/styles';
import { Navbar } from '../components/Navbar';
import { IconArrowRight, IconFavico, IconWallet } from '../components/icons/Icons';

function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [rexionBalance, setRexionBalance] = useState(0);
  const [nodeStatus, setNodeStatus] = useState(false);
  const navigate = useNavigate();
  const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;

  const fetchWalletDetails = async (address) => {
    const balance = await provider.getBalance(address);
    setEthBalance(ethers.formatEther(balance));
  };

  const startNode = async () => {
    const res = await fetch('http://localhost:4000/start-node', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: wallet }),
    });
    const data = await res.json();
    setRexionBalance(parseFloat(data.rexion));
    setNodeStatus(true);
  };

  const stopNode = async () => {
    await fetch('http://localhost:4000/stop-node', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: wallet }),
    });
    setNodeStatus(false);
  };

  const disconnect = async () => {
    await stopNode();
    localStorage.removeItem('wallet');
    setWallet(null);
    setEthBalance(null);
    setRexionBalance(0);
    setNodeStatus(false);
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const stored = localStorage.getItem('wallet');
    if (!stored) return navigate('/');
    setWallet(stored);
    fetchWalletDetails(stored);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('wallet');
    if (!stored) return navigate('/');
    setWallet(stored);

    const fetchData = async () => {
      const res = await fetch(`http://localhost:4000/status/${stored}`);
      const data = await res.json();
      setNodeStatus(data.running);
      setRexionBalance(parseFloat(data.rexion));
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const shortWallet = wallet ? `${wallet.slice(0, 10)}...` : '';

  const formatRexion = (value) => {
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View size={100}>
      <Navbar wallet={wallet} />
      {/* <h1>REXION Dashboard</h1>
      <p><strong>Wallet:</strong> {shortWallet}</p>
      <p><strong>ETH Balance:</strong> {ethBalance} ETH</p>
      <p><strong>Node Status:</strong> {nodeStatus ? '✅ Running' : '❌ Not Running'}</p>
      <p><strong>REXION Earned:</strong> {formatRexion(rexionBalance)} REX</p>
      <button onClick={nodeStatus ? stopNode : startNode}>
        {nodeStatus ? 'Stop Light Node' : 'Start Light Node'}
      </button>
      <br /><br />
      <button onClick={disconnect}>Disconnect Wallet</button> */}
      <Break sy={5}/>
      <Pad className="flex center dashboard-container">
      <Component className="flex flex-column align dashboard" gap={1}>
      <Pad className='flex align dash' gap={1}>
      <div className="flex align dashed">
      <Component radius={.8} className='bg-grey dasher' px={1} py={1}>
      <div className="flex align w-100">
      <div className="w-100"><Text opacity={.5}>My wallet</Text></div>   
      <div className="flex justify-end w-10">
      <div className="tag" onClick={disconnect}><Text className='pointer'>Disconnect</Text></div>
      </div>
      </div>
      <br /><Break sy={.3}/>
      <Text opacity={.8} size={1.05}>Tokens earned</Text>
      <br />
      <div className="flex align">
      <div className="flex align absolute" style={{transform:'scale(.6) translateX(-75%) translateY(4px)'}}><IconFavico/></div>
      <SpaceBetween px={.8}/>
      <div className='flex align'>
      <Text className='col-white heavy' size={2}>{formatRexion(rexionBalance)} <Text className='heavy' opacity={.5} size={.7}>REX</Text></Text>
      </div>
      </div>
      <SpaceBetween px={8}/>
      </Component>
      </div>
      <div className="flex align dashed">
      <Component radius={.8} className='bg-grey dasher' px={1} py={1}>
      <div className="flex align w-100">
      <div className="flex align w-100">
      <Text opacity={.8} size={1.05} className='heavy col-white'>{nodeStatus ? <Text className='col-green'>Node is running</Text> : <Text className='col-danger' size={.8} opacity={.5}>Node is not Running</Text>}</Text>     
      </div>
      <div className="flex justify-end">
      <Text className='col-white' size={1.1}>{shortWallet}</Text>
      </div>
      </div>
      <Break sy={3}/>
      <div className="flex align w-100">
      <div className="flex w-90">
      <Pad className="bd-lighter flex" px={.25} py={.25} radius={5} bd={.1}>
      <Pad className="flex center bd-light linear-green-dark" px={1.5} py={1.4} radius={5}>
      <div className="absolute" style={{scale:'.7'}}>
      <IconWallet/>
      </div>
      </Pad>
      </Pad>
      </div>
      <div className="flex align justify-end w-100">
      <Component className="flex center btn-house linear-gbg" px={.11} py={.11} radius={5}>
      <Button onClick={nodeStatus ? stopNode : startNode} px={.3} py={.3} radius={5}
      className="w-100 h-100 flex align bg-darker pointer col-white linear-gbg cnct-btn">
      <Pad radius={5} className="flex center bg-white col-dark icon-arrow">
      <div className="arrow-icon flex center"><IconArrowRight /></div>
      </Pad>
      <SpaceBetween px={.3} />
      <Text size={.995}>
      {nodeStatus ? 'Stop node' : 'Start node'}
      </Text>
      <SpaceBetween px={.3} />
      </Button>
      </Component>
      </div>
      </div>
      <SpaceBetween px={8}/>
      </Component>
      </div>
      </Pad>
      <Pad className='flex align bg-grey w-100' radius={.8}>
      <Component px={1}>
      <Break sy={1.5}/>
      <Text size={1.2}>Use the REXION App & earn up to <br />100% yield on your crypto.</Text>
      <br /><Break sy={1}/>
      <div className="flex">
      <Component className="flex center btn-house linear-gbg" px={.11} py={.11} radius={5}>
      <Button px={.6} py={.6} radius={5}
      className="w-100 h-100 flex align bg-grey pointer col-white linear-gbg-hover cnct-btn">
      <SpaceBetween px={.3} />
      <Text size={.995} className='col-green'>
      Try the App
      </Text>
      <SpaceBetween px={.3} />
      </Button>
      </Component>
      </div>
      <Break sy={2}/>
      <br />
      </Component>
      </Pad>
      <div className="flex"><div className="tag"><Text>App is still in progress, stay tuned</Text></div></div>
      </Component>
      </Pad>
    </View>
  );
}

export default Dashboard;