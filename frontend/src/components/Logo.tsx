import { kaushan } from "@/utils/fonts"
import { GiSpellBook } from "react-icons/gi";

export default function MyLogo() {
    return (
        <div className={`${kaushan.className} flex flex-row items-center leading-none text-[#331832]`}>
            <GiSpellBook className="h-8 w-8 mr-2" />
            <p className="flex text-2xl">Spoilers Ahead</p>
        </div>
    );
}