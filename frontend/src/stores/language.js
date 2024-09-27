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

    function getTutorial() {
        try {
            return tutorial[language.value];
        } catch (error) {
            return tutorial["en"];
        }
    }

    const text = {
        en: {
            credit: "Created by",
            privacy: "Privacy Policy",
            newGame: "New Game",
            easy: "Easy",
            normal: "Normal",
            hard: "Hard",
            leaderboard: "Leaderboard",
            tutorial: "Tutorial",
            campaign: "Campaign",
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
            privacyLink:
                "https://www.freeprivacypolicy.com/live/aede0996-f435-4b28-a7fa-8eed29173886",
        },
        vn: {
            credit: "Tạo bởi",
            privacy: "Chính sách Bảo mật",
            newGame: "Trò chơi mới",
            easy: "Dễ",
            normal: "Trung bình",
            hard: "Khó",
            leaderboard: "Bảng xếp hạng",
            tutorial: "Hướng dẫn",
            campaign: "Chiến dịch",
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
            privacyLink:
                "https://www-freeprivacypolicy-com.translate.goog/live/aede0996-f435-4b28-a7fa-8eed29173886?_x_tr_sl=en&_x_tr_tl=vi&_x_tr_hl=de&_x_tr_pto=wapp",
        },
        de: {
            credit: "Erstellt von",
            privacy: "Datenschutzerklärung",
            newGame: "Neues Spiel",
            easy: "Leicht",
            normal: "Normal",
            hard: "Schwer",
            leaderboard: "Rangliste",
            tutorial: "Anleitung",
            campaign: "Kampagne",
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
            privacyLink:
                "https://www-freeprivacypolicy-com.translate.goog/live/aede0996-f435-4b28-a7fa-8eed29173886?_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=de&_x_tr_pto=wapp",
        },
    };

    const tutorial = {
        en: [
            {
                title: "The Ô Ăn Quan board",
                text: "The Ô Ăn Quan board consists of 10 'dân' fields, 5 on each side, and 2 larger 'quan' fields at both ends. Understanding the layout helps you plan your moves effectively.",
            },
            {
                title: "Move your seeds",
                text: "On your turn, pick up all the seeds from one of your 'dân' fields and distribute them in either direction, one by one. Once you've placed all the seeds, you pick up the seeds from the next field and distribute them in the same way. This continues until you capture or reach a 'quan' field.",
            },
            {
                title: "Capture seeds",
                text: "If the last seed you place lands in front of an empty field, you capture all the seeds in the opposite field. If the opposite field is also empty, you lose your turn. Capturing seeds key to winning.",
            },
            {
                title: "Plan ahead",
                text: "Try to avoid leaving your seeds in a position where your opponent can easily capture them. Instead, aim to capture your opponent's seeds and the 'quan' fields to gain an advantage. The player with the most seeds at the end of the game wins.",
            },
            {
                title: "Stay defensive",
                text: "Avoid leaving a full field directly behind an empty one to prevent your opponent from capturing a lot of seeds in one turn.",
            },
            {
                title: "Win the game",
                text: "The game ends when all the 'quan' fields are empty. Seeds that remain on either side of the board go to the respective player. The player with the most seeds wins the game.",
            },
            {
                title: "Control the Quan",
                text: "Capturing seeds in the 'quan' fields can give you a big advantage. But be careful, if all the quan fields get captured, while you're behind, you lose the game.",
            },
            {
                title: "Chain capture",
                text: "If you capture seeds and the next field is empty, you can continue capturing seeds from the next field. Plan ahead and set up chain captures to gain an advantage.",
            },
        ],
        vn: [
            {
                title: "Bàn cờ Ô Ăn Quan",
                text: "Bàn cờ Ô Ăn Quan bao gồm 10 ô 'dân', 5 ở mỗi bên, và 2 ô 'quan' lớn ở hai đầu. Hiểu vị trí giúp bạn lên kế hoạch di chuyển hiệu quả.",
            },
            {
                title: "Di chuyển hạt",
                text: "Lượt của bạn, hãy nhặt tất cả hạt từ một ô 'dân' của bạn và phân phối chúng theo bất kỳ hướng nào, từng hạt một. Khi bạn đã đặt tất cả hạt, bạn nhặt hạt từ ô tiếp theo và phân phối chúng theo cách tương tự. Quá trình này tiếp tục cho đến khi bạn bắt hoặc đến ô 'quan'.",
            },
            {
                title: "Bắt hạt",
                text: "Nếu hạt cuối cùng bạn đặt rơi trước một ô trống, bạn bắt tất cả hạt trong ô đối diện. Nếu ô đối diện cũng trống, bạn mất lượt. Bắt hạt quan trọng để chiến thắng.",
            },
            {
                title: "Lên kế hoạch",
                text: "Hãy cố gắng tránh để lại hạt của bạn ở vị trí mà đối thủ dễ dàng bắt chúng. Thay vào đó, hãy cố gắng bắt hạt của đối thủ và ô 'quan' để có lợi thế. Người chơi có nhiều hạt nhất ở cuối trò chơi sẽ thắng.",
            },
            {
                title: "Bảo vệ",
                text: "Tránh để lại một ô đầy ngay phía sau một ô trống để ngăn đối thủ của bạn bắt nhiều hạt trong một lượt.",
            },
            {
                title: "Chiến thắng",
                text: "Trò chơi kết thúc khi tất cả các ô 'quan' trống. Hạt còn lại ở mỗi bên của bàn cờ sẽ thuộc về người chơi tương ứng. Người chơi có nhiều hạt nhất sẽ thắng trò chơi.",
            },
            {
                title: "Kiểm soát Quan",
                text: "Bắt hạt trong các ô 'quan' có thể mang lại lợi thế lớn cho bạn. Nhưng hãy cẩn thận, nếu tất cả các ô quan bị bắt, trong khi bạn đang ở phía sau, bạn sẽ thua trò chơi.",
            },
            {
                title: "Bắt chuỗi",
                text: "Nếu bạn bắt hạt và ô tiếp theo trống, bạn có thể tiếp tục bắt hạt từ ô tiếp theo. Lên kế hoạch và thiết lập chuỗi bắt để có lợi thế.",
            },
        ],
        de: [
            {
                title: "Das Ô Ăn Quan-Brett",
                text: "Das Ô Ăn Quan-Brett besteht aus 10 'dân'-Feldern, 5 auf jeder Seite, und 2 größeren 'quan'-Feldern an beiden Enden. Das Verständnis des Layouts hilft dir, deine Züge effektiv zu planen.",
            },
            {
                title: "Verteile deine Steine",
                text: "Nimm alle Steine aus eines deiner 'dân'-Felder und verteile sie in eine Richtung, einen nach dem anderen. Sobald du alle Steine platziert hast, nimmst du die Steine vom nächsten Feld auf und verteilst sie auf die gleiche Weise. Mache so weiter, bis du ein 'quan'-Feld erreichst oder Steine einnehmen kannst.",
            },
            {
                title: "Steine einnehmen",
                text: "Wenn der letzte Stein, den du platzierst, vor einem leeren Feld landet, nimmst du alle Steine im gegenüberliegenden Feld ein. Wenn das gegenüberliegende Feld auch leer ist, ist dein Gegner am Zug.",
            },
            {
                title: "Plane voraus",
                text: "Vermeide, deine Steine in einer Position zu lassen, in der dein Gegner sie leicht einnehmen kann. Versuche stattdessen, die Steine deines Gegners und die 'quan'-Felder einzunehmen. Der Spieler mit den meisten Steinen am Ende des Spiels gewinnt.",
            },
            {
                title: "Spiele defensiv",
                text: "Vermeide es, ein volles Feld direkt hinter einem leeren zu lassen, um zu verhindern, dass dein Gegner viele Steine auf einmal einnimmt.",
            },
            {
                title: "Gewinne das Spiel",
                text: "Das Spiel endet, wenn alle 'quan'-Felder leer sind. Die Steine, die auf beiden Seiten des Bretts verbleiben, gehen an die jeweiligen Spieler. Der Spieler mit den meisten Steinen gewinnt das Spiel.",
            },
            {
                title: "Kontrolliere die Quan",
                text: "Das Einnehmen von Steinen in den 'quan'-Feldern kann dir einen großen Vorteil verschaffen. Aber sei vorsichtig, wenn alle Quan-Felder eingenommen werden, während du zurückliegst, verlierst du das Spiel.",
            },
            {
                title: "Kettenfänge",
                text: "Wenn du Steine einnimmst und das nächste Feld leer ist, kannst du weiter Steine vom nächsten Feld einnehmen. Plane voraus und richte Kettenfänge ein, um einen Vorteil zu erlangen.",
            },
        ],
    };

    return {
        language,
        BACKEND_URL,
        country,
        getText,
        fetchIpData,
        isBackendReady,
        getTutorial,
    };
});
