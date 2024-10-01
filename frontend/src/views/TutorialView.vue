<script setup>
import Button from '@/components/Button.vue';
import { useLanguage } from '@/stores/language';

const language = useLanguage();

function getTutorial() {
    try {
        return tutorial[language.language];
    } catch (error) {
        return tutorial["en"];
    }
}

const tutorial = {
    en: [
        {
            title: "The Ô Ăn Quan board",
            text: "The Ô Ăn Quan board consists of 10 'dân' fields, 5 on each side, and 2 larger 'quan' fields at both ends. Understanding the layout helps you plan your moves effectively.",
        },
        {
            title: "Move your seeds",
            text: "On your turn, pick up all the seeds from one of your 'dân' fields and distribute them in either direction, one by one. Once you've placed all the seeds, you pick up the seeds from the next field and distribute them in the same way. This continues until you capture or reach a 'quan' field.",
            image: "src/assets/tutorial_imgs/move.gif",
        },
        {
            title: "Capture seeds",
            text: "If the last seed you place lands in front of an empty field, you capture all the seeds in the opposite field. If the opposite field is also empty, you lose your turn. Capturing seeds key to winning.",
            image: "src/assets/tutorial_imgs/capture.gif",
        },
        {
            title: "Chain capture",
            text: "If you capture seeds and the next field is empty, you can continue capturing seeds from the next field. Plan ahead and set up chain captures to gain an advantage.",
            image: "src/assets/tutorial_imgs/chain.gif",
        },
        {
            title: "Stay defensive",
            text: "Avoid leaving a full field directly behind an empty one to prevent your opponent from capturing a lot of seeds in one turn.",
        },
        {
            title: "Plan ahead",
            text: "Try to avoid leaving your seeds in a position where your opponent can easily capture them. Instead, aim to capture your opponent's seeds and the 'quan' fields to gain an advantage. The player with the most seeds at the end of the game wins.",
        },
        {
            title: "Control the Quan",
            text: "Capturing seeds in the 'quan' fields can give you a big advantage. But be careful, if all the quan fields get captured, while you're behind, you lose the game.",
        },
        {
            title: "Win the game",
            text: "The game ends when all the 'quan' fields are empty. Seeds that remain on either side of the board go to the respective player. The player with the most seeds wins the game.",
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
            image: "src/assets/tutorial_imgs/move.gif",
        },
        {
            title: "Bắt hạt",
            text: "Nếu hạt cuối cùng bạn đặt rơi trước một ô trống, bạn bắt tất cả hạt trong ô đối diện. Nếu ô đối diện cũng trống, bạn mất lượt. Bắt hạt quan trọng để chiến thắng.",
            image: "src/assets/tutorial_imgs/capture.gif",
        },
        {
            title: "Bắt chuỗi",
            text: "Nếu bạn bắt hạt và ô tiếp theo trống, bạn có thể tiếp tục bắt hạt từ ô tiếp theo. Lên kế hoạch và thiết lập chuỗi bắt để có lợi thế.",
            image: "src/assets/tutorial_imgs/chain.gif",
        },
        {
            title: "Bảo vệ",
            text: "Tránh để lại một ô đầy ngay phía sau một ô trống để ngăn đối thủ của bạn bắt nhiều hạt trong một lượt.",
        },
        {
            title: "Lên kế hoạch",
            text: "Hãy cố gắng tránh để lại hạt của bạn ở vị trí mà đối thủ dễ dàng bắt chúng. Thay vào đó, hãy cố gắng bắt hạt của đối thủ và ô 'quan' để có lợi thế. Người chơi có nhiều hạt nhất ở cuối trò chơi sẽ thắng.",
        },
        {
            title: "Kiểm soát Quan",
            text: "Bắt hạt trong các ô 'quan' có thể mang lại lợi thế lớn cho bạn. Nhưng hãy cẩn thận, nếu tất cả các ô quan bị bắt, trong khi bạn đang ở phía sau, bạn sẽ thua trò chơi.",
        },
        {
            title: "Chiến thắng",
            text: "Trò chơi kết thúc khi tất cả các ô 'quan' trống. Hạt còn lại ở mỗi bên của bàn cờ sẽ thuộc về người chơi tương ứng. Người chơi có nhiều hạt nhất sẽ thắng trò chơi.",
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
            image: "src/assets/tutorial_imgs/move.gif",
        },
        {
            title: "Steine einnehmen",
            text: "Wenn der letzte Stein, den du platzierst, vor einem leeren Feld landet, nimmst du alle Steine im gegenüberliegenden Feld ein. Wenn das gegenüberliegende Feld auch leer ist, ist dein Gegner am Zug.",
            image: "src/assets/tutorial_imgs/capture.gif",
        },
        {
            title: "Kettenfänge",
            text: "Wenn du Steine einnimmst und das nächste Feld leer ist, kannst du weiter Steine vom nächsten Feld einnehmen. Plane voraus und richte Kettenfänge ein, um einen Vorteil zu erlangen.",
            image: "src/assets/tutorial_imgs/chain.gif",
        },
        {
            title: "Spiele defensiv",
            text: "Vermeide es, ein volles Feld direkt hinter einem leeren zu lassen, um zu verhindern, dass dein Gegner viele Steine auf einmal einnimmt.",
        },
        {
            title: "Plane voraus",
            text: "Vermeide, deine Steine in einer Position zu lassen, in der dein Gegner sie leicht einnehmen kann. Versuche stattdessen, die Steine deines Gegners und die 'quan'-Felder einzunehmen. Der Spieler mit den meisten Steinen am Ende des Spiels gewinnt.",
        },
        {
            title: "Kontrolliere die Quan",
            text: "Das Einnehmen von Steinen in den 'quan'-Feldern kann dir einen großen Vorteil verschaffen. Aber sei vorsichtig, wenn alle Quan-Felder eingenommen werden, während du zurückliegst, verlierst du das Spiel.",
        },
        {
            title: "Gewinne das Spiel",
            text: "Das Spiel endet, wenn alle 'quan'-Felder leer sind. Die Steine, die auf beiden Seiten des Bretts verbleiben, gehen an die jeweiligen Spieler. Der Spieler mit den meisten Steinen gewinnt das Spiel.",
        },
    ],
};
</script>

<template>
    <Button color="orange" @click="$router.push('/')">
        {{ language.getText("back") }}
    </Button>
    <div v-for="(step, index) in getTutorial()">
        <h1>{{ step.title }}</h1>
        <p>
            {{ step.text }}
        </p>
        <img v-if="step.image" :src="step.image" />
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin-top: 2rem;
}

h1 {
    font-size: 1.75rem;
    font-weight: bold;
    display: flex;
}

p {
    font-size: 1.25rem;
    font-weight: normal;
}
</style>