import './Home.css';
import Navigation from '../Navigation';

const Home = () => {
  return (
    <div className='home'>
      <Navigation isLoaded />
      <div className='home-text'>
        <div className='home-user'>PROPHOUSE MANAGER & SET DESIGNER </div>
        <div className='home-title'>PROP MASTER</div>
        <div className='home-description'>
          a new way to share the project you're involved, as well as create your
          setlist for your next project
        </div>
      </div>
      <div className='footer'>
        <a href='https://www.linkedin.com/in/yuan-wang-80613052/'>Linkedin</a>
        &nbsp;|&nbsp;
        <a href='https://github.com/kickbessie612'>Github</a>
      </div>
    </div>
  );
};

export default Home;
