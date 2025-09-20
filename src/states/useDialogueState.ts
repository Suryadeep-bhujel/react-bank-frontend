import { use, useEffect, useState } from "react"

export const useDialogueState = () => {
    const [isDialogOpen, setIsOpened] = useState<boolean>(false)
    const setIsDialogOpen = (isOpened: boolean) => {
        console.log("setting value in state", isOpened);
        setIsOpened(isOpened)
    }
    return {
        setIsOpened,
        isDialogOpen,
        setIsDialogOpen
    }
}