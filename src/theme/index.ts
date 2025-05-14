import {
    createSystem,
    defineConfig,
    defineTextStyles,
    defineTokens,
    defaultConfig,
    ChakraProvider, mergeConfigs,
} from "@chakra-ui/react";
import { Raleway } from "next/font/google";

const raleway = Raleway({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
})

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

const colors = defineTokens.colors({
    primary: {
        value: 'linear-gradient(to right, {colors.red.200}, {colors.blue.200})',
    },
    primaryButton: {
        value: 'rgba(255,255,255,0.05)',
    },
    secondary: {
        value: 'linear-gradient(to right bottom, {colors.white}, {colors.orange.100})'
    },
    transparent: {
        '1': { value: 'rgba(255, 255, 255, 0.1)' }
    }
})

const themeConfig = defineConfig({
    preflight: true,
    theme: {
        semanticTokens: {
            colors
        },
        tokens: {
            fonts
        }
    },
});

export const customTheme = createSystem(mergeConfigs(defaultConfig, themeConfig));
