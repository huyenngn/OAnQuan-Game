import GameView from "@/views/GameView.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";
import MenuView from "@/views/MenuView.vue";
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
            path: "/game/:level",
            name: "game",
            component: GameView,
        },
        {
            path: "/leaderboard",
            name: "leaderboard",
            component: LeaderboardView,
        },
    ],
});

export default router;
