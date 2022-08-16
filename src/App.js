import './App.css';
import Logo from './logo.svg';
import Bandeira from './bandeira.png';
import Hunter from './hunter.png';
import DestinyIcon from './destiny-icon.png';

function App() {
  return (
    <div className="App">
      <div className='Header'>
        <div className='Menu'>
          <div className='Logo-center'>
            <span className='Menu-Link'>HOME</span>
            <span className='Menu-Link'>O CLAN</span>
            <img className='Lonely-logo' src={Logo} alt="Lonely Wolves" />
            <span className='Menu-Link'>CARACTERÍSTICAS</span>
            <span className='Menu-Link'>JUNTE-SE AO CLAN</span>
          </div>
        </div>
      </div>
      <div id="home" className='Banner' style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/banner_principal.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        maxHeight: '600px',
      }}>
        <div className='Content'>
          <div className='Body-Content'>
            <div className='Bandeira-Clan'>
              <img className='Bandeira' src={Bandeira} alt="Lonely Wolves Clan" />
            </div>
            <div className='Clan-Text'>
              <h1>"Por mais árdua que seja a jornada, continue caminhando. Seja a Luz e a Escuridão, mas nunca se curve a ninguém."</h1>
            </div>
          </div>
        </div>
        <div className='Red-Board'>
          <img className='Hunter' src={Hunter} alt="Hunter" />
        </div>
      </div>
      <div id="caracteristicas" className='Caracteristicas' style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/content-bg.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      }}>
        <div className='Content'>
          <div className='Inscricao Border-Radius' style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/bg-inscricao.png'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}>
            <div className='Icon'>
              <img className='IconDestiny' src={DestinyIcon} alt="Destiny" />
            </div>
            <h4>Faça parte do clan!</h4>
            <button className='BtnInscricao'>Clique aqui</button>
          </div>
          <div className='Modalide-Jogo'>
            <div className='Coluna-Menor Border-Radius' style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + '/raid.png'})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '-70px',
            }}></div>
            <div className='Coluna-Menor Border-Radius' style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + '/assalt.png'})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '-190px',
            }}></div>
            <div className='Coluna-Menor Border-Radius' style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + '/crisol.png'})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '-40px',
            }}></div>
            <div className='Coluna-Maior Border-Radius'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
