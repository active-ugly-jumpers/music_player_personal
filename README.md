# music player

_personal_

a personal music player with custom minimal ui and nerdy library organization by record labels.

for backend uses [gonic](https://github.com/sentriz/gonic) - a music streaming server that implements the [subsonic api](https://www.subsonic.org/).

for frontend - react/typescript.

## features

- **library navigation**: browse music by record labels, albums, artists, or go with random album selection
- **album player**: full album playback with track progression, no track scrolling - that's intentional!
- **docker ready**: containerized setup with gonic backend

## fonts

this project uses custom fonts. See [LICENSES.md](LICENSES.md) for full attribution and licensing information.

- **PP Mondwest** - main font (free for personal use)
- **Fungal** - headings (SIL OFL)
- **RAMI** - decorative elements (SIL OFL)

## music library organization

**important**: this player expects your music library to be organized by record labels. your folder structure should look like:

```
/music/
├── Label Name 1/
│   ├── Artist - Album /
│   └── Another Artist - Album /
├── Label Name 2/
│   ├── Artist - Album /
│   └── Artist - Another Album /
└── Unknown Label/
    └── Various albums without clear label info
```

see this [script](https://github.com/active-ugly-jumpers/music_cleaner) to organize your music library like that using beets.

## quick start

1. clone the repository
2. set up your music library path in `docker-compose.yml`
3. configure credentials in `.env`:
   ```
   GONIC_USER=your_username
   GONIC_PASS=your_password
   GONIC_PORT=4747
   ```
4. run with docker:
   ```bash
   docker-compose up -d
   ```
5. navigate to gonic at `http://localhost:4747` and set up the user with your credentials.
6. access the player at `http://localhost:4748`

## tech Stack

- **frontend**: react, typescript
- **backend**: gonic (subsonic-compatible music server)
- **deployment**: docker compose
