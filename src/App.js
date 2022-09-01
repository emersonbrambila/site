import { Fragment, useEffect, useState } from "react";
import "./App.css";

import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Logo from "./logo.svg";
import Bandeira from "./bandeira.png";
import Raid from "./raid.png";
import Crisol from "./crisol.png";
import Assalt from "./assalt.png";
import Hunter from "./hunter.png";
import DestinyIcon from "./destiny-icon.png";
import Viajante from "./viajante.png";
import GifLoadScreen from "./destiny2-loadscreen-destiny2.gif";
import Top from "./up-arrow.png";

import axios from "axios";

import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const clanBaseurl = "https://www.bungie.net/platform/groupv2";
const axioDevConfig = {
  headers: {
    "X-API-Key": "c7ccdb048acb455aa0ab5005a1bcae96", //"e9988948e6c64dae863a5e24e3adca7a",
    "content-type": "application/json"
  }
};

const axiosProdConfig = {
  headers: {
    "X-API-Key": "c7ccdb048acb455aa0ab5005a1bcae96",
    "content-type": "application/json"
  }
};

function App() {
  const [clanData, setClanData] = useState({});
  const [clanRoster, setClanRoster] = useState([]);
  const [clanAdmin, setClanAdmin] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const responsiveMembers = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  let Link = Scroll.Link;

  useEffect(() => {
    const getClanData = async () => {
      const data = await axios.get(`${clanBaseurl}/4708371`, process.env.NODE_ENV === "production" ? axiosProdConfig : axioDevConfig);

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

  useEffect(() => {
    const getClanRoster = async () => {

      const clanID = [
        '4708371'
      ]

      let roster = [];
      let cachedRoster = new Map();

      sessionStorage.removeItem('roster');

      for (let i = 0; i < clanID.length; i++) {
        let request = await axios.get(`${clanBaseurl}/${clanID[i]}/Members`, process.env.NODE_ENV === "production" ? axiosProdConfig : axioDevConfig);

        if (request.status === 200 || request.ErrorCode === 1) {

          request.data.Response.results.forEach(player => {

            if (typeof player.bungieNetUserInfo != 'undefined') {

              console.log(player)

              const formattedPlayer = {
                name: player.destinyUserInfo.bungieGlobalDisplayName,
                icon: player.bungieNetUserInfo.iconPath,
                bungieId: player.bungieNetUserInfo.membershipId,
                destinyId: player.destinyUserInfo.membershipId,
                memberType: player.memberType,
                joinDate: player.joinDate,
                status: player.isOnline ? 'Online' : 'Offline'
              };

              roster.push(formattedPlayer);
              cachedRoster.set(player.destinyUserInfo.membershipId, formattedPlayer);
            } else {
              console.warn(`Unable to retrieve Bungie Profile for ${player.destinyUserInfo.displayName}`);
            }
          });

        } else {
          // error retrieving roster for associated clan ID in loop
          console.error(`There was a problem retrieving clan roster for ID #${this.clan.clanIds[i]}`);
        }
      }

      if (roster.length) {
        sessionStorage.setItem('roster', JSON.stringify(roster));
        roster.sort(function (a, b) {
          return ((a.status < b.status) ? 1 : ((b.status < a.status) ? -1 : 0));
        });

        const treatClanAdmin = roster.filter(({ memberType }) => memberType === 3 || memberType === 5);
        const clanMember = roster.filter(({ memberType }) => memberType !== 3 && memberType !== 5);

        setClanAdmin(treatClanAdmin);
        setClanRoster(clanMember);
      }

    };

    getClanRoster().catch(err => console.log(err))
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <div className="Menu">
          <div className="Logo-center">
            <Link className="Menu-Link" activeClass="active" to="home" spy={true} smooth={true} offset={50} duration={500}>HOME</Link>
            <Link className="Menu-Link" activeClass="active" to="caracteristicas" spy={true} smooth={true} offset={50} duration={500}>CARACTERÍSTICAS</Link>
            <img className="Lonely-logo" src={Logo} alt="Lonely Wolves" />
            <Link className="Menu-Link" activeClass="active" to="membros" spy={true} smooth={true} offset={50} duration={500}>O CLAN</Link>
            <a className="Menu-Link" href="https://chat.whatsapp.com/Hq5eB0APdIlC4YQUCorWZ3" target="_blank" rel="noreferrer">JUNTE-SE AO CLAN</a>
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
                <h1 className="line">TORNE-SE UMA LENDA CONOSCO</h1>
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
      <div id="membros" className="MembrosOnline">
        <div className="Content">
          <div className="Administradores">
            <h3>Administradores</h3>
            {
              clanRoster.length > 0 ?
                <Carousel
                  swipeable={false}
                  draggable={true}
                  showDots={false}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={6000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  containerclassName="carousel-container-admin"
                  removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                  dotListclassName="custom-dot-list-style"
                  itemclassName="carousel-item-padding-40-px"
                >
                  {
                    clanAdmin.map(admins =>
                      <div key={admins.memberType} className="memberContent Border-Radius">
                        <div className="rosterUser">
                          <div style={{
                            backgroundImage: `url(${`https://www.bungie.net${admins.icon}`})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100%"
                          }} className="user-icon">

                            <div className={`${admins.status} ${admins.status === "Online" ? 'pulse' : ''} user-status`}></div>

                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              <p>{admins.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </Carousel> :
                Fragment
            }
          </div>
          <div className="MembrosDoClan">
            <h3>Membros do Clan</h3>
            {
              clanRoster.length > 0 ?
                <Carousel
                  swipeable={false}
                  draggable={true}
                  showDots={false}
                  responsive={responsiveMembers}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  containerclassName="carousel-container-member"
                  removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                  dotListclassName="custom-dot-list-style-member"
                  itemclassName="carousel-member-item-padding-40-px"
                >
                  {
                    clanRoster.map(members =>
                      <div key={members.memberType} className="memberContent Border-Radius">
                        <div className="rosterUser">
                          <div style={{
                            backgroundImage: `url(${`https://www.bungie.net${members.icon}`})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100%"
                          }} className="user-icon">

                            <div className={`${members.status} ${members.status === "Online" ? 'pulse' : ''} user-status`}></div>

                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              <p>{members.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </Carousel> :
                Fragment
            }
          </div>
        </div>
      </div>
      <div className="TextPreFooter">
        <div className="Content">
          <p>
            "A luz mora em todos os lugares... em todas as coisas... você pode bloqueá-la... até mesmo tentar prendê-la... mas a luz sempre encontra seu caminho." - O Orador
          </p>
        </div>
      </div>
      <div className="Footer">
        <div className="Content">
          <div className="MenuFooter">
            <div className="Logo-center">
              <img className="FooterLogo" src={GifLoadScreen} alt="Lonely Wolves" />
              <p className="Menu-Link">© 2022 Lonely Wolves.</p>
              <p className="Menu-Link">Todos os direitos reservados. | Paradigma </p>
            </div>
          </div>
        </div>
      </div>
      <Link activeClass="active" to="top" spy={true} smooth={true} offset={50} duration={500} className="btntop"><img className="Top" src={Top} alt="Top" /></Link>
    </div>
  );
}

export default App;
