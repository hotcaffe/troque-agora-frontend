import { createIcon } from "@chakra-ui/react"
import Logo from '../../public/ta-ico.svg'

const TAPin = createIcon({
    displayName: "TAIcon",
    viewBox: '0 0 800 800',
    path: Logo()
})

export {TAPin}