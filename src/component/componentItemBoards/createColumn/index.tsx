import { addColumn } from "../../../store/reducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

interface Prop {
    boardId: string | undefined;
}
const CreateColumn = (prop: Prop) => {
    const { boardId } = prop;
    const dispatch = useDispatch();
    const [isShowCreateColumn, setIsShowCreateColumn] =
        useState<boolean>(false);
    const [titleBoard, setTitlesBoard] = useState<string>("");
    const createColumn = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickInCreateColumn = (e: globalThis.MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickCreateColumn = createColumn.current?.contains(target)
            if (!isClickCreateColumn) {
                setIsShowCreateColumn(false)
            }
        }
        document.addEventListener("mousedown", handleClickInCreateColumn)

        return () => {
            document.removeEventListener("mousedown" ,handleClickInCreateColumn)
        }
    },[])

    const handleAddColumn = () => {
        if (titleBoard) {
            const newBoard = {
                id: uuidv4(),
                boardId: boardId as string,
                title: titleBoard,
            };
            dispatch(addColumn(newBoard));
            setTitlesBoard("");
        }
    };
    return (
        <div className="transition-all relative mt-[15px] w-[272px] h-[48px] mr-[10px]">
            <div
                className={`${
                    isShowCreateColumn ? "opacity-0" : "opacity-100"
                } flex items-center w-[272px] h-full bg-[#ffffff42] rounded-[8px] gap-1 pl-[20px] cursor-pointer text-white text-sm hover:bg-[#70707070]`}
                onClick={() => setIsShowCreateColumn(true)}
            >
                <AiOutlinePlus />
                <p>Add a list</p>
            </div>
            <div
                className={`w-[272px] ${
                    isShowCreateColumn
                        ? "h-[88px] p-[10px] opacity-100"
                        : "h-0 opacity-0"
                } absolute top-0 left-0 transition-all bg-bgColor rounded-[10px]`}
            >
                {/*show form create column */}
                {isShowCreateColumn && (
                    <div ref={createColumn}>
                        <input
                            type="text"
                            className="outline-none border-[2px] border-[#0189f8] rounded-[3px] bg-background-box px-[6px] py-[4px] text-sm w-full"
                            autoFocus
                            value={titleBoard}
                            onChange={(e) =>
                                setTitlesBoard(e.target.value.trimStart())
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddColumn()
                                }
                            }}
                        />
                        <div className="flex items-center gap-2 mt-[8px]">
                            <button
                                className="w-[73px] h-[32px] bg-create-button-background hover:bg-create-button-background-hovered text-black text-sm rounded-[4px]"
                                onClick={handleAddColumn}
                            >
                                Add list
                            </button>
                            <div
                                className="text-[20px] cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsShowCreateColumn(false);
                                    setTitlesBoard("");
                                }}
                            >
                                <AiOutlineClose />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateColumn;
