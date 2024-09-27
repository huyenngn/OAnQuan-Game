import BotGameView from "@/views/BotGameView.vue";
import CampaignSelectionView from "@/views/CampaignSelectionView.vue";
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
            path: "/game/:level",
            name: "game",
            component: BotGameView,
            props: true,
        },
        {
            path: "/tutorial",
            name: "tutorial",
            component: TutorialView,
        },
        {
            path: "/campaign",
            name: "campaign",
            component: CampaignSelectionView,
        },
        {
            path: "/leaderboard",
            name: "leaderboard",
            component: LeaderboardView,
        },
    ],
});

export default router;
