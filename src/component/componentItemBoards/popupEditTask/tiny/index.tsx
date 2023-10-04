import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/skins/ui/oxide/skin.min.css";
import { useDispatch } from "react-redux";
import { editContentTask } from "../../../../store/reducer";
import { Task } from "../../../../type";
interface Prop {
    taskCurrent: Task ;
    isShowContent: () => void
}
const Tiny = (prop: Prop) => {
    const {taskCurrent, isShowContent} = prop;
    const [value, setValue] = useState<string | undefined>(taskCurrent.content);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [text, setText] = useState<string>("");
    const dispatch = useDispatch()

    const addContentTask = () => {
        isShowContent()
        dispatch(editContentTask({id:taskCurrent.id as string, content:value}))
    };
    const cancel = () => {
        isShowContent()
    }
    return (
        <>
            <Editor
                apiKey="h835x1gqn9kjot71x3lhsm00wri05t63w7owbcfy88bw0f56"
                onEditorChange={(value, editor) => {
                    setValue(value);
                    setText(editor.getContent({ format: "text" }));
                }}
                onInit={(evt, editor) =>
                    setText(editor.getContent({ format: "text" }))
                }
                value={value}
                init={{
                    
                    menubar: false,
                    plugins:
                    "preview powerpaste casechange searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample advtable table charmap pagebreak nonbreaking anchor advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter permanentpen pageembed linkchecker emoticons export",
          
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:20px; margin:0 6px  ; background-color: #57565650 ; height:100%}",
                }}
            />
            <div className="mt-[15px] text-[14px]">
                <button
                    onClick={addContentTask}
                    className="bg-create-button-background hover:bg-create-button-background-hovered mr-[12px] rounded-[4px] text-black text-[14px] py-[4px] px-[12px] "
                >
                    Save
                </button>
                <button className=" hover:bg-background-box-hover rounded-[4px] px-[12px] py-[4px]"
                onClick={cancel}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};
export default Tiny;
