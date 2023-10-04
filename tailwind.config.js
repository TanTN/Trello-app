/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        fontFamily: {
            Mooli: ["Mooli", "sans-serif"],
            Rubik: ["Rubik", "sans-serif"],
        },
        extend: {
            colors: {
                "textColor": "#b6c2cf",
                "bgColor": "#1d2125",
                "textColorHeader": "#9FADCB",
                "create-button-background": "#579dff",
                "create-button-background-hovered": "#85b8ff",
                "background-box": "#a1bdd914",
                "background-box-hover": "#a6c5e229",
                "star-color": "#FAE041",
                "border-input-color": "#0189f8",
                "color-date-completed": "#4bce97",
                "color-date-overdue": "#f87462",
                "color-date-dueSoon": "#E2B203",
            },
            animation: {
                logo: "logo .8s ease infinite  ",
                logo1: "logo1 .8s ease infinite  ",
                starWorkspace: "starWorkspace 0.4s ease",
            },
            keyframes: {
                logo: {
                    "0%": {
                        height: "10px",
                    },
                    "50%": {
                        height: "5px",
                    },
                    "100%": {
                        height: "10px",
                    },
                },
                logo1: {
                    "0%": {
                        height: "5px",
                    },
                    "50%": {
                        height: "10px",
                    },
                    "100%": {
                        height: "5px",
                    },
                },
                starWorkspace: {
                    "0%": {
                        transform: "translateX(200%)",
                    },
                    "100%": {
                        transform: "translateX(0%)",
                    },
                },
            },
        },
    },
    plugins: [],
};
