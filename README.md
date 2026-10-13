# Prompt Compass

A small web page that turns your idea into a clear AI prompt and tells you which AI to use.

## What it does
- **5 job types:** image, text, video, code / web page, research / summary. Each type asks its own questions.
- **2 working modes:** REQUEST (I know what I want) and DECIDE (help me decide first).
- **Short, focused prompts:** empty boxes are left out of the prompt.
- **Built-in working rules:** the prompt asks the AI to ask questions first, mark what it is not sure about, and check its own answer.
- **Which AI?** suggests the best tool for each job type (list checked October 2026).
- **Next: check the AI's answer:** creates a second prompt to check an AI's answer in a different AI or a new chat.

## How to use
1. Download or clone this repository.
2. Open `index.html` in your browser. No installation needed.
3. Fill in the boxes, click **Build prompt**, then **Copy**.
4. Paste the prompt into the suggested AI.
5. After you get the answer, click **Next: check the AI's answer** and use that prompt in a different AI or a new chat.

## Files
| File | What it does |
|---|---|
| `index.html` | Page structure |
| `style.css` | Look and layout (dark navy and teal theme) |
| `kurallar.js` | All rules: questions, prompt rules and the AI list. Edit this file to change them. |
| `script.js` | Logic: reads the form and builds the prompt |

## Why I built it
This is the reward project for Stage 2 of my AI learning roadmap. The goal was to learn context engineering: what makes a good prompt. The rules come from my own notes on prompting and context.

## Built with
HTML, CSS and JavaScript. Written together with Claude (AI): I designed the rules and reviewed the code.