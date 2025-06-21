import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashbord';
import { Component, Text, View } from './styles/computed/styles';
import { ConcaveBox } from './components/icons/Icons';

function App() {
  return (
  <View size={100}>
  <Routes>
   <Route path="/" element={<Landing />} />
   <Route path="/dashboard" element={<Dashboard />} />
   <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  <Component className="foot-action flex center ease-3" py={1}>
    <div className="nav-items">
    <Text>Portfolio</Text>
    </div>
    <ConcaveBox/>
    <div className="nav-items">
    <Text>Technology</Text>
    </div>
    <ConcaveBox/>
    <div className="nav-items">
    <Text>Developers</Text>
    </div>
    <ConcaveBox/>
    <div className="nav-items">
    <Text>Company</Text>
    </div>
    <div className='flex align nav-item-removed'>
    <ConcaveBox/>
    </div>
    <div className="nav-items nav-item-removed">
    <Text>Ecosystem</Text>
    </div>
  </Component>
  </View>
  )
}

export default App;