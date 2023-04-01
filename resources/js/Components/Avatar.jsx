
export default function Avatar({ src }) {
    return <>
       <div className="relative flex">
            <img src={src} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="absolute bottom-[1px] right-[1px] w-2.5 h-2.5 bg-lime-400 rounded-full"></div>
       </div>

    </>;
}
