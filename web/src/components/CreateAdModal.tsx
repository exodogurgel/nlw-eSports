import { FormEvent, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [gamesInput, setGamesInput] = useState("");
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso')
      location.reload()
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio')
    }
  }

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    })
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 fixed inset-0" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-11/12 max-w-[480px] md:w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className=" text-2xl md:text-3xl font-black">Publique um anúncio</Dialog.Title>

      <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="game">Qual o game?</label>
          <Select.Root onValueChange={setGamesInput} name="game"> 
            <Select.Trigger
              id="game"
              aria-label="game" 
              className={`flex justify-between px-4 py-3 bg-zinc-900 rounded text-sm ${gamesInput ? "text-white" : "text-zinc-500"}`}>
              <Select.Value placeholder="Selecione o game que deseja jogar"/>
              <Select.Icon>
                <CaretDown size={22} className="text-zinc-400"/>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="fixed top-[45.6%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-lg w-9/12 max-w-[480px] md:w-[408px] shadow-lg shadow-black/25" >
                <Select.ScrollUpButton>
                  <CaretDown size={24} />
                </Select.ScrollUpButton>
                <Select.Viewport className="py-2 px-1">   
                  <Select.Group>
                    <Select.Label className="flex items-center gap-2 cursor-text text-zinc-200 text-lg py-2 px-3 m-1">Selecione um game</Select.Label>
                    <Select.Separator className="border-b-[1px] border-zinc-500"/>
                    {games.map(game => {
                      return (
                        <Select.Item key={game.id} value={game.id} className="flex items-center justify-between py-2 px-3 m-1 text-zinc-500 rounded cursor-auto bg-zinc-900 hover:bg-zinc-800 hover:text-white">
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check size={24} className="text-emerald-500"/>
                          </Select.ItemIndicator>
                        </Select.Item>
                      )
                    })}

                  </Select.Group>             
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Seu nome (ou nickname)</label>
          <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser Zero"/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="discord">Qual o seu Discord</label>
            <Input name="discord" id="discord" placeholder="Usuário#0000"/>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="weekDays">Quando costuma jogar?</label>

            <ToggleGroup.Root 
              type="multiple" 
              className="grid grid-cols-4 gap-2"
              value={weekDays}
              onValueChange={setWeekDays}
            >

              <ToggleGroup.Item 
                value={'0'}
                title="Domingo"
                className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                D
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'1'}
                title="Segunda"
                className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'2'}
                title="Terça"
                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                T
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'3'}
                title="Quarta"
                className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'4'}
                title="Quinta"
                className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'5'}
                title="Sexta"
                className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item 
                value={'6'}
                title="Sábado"
                className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart">Qual horário do dia?</label>
            <div className="grid grid-cols-2 gap-2">
              <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
              <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
            </div>
          </div>
        </div>

        <label className="mt-2 flex items-center gap-2 text-sm">
          <Checkbox.Root 
            checked={useVoiceChannel}
            className="w-6 h-6 p-1 rounded bg-zinc-900"
            onCheckedChange={(checked) => {
              if (checked === true) {
                setUseVoiceChannel(true)
              } else {
                setUseVoiceChannel(false)
              }
            }}
          >
            <Checkbox.Indicator>
              <Check className="w-4 h-4 text-emerald-400" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Costumo me conectar ao chat de voz
        </label>

        <footer className="mt-4 flex justify-end gap-4">
          <Dialog.Close 
            type="button"
            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition"
          >
            Cancelar
          </Dialog.Close>

          <button 
            type="submit"
            className="bg-violet-500 px-5 h-12 text-sm md:text-base rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition">
            <GameController size={24}/>
            Encontrar duo
          </button>
        </footer>
      </form>
    </Dialog.Content>
  </Dialog.Portal>
  )
}