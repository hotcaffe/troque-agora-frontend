import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                background: "gray.100"
            },
            "&::-webkit-scrollbar": {
                width: "4px",
                height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#CAC3C3",
                borderRadius: "4px",
            },
            "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "blackAlpha.600",
            },
        }
    },
    components: {
        Input: {
            defaultProps: {
                focusBorderColor: 'teal.300',
            },
            baseStyle: {
                field: {
                    _placeholder: {color: "gray.400"}
                }
            }
        },
        Link: {
            baseStyle: {
                textDecoration: "underline",
                color: "teal.500",
                _hover: {
                    color: "teal.800"
                }
            }
        },
        FormLabel: {
            baseStyle: {
                color: "teal.800"
            }
        },
        Checkbox: {
            baseStyle: {
                icon: {
                    bg: 'teal.300',
                    border: 'none',
                },
                control: {
                    _checked: {
                        bg: 'teal.300',
                        borderColor: 'teal.300',
                        outlineColor: 'teal.300',
                        _hover: {
                            bg: 'teal.300'
                        }
                    }
                },
                label: {
                    color: "teal.800"
                }
            }
        },
        Button: {
            variants: {
                base: {
                    h: "40px", 
                    bg: "teal.300",
                    color: "white", 
                    _hover: {
                        bg: "teal.500"
                    }
                },
                secondary: {
                    bg: 'white',
                    color: 'teal.300',
                    outline: '2px solid',
                    outlineOffset: '-2px',
                    outlineColor: 'teal.300',
                    _hover: {
                        color: "teal.500",
                        outlineColor: 'teal.500',
                    }
                }
            },
            defaultProps: {
                variant: 'base'
            }
        }
    }
})