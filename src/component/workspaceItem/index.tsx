import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { Workspace } from "../../type";
import { useDispatch } from "react-redux";
import { updateIsStar } from "../../store/reducer";
interface Prop {
    workspace: Workspace;
}
const WorkspaceItem = (prop: Prop) => {
    const { workspace } = prop;
    const dispatch = useDispatch();
    const [isStar, setIsStar] = useState<boolean>(workspace.isStar);

    const handleStarWorkspace = () => {
        setIsStar(!isStar);
        dispatch(updateIsStar({ id: workspace.id, isStar: !isStar }));
    };

    return (
        <a
            href="#"
            className={`${workspace.backgroundColor} group/item h-[127px] w-full relative transition-all overflow-hidden rounded-md hover:brightness-[0.9]`}
        >
            {workspace.backgroundImg && (
                <img src={workspace.backgroundImg} alt="imageWorkspace" />
            )}
            <p className="absolute top-[10px] left-[10px] text-[18px] font-medium text-white">
                {workspace.title}
            </p>
            <div
                className=" absolute bottom-[10px] right-[10px] hover:scale-[1.2]"
                onClick={handleStarWorkspace}
            >
                {!isStar ? (
                    <div className="group/edit invisible text-white text-base hover:text-star-color font-bold group-hover/item:visible group-hover/item:animate-starWorkspace">
                        <AiOutlineStar />
                    </div>
                ) : (
                    <div className="text-star-color">
                        <AiFillStar />
                    </div>
                )}
            </div>
        </a>
    );
};

export default WorkspaceItem;
