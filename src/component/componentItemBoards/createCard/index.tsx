import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { addTask } from "../../../store/reducer";
interface Prop {
    idColumnAddCard: string | null;
    columnId: string;
    handleSetIdColumnAddCard: (id: string | null) => void;
}

const CreateCard = (prop: Prop) => {
    const { idColumnAddCard, columnId, handleSetIdColumnAddCard } = prop;
    const dispatch = useDispatch()
    const textarea = useRef<HTMLTextAreaElement>(null)

    const [titleTask, setTitleTask] = useState<string | null>("");

    // handle add task on column
    const handleAddTask = () => {
        if (titleTask) {
            const target = textarea.current as HTMLTextAreaElement
            const newTask = {
                id: uuidv4(),
                columnId: columnId,
                title: titleTask,
                dates: {
                    day: NaN,
                    month:NaN ,
                    year: NaN,
                    hour: NaN,
                    minute:NaN ,
                    isShow: false,
                    dateComplete: false,
                    monthWord: '',
                }
            };
            dispatch(addTask(newTask));
            setTitleTask("");
            target.style.height = "60px"
        }
    };
    return idColumnAddCard === columnId ? (
            <div className="mx-[10px] mb-[8px] text-sm">
                <textarea
                    placeholder="Enter a title for this card..."
                    ref={textarea}
                    className="
                    colorScrollBar
                    focus:outline-none
                    resize-none
                    bg-background-box 
                    rounded-[6px] 
                    min-h-[60px]
                    max-h-[150px]
                    w-full
                    p-[8px]
                    "
                    value={titleTask ?? ""}
                    onChange={(e) => {
                        e.target.style.height = 0 + "PX"
                        e.target.style.height = e.target.scrollHeight + "px"
                        setTitleTask(e.target.value.trimStart())
                        }
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddTask();
                        }
                    }}
                />
                <div className="flex gap-2 items-center mt-[8px]">
                    {/* button add card */}
                    <button
                        className="w-[73px] h-[32px] bg-create-button-background hover:bg-create-button-background-hovered text-black text-sm rounded-[4px]"
                        onClick={() => handleAddTask()}
                    >
                        Add cart
                    </button>
                    {/* button close */}
                    <div
                        className="text-[18px] cursor-pointer"
                        onClick={() => {
                            handleSetIdColumnAddCard(columnId);
                            setTitleTask("");
                        }}
                    >
                        <AiOutlineClose />
                    </div>
                </div>
            </div>
        ) : (
            // open section add card
            <div
                className="flex items-center gap-2 rounded-[7px] mx-[10px] p-[8px] mb-[8px] cursor-pointer hover:bg-background-box-hover"
                onClick={() => handleSetIdColumnAddCard(columnId)}
            >
                <div className="text-[18px]">
                    <AiOutlinePlus />
                </div>
                <div className=" text-[14px]">Add a card</div>
            </div>
        )
    
};

export default CreateCard;
