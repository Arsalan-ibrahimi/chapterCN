import logo from './logo.svg';
import './App.css';
import NavigationBar from './views/navigationBar'
import Hero from './views/hero'
import Footer from './views/footer'
import StoryList from './views/storylist'
import StoryPage from './views/storypage'
import Animate from './views/doodleanimate'
function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Hero/>
    <StoryList/>
    <Animate/>
   
      {/* <Footer/> */}

    </div>
  );
}

export default App;
