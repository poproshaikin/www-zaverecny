import {createSystem, defaultBaseConfig, defineConfig, defineTextStyles, defineTokens} from "@chakra-ui/react";
import { Raleway } from "next/font/google";

const raleway = Raleway({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
})

const breakpoints = {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

const fonts = defineTokens.fonts({
    heading: {
        value: raleway.style.fontFamily
    },
    body: {
        value: raleway.style.fontFamily,
    },
    mono: {
        value: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
});

const fontWeights = defineTokens.fontWeights({
    thin: {
        value: '100',
    },
    extralight: {
        value: '200',
    },
    light: {
        value: '300',
    },
    normal: {
        value: '400',
    },
    medium: {
        value: '500',
    },
    semibold: {
        value: '600',
    },
    bold: {
        value: '700',
    },
    extrabold: {
        value: '800',
    },
    black: {
        value: '900',
    },
});

const cursor = defineTokens.cursor({
    button: {
        value: 'pointer',
    },
    checkbox: {
        value: 'default',
    },
    disabled: {
        value: 'not-allowed',
    },
    menuitem: {
        value: 'default',
    },
    option: {
        value: 'default',
    },
    radio: {
        value: 'default',
    },
    slider: {
        value: 'default',
    },
    switch: {
        value: 'pointer',
    },
});

const colors = defineTokens.colors({
    transparent: {
        value: 'transparent',
    },
    current: {
        value: 'currentColor',
    },
    black: {
        value: '#000000',
    },
    white: {
        value: '#FFFFFF',
    },
    whiteAlpha: {
        '50': { value: 'rgba(255, 255, 255, 0.04)' },
        '100': { value: 'rgba(255, 255, 255, 0.06)' },
        '200': { value: 'rgba(255, 255, 255, 0.08)' },
        '300': { value: 'rgba(255, 255, 255, 0.16)' },
        '400': { value: 'rgba(255, 255, 255, 0.24)' },
        '500': { value: 'rgba(255, 255, 255, 0.36)' },
        '600': { value: 'rgba(255, 255, 255, 0.48)' },
        '700': { value: 'rgba(255, 255, 255, 0.64)' },
        '800': { value: 'rgba(255, 255, 255, 0.80)' },
        '900': { value: 'rgba(255, 255, 255, 0.92)' },
    },
    blackAlpha: {
        '50': { value: 'rgba(0, 0, 0, 0.04)' },
        '100': { value: 'rgba(0, 0, 0, 0.06)' },
        '200': { value: 'rgba(0, 0, 0, 0.08)' },
        '300': { value: 'rgba(0, 0, 0, 0.16)' },
        '400': { value: 'rgba(0, 0, 0, 0.24)' },
        '500': { value: 'rgba(0, 0, 0, 0.36)' },
        '600': { value: 'rgba(0, 0, 0, 0.48)' },
        '700': { value: 'rgba(0, 0, 0, 0.64)' },
        '800': { value: 'rgba(0, 0, 0, 0.80)' },
        '900': { value: 'rgba(0, 0, 0, 0.92)' },
    },
    gray: {
        '50': { value: '#F2F7FA' },
        '100': { value: '#EDF2F7' },
        '200': { value: '#E2E8F0' },
        '300': { value: '#CBD5E0' },
        '400': { value: '#A0AEC0' },
        '500': { value: '#718096' },
        '600': { value: '#4A5568' },
        '700': { value: '#2D3748' },
        '800': { value: '#1A202C' },
        '900': { value: '#171923' },
    },
    red: {
        '50': { value: '#FFF5F5' },
        '100': { value: '#FED7D7' },
        '200': { value: '#FEB2B2' },
        '300': { value: '#FC8181' },
        '400': { value: '#F56565' },
        '500': { value: '#E53E3E' },
        '600': { value: '#C53030' },
        '700': { value: '#9B2C2C' },
        '800': { value: '#822727' },
        '900': { value: '#63171B' },
    },
    orange: {
        '50': { value: '#FFFAF0' },
        '100': { value: '#FEEBC8' },
        '200': { value: '#FBD38D' },
        '300': { value: '#F6AD55' },
        '400': { value: '#ED8936' },
        '500': { value: '#DD6B20' },
        '600': { value: '#C05621' },
        '700': { value: '#9C4221' },
        '800': { value: '#7B341E' },
        '900': { value: '#652B19' },
    },
    yellow: {
        '50': { value: '#FFFFF0' },
        '100': { value: '#FEFCBF' },
        '200': { value: '#FAF089' },
        '300': { value: '#F6E05E' },
        '400': { value: '#ECC94B' },
        '500': { value: '#D69E2E' },
        '600': { value: '#B7791F' },
        '700': { value: '#975A16' },
        '800': { value: '#744210' },
        '900': { value: '#5F370E' },
    },
    green: {
        '50': { value: 'hsl(157, 37%, 93%)' }, // primaryDark.10
        '100': { value: 'hsl(158, 36%, 85%)' }, // primaryDark.20
        '200': { value: 'hsl(158, 36%, 65%)' }, // primaryDark.50
        '300': { value: 'hsl(158, 56%, 45%)' }, // custom color
        '400': { value: 'hsl(158, 60%, 38%)' }, // primaryDark.90
        '500': { value: 'hsl(158, 81%, 31%)' }, // primaryDark.100 - main color
        '600': { value: 'hsl(158, 80%, 28%)' }, // primaryDark.110
        '700': { value: 'hsl(158, 80%, 22%)' }, // primaryDark.130
        '800': { value: 'hsl(158, 81%, 19%)' }, // primaryDark.140
        '900': { value: 'hsl(158, 80%, 16%)' }, // primaryDark.150
    },

    blue: {
        '50': { value: '#ebf8ff' },
        '100': { value: '#bee3f8' },
        '200': { value: '#90cdf4' },
        '300': { value: '#63b3ed' },
        '400': { value: '#4299e1' },
        '500': { value: '#3182ce' },
        '600': { value: '#2b6cb0' },
        '700': { value: '#2c5282' },
        '800': { value: '#2a4365' },
        '900': { value: '#1A365D' },
    },
    purple: {
        '50': { value: '#FAF5FF' },
        '100': { value: '#E9D8FD' },
        '200': { value: '#D6BCFA' },
        '300': { value: '#B794F4' },
        '400': { value: '#9F7AEA' },
        '500': { value: '#805AD5' },
        '600': { value: '#6B46C1' },
        '700': { value: '#553C9A' },
        '800': { value: '#44337A' },
        '900': { value: '#322659' },
    },
    pink: {
        '50': { value: '#FFF5F7' },
        '100': { value: '#FED7E2' },
        '200': { value: '#FBB6CE' },
        '300': { value: '#F687B3' },
        '400': { value: '#ED64A6' },
        '500': { value: '#D53F8C' },
        '600': { value: '#B83280' },
        '700': { value: '#97266D' },
        '800': { value: '#702459' },
        '900': { value: '#521B41' },
    },

    cyan: {
        '50': { value: '#EDFDFD' },
        '100': { value: '#C4F1F9' },
        '200': { value: '#9DECF9' },
        '300': { value: '#76E4F7' },
        '400': { value: '#0BC5EA' },
        '500': { value: '#00B5D8' },
        '600': { value: '#00A3C4' },
        '700': { value: '#0987A0' },
        '800': { value: '#086F83' },
        '900': { value: '#065666' },
    },

    teal: {
        '50': { value: '#E6FFFA' },
        '100': { value: '#B2F5EA' },
        '200': { value: '#81E6D9' },
        '300': { value: '#4FD1C5' },
        '400': { value: '#38B2AC' },
        '500': { value: '#319795' },
        '600': { value: '#2C7A7B' },
        '700': { value: '#285E61' },
        '800': { value: '#234E52' },
        '900': { value: '#1D4044' },
    },
});

const sizes = defineTokens.sizes({
    '1': {
        value: '0.25rem',
    },
    '2': {
        value: '0.5rem',
    },
    '3': {
        value: '0.75rem',
    },
    '4': {
        value: '1rem',
    },
    '5': {
        value: '1.25rem',
    },
    '6': {
        value: '1.5rem',
    },
    '7': {
        value: '1.75rem',
    },
    '8': {
        value: '2rem',
    },
    '9': {
        value: '2.25rem',
    },
    '10': {
        value: '2.5rem',
    },
    '11': {
        value: '2.75rem',
    },
    '12': {
        value: '3rem',
    },
    '14': {
        value: '3.5rem',
    },
    '16': {
        value: '4rem',
    },
    '20': {
        value: '5rem',
    },
    '24': {
        value: '6rem',
    },
    '28': {
        value: '7rem',
    },
    '32': {
        value: '8rem',
    },
    '36': {
        value: '9rem',
    },
    '40': {
        value: '10rem',
    },
    '44': {
        value: '11rem',
    },
    '48': {
        value: '12rem',
    },
    '52': {
        value: '13rem',
    },
    '56': {
        value: '14rem',
    },
    '60': {
        value: '15rem',
    },
    '64': {
        value: '16rem',
    },
    '72': {
        value: '18rem',
    },
    '80': {
        value: '20rem',
    },
    '96': {
        value: '24rem',
    },
    '3xs': {
        value: '14rem',
    },
    '2xs': {
        value: '16rem',
    },
    xs: {
        value: '18rem',
    },
    sm: {
        value: '24rem',
    },
    md: {
        value: '28rem',
    },
    lg: {
        value: '32rem',
    },
    xl: {
        value: '36rem',
    },
    '2xl': {
        value: '42rem',
    },
    '3xl': {
        value: '48rem',
    },
    '4xl': {
        value: '56rem',
    },
    '5xl': {
        value: '64rem',
    },
    '6xl': {
        value: '72rem',
    },
    '7xl': {
        value: '80rem',
    },
    '8xl': {
        value: '90rem',
    },
    '0.5': {
        value: '0.125rem',
    },
    '1.5': {
        value: '0.375rem',
    },
    '2.5': {
        value: '0.625rem',
    },
    '3.5': {
        value: '0.875rem',
    },
    '4.5': {
        value: '1.125rem',
    },
    '1/2': {
        value: '50%',
    },
    '1/3': {
        value: '33.333333%',
    },
    '2/3': {
        value: '66.666667%',
    },
    '1/4': {
        value: '25%',
    },
    '3/4': {
        value: '75%',
    },
    '1/5': {
        value: '20%',
    },
    '2/5': {
        value: '40%',
    },
    '3/5': {
        value: '60%',
    },
    '4/5': {
        value: '80%',
    },
    '1/6': {
        value: '16.666667%',
    },
    '2/6': {
        value: '33.333333%',
    },
    '3/6': {
        value: '50%',
    },
    '4/6': {
        value: '66.666667%',
    },
    '5/6': {
        value: '83.333333%',
    },
    '1/12': {
        value: '8.333333%',
    },
    '2/12': {
        value: '16.666667%',
    },
    '3/12': {
        value: '25%',
    },
    '4/12': {
        value: '33.333333%',
    },
    '5/12': {
        value: '41.666667%',
    },
    '6/12': {
        value: '50%',
    },
    '7/12': {
        value: '58.333333%',
    },
    '8/12': {
        value: '66.666667%',
    },
    '9/12': {
        value: '75%',
    },
    '10/12': {
        value: '83.333333%',
    },
    '11/12': {
        value: '91.666667%',
    },
    max: {
        value: 'max-content',
    },
    min: {
        value: 'min-content',
    },
    fit: {
        value: 'fit-content',
    },
    prose: {
        value: '60ch',
    },
    full: {
        value: '100%',
    },
    dvh: {
        value: '100dvh',
    },
    svh: {
        value: '100svh',
    },
    lvh: {
        value: '100lvh',
    },
    dvw: {
        value: '100dvw',
    },
    svw: {
        value: '100svw',
    },
    lvw: {
        value: '100lvw',
    },
    vw: {
        value: '100vw',
    },
    vh: {
        value: '100vh',
    },
});

const textStyles = defineTextStyles({
    '2xs': {
        value: {
            fontSize: '2xs',
        },
    },
    xs: {
        value: {
            fontSize: 'xs',
        },
    },
    sm: {
        value: {
            fontSize: 'sm',
        },
    },
    md: {
        value: {
            fontSize: 'md',
        },
    },
    lg: {
        value: {
            fontSize: 'lg',
            lineHeight: '1.2',
        },
    },
    xl: {
        value: {
            fontSize: 'xl',
            lineHeight: '1.2',
            fontFamily: raleway.style.fontFamily,
            fontWeight: 'semibold',
        },
    },
    '2xl': {
        value: {
            fontSize: '2xl',
            lineHeight: '1.2',
            fontFamily: raleway.style.fontFamily,
            fontWeight: 'semibold',
        },
    },
    '3xl': {
        value: {
            fontSize: '3xl',
            lineHeight: '1.2',
            fontFamily: raleway.style.fontFamily,
            fontWeight: 'semibold',
        },
    },
    '4xl': {
        value: {
            fontSize: '4xl',
            lineHeight: '1.2',
            fontFamily: raleway.style.fontFamily,
            fontWeight: 'semibold',
            letterSpacing: '-0.025em',
        },
    },
    '5xl': {
        value: {
            fontSize: '5xl',
            lineHeight: '1.2',
            fontFamily: raleway.style.fontFamily,
            fontWeight: 'semibold',
            letterSpacing: '-0.025em',
        },
    },
    '6xl': {
        value: {
            fontSize: '6xl',
            lineHeight: '1.2',
            fontFamily: raleway.style.fontFamily,
            fontWeight: 'semibold',
            letterSpacing: '-0.025em',
        },
    },
    none: {
        value: {},
    },
});

const tokens = {
    fontWeights,
    fonts
}

const semanticTokens = {
    colors,
    sizes,
    cursor,
}

const themeConfig = defineConfig({
    preflight: true,
    theme: {
        breakpoints,
        semanticTokens,
        tokens,
        textStyles,
    }
})

export const customTheme = createSystem(defaultBaseConfig, themeConfig);
