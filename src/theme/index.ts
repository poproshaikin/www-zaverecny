import {
    createSystem,
    defineConfig,
    defineTextStyles,
    defineTokens,
    defaultConfig,
    ChakraProvider,
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
        value: 'linear-gradient(to right, {colors.red.50}, {colors.blue.50})',
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

export const customTheme = createSystem(defaultConfig, themeConfig);
