import { CaretLeft, CaretRight } from "phosphor-react";
import { FormEvent, useRef } from "react";

interface CarouselProps {
  children: React.ReactElement[];
}

export function Carousel(props: CarouselProps) {
  const slider = useRef<any>(0);

  function handleLeftClick(event: FormEvent) {
    event.preventDefault();

    const teste = slider.current.scrollLeft -= slider.current.offsetWidth;
    console.log(typeof(teste), teste)
  }

  function handleRightClick(event: FormEvent) {
    event.preventDefault();

    slider.current.scrollLeft += slider.current.offsetWidth;
  }
  return (
    <div className="relative w-full">
      <button 
        className="absolute top-1/2 bottom-1/2 left-[-70px] hidden md:block"
        onClick={handleLeftClick}
      > 
      <CaretLeft 
        size={48} 
        className="text-zinc-400"/> 
      </button>
    <div ref={slider} className="max-w-[1344px] flex gap-6 scroll-smooth overflow-x-scroll scrollbar-hide mt-16">
      { props.children }
    </div>
      <button
        className="absolute top-1/2 bottom-1/2 right-[-70px] hidden md:block"
        onClick={handleRightClick}
      > 
        <CaretRight 
          size={48} 
          className="text-zinc-400"
        /> 
      </button>
    </div>
  )
}