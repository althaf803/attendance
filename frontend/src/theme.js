import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // A professional blue
        },
        secondary: {
            main: '#dc004e', // A contrasting pink/red
        },
        background: {
            default: '#f4f7f9', // A light grey background
        },
    },
    typography: {
        fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
            },
        },
    },
});

export default theme;