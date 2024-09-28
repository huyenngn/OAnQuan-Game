import ChallengeGameView from "@/views/ChallengeGameView.vue";
import ChallengeSelectionView from "@/views/ChallengeSelectionView.vue";
import ClassicGameView from "@/views/ClassicGameView.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";
import MenuView from "@/views/MenuView.vue";
import TutorialView from "@/views/TutorialView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "menu",
            component: MenuView,
        },
        {
            path: "/game/:difficulty",
            name: "game",
            component: ClassicGameView,
            props: true,
        },
        {
            path: "/tutorial",
            name: "tutorial",
            component: TutorialView,
        },
        {
            path: "/challenges",
            name: "challenges",
            component: ChallengeSelectionView,
        },
        {
            path: "/challenge/:id",
            name: "challenge",
            component: ChallengeGameView,
            props: true,
        },
        {
            path: "/leaderboard",
            name: "leaderboard",
            component: LeaderboardView,
        },
    ],
});

export default router;
