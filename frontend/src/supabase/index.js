import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

async function fetchEntries(filters = {}) {
    let query = supabase.from("leaderboard").select("*");

    if (filters.level) {
        query = query.eq("level", filters.level.toUpperCase());
    }
    if (filters.country) {
        query = query.eq("country", filters.country);
    }
    if (filters.created_at) {
        query = query.gte("created_at", new Date(filters.time).toISOString());
    }

    query = query.order("score", { ascending: false });

    const { data, error } = await query.limit(100);

    if (error) {
        console.error(error);
    } else {
        return data;
    }
}

async function addEntry(name, score, country, level) {
    const { error } = await supabase.from("leaderboard").insert([
        {
            name: name,
            score: score,
            country: country,
            level: level.toUpperCase(),
        },
    ]);
    if (error) {
        console.error(error);
    }
}

async function getRank(score, level) {
    const { data, error } = await supabase
        .from("leaderboard")
        .select("score, level")
        .eq("level", level.toUpperCase())
        .order("score", { ascending: false })
        .limit(100)
        .gte("score", score);
    if (error) {
        console.error(error);
    } else {
        return data.length;
    }
}

async function getCountries() {
    let { data, error } = await supabase.rpc("get_countries");
    if (error) {
        console.error(error);
    } else {
        return data;
    }
}

export { addEntry, fetchEntries, getCountries, getRank };
