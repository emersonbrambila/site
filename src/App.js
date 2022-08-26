import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./logo.svg";
import Bandeira from "./bandeira.png";
import Raid from "./raid.png";
import Crisol from "./crisol.png";
import Assalt from "./assalt.png";
import Hunter from "./hunter.png";
import DestinyIcon from "./destiny-icon.png";
import Viajante from "./viajante.png";
import axios from "axios";

import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const clanBaseurl = "https://www.bungie.net/platform/groupv2";
const axioDevConfig = {
  headers: {
    "X-API-Key": process.env.REACT_APP_APIKEYDEV,
    "content-type": "application/json"
  }
};

const axiosProdConfig = {
  headers: {
    "X-API-Key": process.env.REACT_APP_APIKEYPROD,
    "content-type": "application/json"
  }
};

function App() {
  const [clanData, setClanData] = useState({});

  useEffect(() => {
    const getClanData = async () => {
      const data = await axios.get(`${clanBaseurl}/4708371`, process.env.NODE_ENV === "development" ? axioDevConfig : axiosProdConfig);

      if (data) {
        const response = data.data.Response;

        const treatDataResponse = {
          members: response.detail.memberCount,
          createAt: response.detail.creationDate,
          clanFounder: response.founder
        }

        setClanData(treatDataResponse);

      }

    };

    getClanData().catch(err => console.log(err))
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <div className="Menu">
          <div className="Logo-center">
            <span className="Menu-Link">HOME</span>
            <span className="Menu-Link">O CLAN</span>
            <img className="Lonely-logo" src={Logo} alt="Lonely Wolves" />
            <span className="Menu-Link">CARACTERÍSTICAS</span>
            <span className="Menu-Link">JUNTE-SE AO CLAN</span>
          </div>
        </div>
      </div>
      <div id="home" className="Banner" style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/banner_principal.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        maxHeight: "630px",
      }}>
        <div className="Content">
          <div className="Body-Content">
            <div className="Bandeira-Clan">
              <img className="Bandeira" src={Bandeira} alt="Lonely Wolves Clan" data-aos="fade-right" />
            </div>
            <div className="Clan-Text" data-aos="fade-up">
              <h1>"Por mais árdua que seja a jornada, continue caminhando. Seja a Luz e a Escuridão, mas nunca se curve a ninguém."</h1>
            </div>
          </div>
        </div>
        <div className="Red-Board">
          <div className="clanInfo">
            <p data-aos="fade-down">Somos uma comunidade de pessoas que gostam de jogar Destiny 2 e um lugar para chamar de lar. <br></br><br></br>
              Contamos com pessoas incríveis e com várias habilidades em Destiny 2, queremos ter experiências divertidas e envolventes, fazer amizades douradoruras.
              Se precisar de ajuda ou estiver procurando um lar para jogar, junte-se a nós!</p>

            <p data-aos="fade-right">Os lobos estão a solta.</p>

            <div className="details-container">
              <ul className="clanList">
                <li className="membercount" data-aos="fade-up"><div><h3>MEMBROS {clanData.members || 100}</h3></div></li>
                <li className="creation" data-aos="fade-up"><div><h3>Criado em {moment(clanData.createAt).format("DD/MM/YYYY")}</h3></div></li>
              </ul>
            </div>
          </div>
          <div className="ImageHunter">
            <img className="Hunter" src={Hunter} alt="Hunter" data-aos="fade-left" />
          </div>
        </div>
      </div>
      <div id="caracteristicas" className="Caracteristicas" style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/content-bg.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      }}>
        <div className="Content">
          <div className="Inscricao Border-Radius" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/bg-inscricao.png"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
            <div className="Icon">
              <img className="IconDestiny" src={DestinyIcon} alt="Destiny" />
            </div>
            <h4>Faça parte do clan!</h4>
            <a className="BtnInscricao" href="https://www.bungie.net/pt-br/ClanV2?groupid=4708371" target="_blank" rel="noreferrer" data-aos="zoom-in-up" >Clique aqui</a>
          </div>
          <div className="grid Modalide-Jogo">
            <div className="figure Coluna-Menor Border-Radius">
              <img src={Raid} alt="Raid" />
              <div className="figcaption">
                <h2><span>Incursões</span></h2>
                <p>Se você gosta de raids ou de atividades de alto nível pode contar conosco!</p>
              </div>
            </div>
            <div className="figure Coluna-Menor Border-Radius">
              <img src={Assalt} alt="GM" />
              <div className="figcaption">
                <h2><span>Grão Mestre</span></h2>
                <p>Especialistas em GMS nós gostamos de mergulhar nos anoiteceres.</p>
              </div>
            </div>
            <div className="figure Coluna-Menor Border-Radius">
              <img src={Crisol} alt="Crisol" />
              <div className="figcaption">
                <h2><span>Crisol</span></h2>
                <p>Nada como o maravilhoso PVP de Destiny :o. Eeehw da pra tentar Osiris!</p>
              </div>
            </div>
            <div className="Coluna-Maior Border-Radius">
              <img src={Viajante} alt="Lenda" />
              <div className="Lenda">
                <h1>TORNE-SE UMA LENDA CONOSCO</h1>
                <p>
                  O universo de Destiny é vasto e encantador. Junto com uma comunidade de milhões de jogadores e nós fazemos parte dela, estamos aqui para te ajudar.
                </p>
              </div>
              <div className="Grupo">
                <a className="BtnComunidade" href="https://chat.whatsapp.com/Hq5eB0APdIlC4YQUCorWZ3" target="_blank" rel="noreferrer" data-aos="zoom-in-up" >ENTRE NA COMUNIDADE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
