import React, { useEffect, useState } from "react"
import { isExpandandleFileType, loadGoogleDriveFiles } from "../../utils/utils"
import { FileItem } from "../../constants";

const Item = (props) => {
    const [children, setChildren] = useState<FileItem[]>([]);
    const [isExpanded, setisExpanded] = useState<boolean>(false);

    useEffect(() => {
        setChildren(props.file.children ?? [])
    }, [props.file])

    const listItemClick = () => {
        setisExpanded(!isExpanded);
    };

    return (
        <div key={props.file.id} className="mb-1">
            <div className="hover:bg-gray-200 p-2 rounded flex justify-between items-center">
                <span>
                    {props.file.name}{" "}
                    {props.file.mimeType === "application/vnd.google-apps.folder" ? "(Folder)" : ""}
                </span>

                {isExpandandleFileType(props.file) && (
                    <button
                        className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 cursor-pointer"
                        onClick={() => listItemClick()}
                    >
                        {isExpanded ? '-' : '+'}
                    </button>
                )}
            </div>

            {children && isExpanded && children.map((child) => (
                <div key={child.id} className="pl-6">
                    <Item file={child} tokinResponse={props.tokinResponse} />
                </div>
            ))}
        </div>
    )
}

export default Item