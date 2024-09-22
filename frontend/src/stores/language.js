import { defineStore } from "pinia";
import { ref } from "vue";

export const useLanguage = defineStore("language", () => {
    const language = ref("en");
    let servers = [
        {
            long: -120,
            url: import.meta.env.VITE_BACKEND_US,
        },
        {
            long: 5,
            url: import.meta.env.VITE_BACKEND_EU,
        },
        {
            long: 120,
            url: import.meta.env.VITE_BACKEND_ASIA,
        },
    ].filter((server) => server.url);
    let BACKEND_URL = ref("http://127.0.0.1:8080");
    let country = "";

    const text = {
        en: {
            credit: "Created by",
            privacy: "Privacy Policy",
            easy: "Easy",
            normal: "Normal",
            hard: "Hard",
            leaderboard: "Leaderboard",
            back: "Back",
            draw: "It's a draw! 🤝",
            win: "You win! 🎉",
            lose: "You lose! 😢",
            turn: "Your turn!",
            waiting: "Opponent is playing...",
            week: "Week",
            month: "Month",
            ytd: "Year to Date",
            all: "All",
            allTime: "All Time",
            congrats: "Congratulations!",
            rankPre: "You are ranked",
            rankMain: "in the world for",
            rankPost: "mode!",
            noRank: "You are the winner!",
            save: "Save",
            privacyLink:
                "https://www.freeprivacypolicy.com/live/aede0996-f435-4b28-a7fa-8eed29173886",
        },
        vn: {
            credit: "Tạo bởi",
            privacy: "Chính sách Bảo mật",
            easy: "Dễ",
            normal: "Trung bình",
            hard: "Khó",
            leaderboard: "Bảng xếp hạng",
            back: "Quay lại",
            draw: "Hòa! 🤝",
            win: "Thắng! 🎉",
            lose: "Thua! 😢",
            turn: "Lượt của bạn!",
            waiting: "Đối thủ đang chơi...",
            week: "Tuần",
            month: "Tháng",
            ytd: "Năm nay",
            all: "Tất cả",
            allTime: "Tất cả thời gian",
            congrats: "Chúc mừng!",
            rankPre: "Bạn đứng thứ",
            rankMain: "trên thế giới cho chế độ",
            rankPost: "!",
            noRank: "Bạn là người chiến thắng!",
            save: "Lưu",
            privacyLink:
                "https://www-freeprivacypolicy-com.translate.goog/live/aede0996-f435-4b28-a7fa-8eed29173886?_x_tr_sl=en&_x_tr_tl=vi&_x_tr_hl=de&_x_tr_pto=wapp",
        },
        de: {
            credit: "Erstellt von",
            privacy: "Datenschutzerklärung",
            easy: "Leicht",
            normal: "Normal",
            hard: "Schwer",
            leaderboard: "Rangliste",
            back: "Zurück",
            draw: "Unentschieden! 🤝",
            win: "Du hast gewonnen! 🎉",
            lose: "Leider verloren! 😢",
            turn: "Du bist dran!",
            waiting: "Gegner ist am Zug...",
            week: "Woche",
            month: "Monat",
            ytd: "Dieses Jahr",
            all: "Alle",
            allTime: "Gesamt",
            congrats: "Herzlichen Glückwunsch!",
            rankPre: "Du bist auf Platz",
            rankMain: "der Welt für den",
            rankPost: "Modus!",
            noRank: "Du bist der Gewinner!",
            save: "Speichern",
            privacyLink:
                "https://www-freeprivacypolicy-com.translate.goog/live/aede0996-f435-4b28-a7fa-8eed29173886?_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=de&_x_tr_pto=wapp",
        },
    };

    async function fetchIpData() {
        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            const long = data.longitude;
            if (servers.length != 0) {
                BACKEND_URL.value = servers.reduce((a, b) =>
                    Math.abs(a.long - long) < Math.abs(b.long - long) ? a : b
                ).url;
                console.log("Backend URL:", BACKEND_URL.value);
            }
            country = data.country_code.toLowerCase();
            if (["en", "de", "vn"].includes(country)) {
                language.value = country;
            }
        } catch (error) {
            console.error("Error fetching country code:", error);
            country = "xx";
        }
    }

    function getCountry() {
        return country;
    }

    function getText(key) {
        try {
            return text[language.value][key];
        } catch (error) {
            return text["en"][key];
        }
    }

    return {
        language,
        getCountry,
        BACKEND_URL,
        getText,
        fetchIpData,
    };
});