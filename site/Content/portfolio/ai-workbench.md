<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/AiProjects); edit it freely. -->

A Windows program that runs five AI projects entirely on my own PC with **Ollama**, on an RTX 3080 Ti with 12 GB: no cloud, no API keys. It's dressed in this site's navy and gold and opens on a front page with the Lundqwist emblem and a card for every tool. Screenshots of every tab are on the [project page](/projects/ai-workbench).

## What it does

- **Documents:** answers questions from my own PDFs and notes, citing the passages it used, and says so when the answer isn't there (RAG with ChromaDB and `nomic-embed-text`)
- **Voice:** a spoken assistant in English or Swedish, woken with "Hey Luna" (all local), with Whisper for speech and Piper for the voices; it can read and add my tasks, run the TV, play music and check my servers
- **Invoices:** a vision model reads invoice PDFs and photos; lines, VAT and total must add up before a row goes into the CSV, and one that doesn't goes to review with the reason
- **Research:** an agent searches the web, reads pages and writes a report with numbered sources, then a grounding check flags numbers and names that weren't in any page it read
- **Create:** pictures (SDXL-Turbo), short tunes (MusicGen) and stories; **songs with singing**, where the writing model writes the lyrics and ACE-Step 1.5 sings and plays a 1–3 minute song; and **narrated short movies** from one sentence: a screenplay, a painted picture per scene with the same characters throughout, a narrator's voice, music, and ffmpeg putting it together with camera moves, a title and subtitles. Every creation records which model made it and where
- **TV:** Wake-on-LAN, favourite channels in one click and a full remote for a Samsung TV

## Safe by design

The assistant's tools come in three levels. Some are free (open the programs on a list, check status, read tasks). Everything else asks on screen first, and only a click can answer, never a voice, so the TV or a visitor can't say yes. Deleting files, sending messages, payments and system settings have no tool at all.

## Tested

**promptfoo** test suites run against the real project code with my own models. The first run of the document suite found three bugs (80 % → 100 %), and a self-test drives every tab end to end with made-up data.

Built with Python 3.12, PySide6 (Qt 6), Ollama (`gemma3:12b`, `qwen3:8b`, `nomic-embed-text`), ChromaDB, faster-whisper, Piper, PyTorch with diffusers (SDXL-Turbo, MusicGen), ACE-Step 1.5, ffmpeg, promptfoo and uv.
