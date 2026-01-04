# Trainer Next (static export ready)

## Entwicklung
```bash
npm install
npm run dev
# http://localhost:3000
```

## GitHub Pages / statischer Export
1) Optional: Setze den Repo-Basis-Pfad (z. B. bei Repo `Trainer`):
```bash
set NEXT_PUBLIC_BASE_PATH=Trainer  # Windows PowerShell: $env:NEXT_PUBLIC_BASE_PATH="Trainer"
```
2) Export bauen:
```bash
npm run export
```
3) Der statische Output liegt im Ordner `out/`. Diesen Inhalt auf GitHub Pages bereitstellen (z. B. gh-pages Branch oder Pages aus `/docs`).

## Wichtige Einstellungen
- `next.config.mjs` ist auf `output: "export"` gestellt.
- `basePath`/`assetPrefix` werden über `NEXT_PUBLIC_BASE_PATH` gesetzt, damit Assets auf GitHub Pages unter `/REPO-NAME/` gefunden werden.
