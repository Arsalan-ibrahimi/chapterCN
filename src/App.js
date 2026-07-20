import logo from './logo.svg';
import './App.css';
import NavigationBar from './views/navigationBar'
import Hero from './views/hero'
import Footer from './views/footer'
import StoryList from './views/storylist'
import StoryPage from './views/storypage'
import Animate from './views/doodleanimate'
import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import ScrollingAnimation from './views/scrollingAnimation';
import HeroAnimation from './views/heroSection'
function App() {


  
  return (
      <ReactLenis root>
    <div className="App">
      <NavigationBar/>
     <HeroAnimation/>
    <StoryList/>
    
    <ScrollingAnimation/>
    <Animate/>
      {/* <Footer/> */}

    </div>
    </ReactLenis>
  );
}

export default App;
