import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';

import logoImg from './assets/Logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios'; 
import { Carousel } from './components/Carousel';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    })
  }, [])

  return (
    <div className="max-w-[1344px] px-6 mx-auto flex flex-col items-center my-20 md:px-0">
      <img className="w-1/2 md:w-72" src={logoImg} alt=""/>

      <h1 className=" text-4xl md:text-6xl text-white font-black mt-10 md:mt-20">
        Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.
      </h1>
        <Carousel>
          {games.map(game => {
            return (
              <GameBanner
                key={game.id} 
                id={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            )
          })}
        </Carousel>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
      
    </div>
  )
};

export default App;
