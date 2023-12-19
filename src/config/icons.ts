import { createIcon } from "@chakra-ui/react"
import TAPinSVG from '../../public/ta-icons/ta-pin.svg'
import TAIconNoBGSVG from '../../public/ta-icons/ta-icon-nobg.svg'

const TAPin = createIcon({
    displayName: "TAIcon",
    viewBox: '0 0 800 800',
    path: TAPinSVG()
})

const TAIconNoBG = createIcon({
    displayName: "TAIconNoBG",
    viewBox: '0 0 800 400',
    path: TAIconNoBGSVG()
})

export {TAPin, TAIconNoBG}