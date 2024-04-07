import { Center, Icon, Image, ImageProps } from "@chakra-ui/react";
import { useState } from "react";
import {Image as FeatherImage} from 'react-feather';

interface IZoomImageCard extends ImageProps{
}

export function ZoomImageCard({...rest}: IZoomImageCard) {
    const [zooming, setZooming] = useState(1)
    
    return (
        <Image {...rest} 
            objectFit="contain"
            cursor="zoom-in"
            transition="transform .3s"
            onClick={(e) => {
                if (zooming >= 3) {
                    setZooming(1);
                    e.currentTarget.style.transform = `scale(calc(2.5))`;
                    return;
                };
                const newZoom = zooming + 1;
                setZooming(newZoom);
                e.currentTarget.style.transform = `scale(calc(2.5*${newZoom}))`;
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(calc(2.5*${zooming}))`
            }}
            onMouseMoveCapture={(e) => {
                const x = e.clientX - e.currentTarget.offsetLeft;
                const y = e.clientY - e.currentTarget.offsetTop;
                e.currentTarget.style.transformOrigin = `${x}px ${y}px`
            }}
            onMouseLeave={(e) => {
                setZooming(1);
                e.currentTarget.style.transform = "scale(1)"
            }}
            fallback={
                <Center w="100%" h="100%">
                    <Icon as={FeatherImage} color="gray.400" fontSize="48px"/>
                </Center>
            }
        />
    )
}