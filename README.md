# Ô Ăn Quan

![Deploy Status](https://github.com/huyenngn/oanquan/actions/workflows/deploy.yml/badge.svg)
![License: MIT](https://img.shields.io/github/license/huyenngn/oanquan)

A Vietnamese traditional board game, Ô Ăn Quan, with an AI that uses the Minimax algorithm with Alpha-Beta pruning to play against human players.

To play the game, check it out at [huyenngn.github.io/oanquan](http://35.239.5.44/).

## Quick Start

You can host the API server and the frontend on your own machine.

Create a `.env` file in the frontend directory (optional):

```sh
echo "VITE_API_URL=http://{EXTERNAL_IP}:8000" >> frontend/.env
echo "VITE_SUPABASE_URL={SUPABASE_URL}" >> frontend/.env
echo "VITE_SUPABASE_KEY={SUPABASE_KEY}" >> frontend/.env
```

Build and run the app with Docker:

```sh
docker compose build
docker compose up
```

The API server will be running at `http://localhost:8000` and the frontend will be served at `http://localhost`.

## Development

To set up a development environment, clone the project and install it into a virtual environment.

```sh
git clone https://github.com/huyenngn/oanquan.git
cd oanquan
python -m venv .venv

source .venv/bin/activate

pip install -e '.[docs,test]'
```

To develop the frontend, use the following command:

```sh
cd frontend
npm install
npm run dev
```

To run the backend, use the following command:

```sh
python -m oanquan.api
```

The backend server will be running at `http://localhost:8000` and the live frontend will be served at `http://localhost:5173`.

## Features

-   [x] Play Ô ăn quan AI in easy mode
-   [x] Minimax algorithm with Alpha-Beta pruning for normal and hard mode
-   [ ] Leaderboard
-   [ ] Send real game data to cloud for training and analysis
