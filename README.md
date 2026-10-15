# Arabic Dialects

Learn Arabic across **25 regional dialects** with bite-sized, Duolingo-style lessons.
Lessons grade themselves and move on automatically, so you can focus on the language.

**Live app:** https://jnazah07.github.io/arabic-dialects/

## Get the app

| Platform | How |
|----------|-----|
| Web | Open https://jnazah07.github.io/arabic-dialects/ in any browser. |
| Android | Download `ArabicDialects.apk` from the [Releases page](https://github.com/Jnazah07/arabic-dialects/releases) and install it (allow "install unknown apps" for your browser). |
| Windows | Download `ArabicDialectsSetup.exe` from the [Releases page](https://github.com/Jnazah07/arabic-dialects/releases) and run it. Per-user install, no admin needed. |
| iPhone / iPad | Open https://jnazah07.github.io/arabic-dialects/ in Safari, tap Share, then "Add to Home Screen". |
| Any device, offline | Install it as a PWA from the browser menu ("Install app" or "Add to Home Screen"). The app then runs offline. |

## Dialects

| Region | Dialects |
|--------|----------|
| Gulf | Emirati, Saudi, Omani, Yemeni, Kuwaiti, Qatari, Bahraini |
| Iraq | Iraqi |
| Levant | Jordanian, Lebanese, Palestinian, Syrian |
| Nile Valley | Egyptian, Sudanese |
| Maghreb | Algerian, Libyan, Mauritanian (Hassaniya), Moroccan, Tunisian |
| West Africa | Malian, Nigerien, Senegalese |
| Horn of Africa | Comorian, Djiboutian, Somali |

## How the lessons work

- Pick a dialect, then follow a seven-unit path: a dialect-specific **Basics**
  unit (real greetings, e.g. Iraqi "Ø´Ù„ÙˆÙ†ÙƒØŸ", Moroccan "Ù„Ø§Ø¨Ø§Ø³ØŸ", Egyptian "Ø¹Ø§Ù…Ù„ Ø¥ÙŠÙ‡ØŸ"),
  then Family, Food, Numbers, Places, Time, and Colors.
- Units unlock in order.
- Each question is graded the moment you tap an answer, then the app advances on
  its own. A short pause follows a correct answer, a longer one reveals the
  correct answer when you miss.
- Two directions are mixed in: Arabic to English, and English to Arabic.
- Text-to-speech plays each Arabic word (quality depends on your device's voices).
- XP, levels (500 XP per level), a daily streak, and three achievements.
- Progress is saved on the device.

Keyboard: `1`-`4` pick an answer, `Enter` skips the auto-advance wait.

## Run locally

Open `index.html` directly, or serve the folder:

```
npx serve .
```

## Project layout

```
index.html            Markup and screens
css/style.css         Design tokens and all styling
data/dialects.js      The 25 dialects (id, names, flag, region)
data/lessonData.js    Curriculum: dialect basics + shared topic pool
js/app.js             App state, lesson engine, events
manifest.webmanifest  PWA manifest
sw.js                 Service worker (offline caching)
assets/               Icons
installer/            NSIS script and icon builder for the Windows installer
build.ps1             Builds the single-file HTML and the zip
```

## Build

```
powershell -ExecutionPolicy Bypass -File build.ps1
```

Produces `arabic-dialects-single.html` (one self-contained file) and `arabic-dialects.zip`.

## Adding content

Dialect greetings live in `dialectBasics` in `data/lessonData.js`. Shared topic
units live in `topicPool`; the `curriculum` array sets their order. To add a
dialect, add an entry in `data/dialects.js` and a matching key in `dialectBasics`.

## Credits

Built as a self-contained web app. No tracking, no backend, no accounts.
