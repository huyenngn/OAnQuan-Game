import { defineStore } from "pinia";
import { ref } from "vue";

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8080";
let GLOBAL_SERVERS = [
    {
        long: -120,
        url: import.meta.env.VITE_BACKEND_NA,
    },
    {
        long: 5,
        url: import.meta.env.VITE_BACKEND_EU,
    },
    {
        long: 120,
        url: import.meta.env.VITE_BACKEND_AS,
    },
].filter((server) => server.url);

const LANGUAGES = ["en", "de", "vn"];

export const useLanguage = defineStore("language", () => {
    const language = ref("en");
    const BACKEND_URL = ref("");
    const country = ref("xx");
    const isBackendReady = ref(false);

    async function warmUpBackend(long) {
        while (true) {
            if (GLOBAL_SERVERS.length === 0) {
                BACKEND_URL.value = DEFAULT_BACKEND_URL;
                break;
            }
            GLOBAL_SERVERS = GLOBAL_SERVERS.sort(
                (a, b) => Math.abs(a.long - long) - Math.abs(b.long - long)
            );
            BACKEND_URL.value = GLOBAL_SERVERS.shift().url;
            try {
                await fetch(BACKEND_URL.value, { method: "GET" });
                break;
            } catch (error) {}
        }
        console.log("Warmed up backend:", BACKEND_URL.value);
        isBackendReady.value = true;
    }

    async function fetchIpData() {
        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            warmUpBackend(data.longitude);
            country.value = data.country_code.toLowerCase();
            if (LANGUAGES.includes(country.value)) {
                language.value = country.value;
            }
            try {
                language.value =
                    localStorage.getItem("language") || language.value;
            } catch (error) {}
        } catch (error) {
            console.error("Error fetching country code:", error);
        }
    }

    function getText(key) {
        try {
            return text[language.value][key];
        } catch (error) {
            return text["en"][key];
        }
    }

    const text = {
        en: {
            credit: "Created by",
            privacy: "Privacy Policy",
            classic: "Classic",
            easy: "Easy",
            normal: "Normal",
            hard: "Hard",
            leaderboard: "Leaderboard",
            tutorial: "Tutorial",
            challenges: "Challenges",
            back: "Back",
            draw: "It's a draw! 🤝",
            win: "You win! 🎉",
            lose: "You lose! 😢",
            turn: "Your turn!",
            waiting: "Opponent is playing...",
            loading: "Loading...",
            week: "Week",
            month: "Month",
            ytd: "Year to Date",
            all: "All",
            allTime: "All Time",
            congrats: "Congratulations!",
            rankPre: "You are ranked",
            rankMain: "for",
            rankPost: "mode!",
            noRank: "You are the winner!",
            unknown: "Unknown",
            save: "Save",
            challengePre: "Win in",
            challengePost: "moves or less.",
            success: "Challenge completed!",
            fail: "Try again!",
            next: "Next",
            privacyLink:
                "https://www.freeprivacypolicy.com/live/aede0996-f435-4b28-a7fa-8eed29173886",
        },
        vn: {
            credit: "Tạo bởi",
            privacy: "Chính sách Bảo mật",
            classic: "Cổ điển",
            easy: "Dễ",
            normal: "Trung bình",
            hard: "Khó",
            leaderboard: "Bảng xếp hạng",
            tutorial: "Hướng dẫn",
            challenges: "Thách thức",
            back: "Quay lại",
            draw: "Hòa! 🤝",
            win: "Thắng! 🎉",
            lose: "Thua! 😢",
            turn: "Lượt của bạn!",
            waiting: "Đối thủ đang chơi...",
            loading: "Đang tải...",
            week: "Tuần",
            month: "Tháng",
            ytd: "Năm nay",
            all: "Tất cả",
            allTime: "Tất cả thời gian",
            congrats: "Chúc mừng!",
            rankPre: "Bạn đứng thứ",
            rankMain: "cho chế độ",
            rankPost: "!",
            noRank: "Bạn là người chiến thắng!",
            unknown: "Không rõ",
            save: "Lưu",
            challengePre: "Thắng trong",
            challengePost: "lượt hoặc ít hơn.",
            success: "Thách thức hoàn thành!",
            fail: "Thử lại!",
            next: "Tiếp",
            privacyLink:
                "https://www-freeprivacypolicy-com.translate.goog/live/aede0996-f435-4b28-a7fa-8eed29173886?_x_tr_sl=en&_x_tr_tl=vi&_x_tr_hl=de&_x_tr_pto=wapp",
        },
        de: {
            credit: "Erstellt von",
            privacy: "Datenschutzerklärung",
            classic: "Klassisch",
            easy: "Leicht",
            normal: "Normal",
            hard: "Schwer",
            leaderboard: "Rangliste",
            tutorial: "Anleitung",
            challenges: "Challenges",
            back: "Zurück",
            draw: "Unentschieden! 🤝",
            win: "Du hast gewonnen! 🎉",
            lose: "Leider verloren! 😢",
            turn: "Du bist dran!",
            waiting: "Gegner ist am Zug...",
            loading: "Laden...",
            week: "Woche",
            month: "Monat",
            ytd: "Dieses Jahr",
            all: "Alle",
            allTime: "Gesamt",
            congrats: "Herzlichen Glückwunsch!",
            rankPre: "Du bist auf Platz",
            rankMain: "im",
            rankPost: "Modus!",
            noRank: "Du bist der Gewinner!",
            unknown: "Unbekannt",
            save: "Speichern",
            challengePre: "Gewinne in",
            challengePost: "Zügen oder weniger.",
            success: "Herausforderung abgeschlossen!",
            fail: "Versuche es erneut!",
            next: "Nächste",
            privacyLink:
                "https://www-freeprivacypolicy-com.translate.goog/live/aede0996-f435-4b28-a7fa-8eed29173886?_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=de&_x_tr_pto=wapp",
        },
    };

    return {
        language,
        BACKEND_URL,
        country,
        getText,
        fetchIpData,
        isBackendReady,
    };
});
