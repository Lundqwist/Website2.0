import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'
import { GitHubButton } from '../BrandButtons.jsx'

// The AI Workbench project page: /projects/ai-workbench. Based on the project's README
// (github.com/Lundqwist/AiProjects). Screenshots are in public/images/projects/ai-workbench;
// they're made from the project's made-up test data by app/make_screenshots.py there.
const img = (file) => `/images/projects/ai-workbench/${file}`
const repo = 'https://github.com/Lundqwist/AiProjects'

const tools = [
  {
    id: 'documents',
    title: 'Documents',
    tagline: 'Answers from my own files, with sources.',
    text: (
      <p>
        Add PDFs, Markdown and text files (buttons or drag-and-drop) and ask questions about them.
        Every answer cites the passages it came from, and when the answer isn't in the documents it
        says so instead of guessing. Built on ChromaDB with <code>nomic-embed-text</code> embeddings
        and <code>gemma3:12b</code> for the answers.
      </p>
    ),
    image: '1-documents.png',
    alt: 'The Documents tab: two files and a cited answer about vacation days',
  },
  {
    id: 'voice',
    title: 'Voice',
    tagline: 'A spoken assistant, in English or Swedish.',
    text: (
      <p>
        Three ways to talk: say <b>"Hey Luna"</b> (an always-on wake word, all local), a
        conversation mode without the wake word, or hold the big button. Speech recognition is
        Whisper, the voices are Piper, and the answer comes back in the language of the question.
        The assistant has tools: it can read and add my tasks, run the TV, play music on Spotify,
        open programs and check whether my servers are up.
      </p>
    ),
    image: '2-voice.png',
    alt: 'The Voice tab: a question in English and one in Swedish, each answered in its own language',
  },
  {
    id: 'invoices',
    title: 'Invoices',
    tagline: 'PDFs and photos into checked rows.',
    text: (
      <p>
        Drop invoices in, and a vision model reads supplier, number, dates, lines, VAT and total.
        The lines, VAT and total must add up before an invoice goes into the CSV; one that doesn't
        goes to review with the reason, so a misread number never slips through quietly.
      </p>
    ),
    image: '3-invoices.png',
    alt: "The Invoices tab: four invoices in the table and one in review because its total doesn't add up",
  },
  {
    id: 'research',
    title: 'Research',
    tagline: 'A cited report from the web.',
    text: (
      <p>
        An agent (<code>qwen3:8b</code> with tool calling) searches the web, reads the pages it
        chooses and writes a report with numbered sources. A grounding check then looks for numbers,
        versions and names in the report that weren't in any page it read, and flags them.
      </p>
    ),
    image: '4-research.png',
    alt: "The Research tab: the agent's steps, the check and the finished report with sources",
  },
  {
    id: 'create',
    title: 'Create',
    tagline: 'Pictures, music, songs, stories and movies.',
    text: (
      <>
        <p>
          Describe an idea in English or Swedish and it is made on this PC: pictures with
          SDXL-Turbo, short tunes with MusicGen and stories by the writing model.
        </p>
        <ul>
          <li>
            <b>Songs with singing:</b> the writing model writes rhyming lyrics with verses and a
            chorus (or I paste my own), and{' '}
            <a href="https://github.com/ACE-Step/ACE-Step-1.5">ACE-Step 1.5</a> sings and plays it,
            as long as the lyrics need, in about 30 seconds per minute of song
          </li>
          <li>
            <b>Movies:</b> narrated short films from one sentence. The writing model writes a
            screenplay, every scene is painted in the same style with the same characters, and{' '}
            <a href="https://huggingface.co/Lightricks/LTX-Video">LTX-Video</a> brings each one to
            life as real video. A Piper voice narrates it, MusicGen scores it, and ffmpeg puts it
            together with crossfades, a title and subtitles. I can read and change the screenplay
            before it's filmed, and turn narration, subtitles and music on or off; a silent film gets
            title cards instead of a narrator. A 40-second film takes 4–8 minutes
          </li>
        </ul>
        <p>
          Every creation is saved with a record of which model made it and where. The voice
          assistant can do all of it too: "make a movie about a lighthouse keeper and a whale".
        </p>
      </>
    ),
    image: '9-movie.jpg',
    alt: 'Four frames from a movie the workbench made from one sentence: the title, and a fox cub that walks through the snow and finds its way home under the northern lights, with subtitles',
  },
  {
    id: 'tv',
    title: 'TV',
    tagline: 'Wake it, pick a channel, use a remote.',
    text: (
      <p>
        Finds a Samsung TV on the network, turns it on with Wake-on-LAN, opens apps and favourite
        channels in one click, and has a full remote. The voice assistant uses the same code, so
        "turn on the news" works too.
      </p>
    ),
    image: '5-tv.png',
    alt: 'The TV tab: power, apps and channels, favourites and a remote',
  },
  {
    id: 'access',
    title: 'Access',
    tagline: 'What the assistant may do.',
    text: (
      <ul>
        <li>
          <b>Free:</b> open the programs on the list, check status, read tasks, the TV
        </li>
        <li>
          <b>Asks first:</b> anything else, as a question on screen that only a click can answer
          (never a voice, so the TV or a visitor can't say yes); no answer in 90 seconds is a no
        </li>
        <li>
          <b>Never:</b> delete files, send messages, payments or system settings. No tool for them
          exists, and programs that could do them are refused even with permission
        </li>
      </ul>
    ),
    image: '6-access.png',
    alt: 'The Access tab: the three levels, programs it may open, status checks and containers',
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    tagline: 'Tests that keep it honest.',
    text: (
      <p>
        <a href="https://www.promptfoo.dev">promptfoo</a> test suites run against the real project
        code with my models: one for the document assistant (does it cite, does it refuse when the
        answer isn't there) and one for the invoices. The first run of the document suite found
        three bugs (80 % → 100 %).
      </p>
    ),
    image: '7-evaluation.png',
    alt: 'The Evaluation tab: the invoices suite, 5 of 5 passed',
  },
  {
    id: 'settings',
    title: 'Settings',
    tagline: 'Everything in one place.',
    text: (
      <p>
        Models per task (filled from Ollama), folders, microphone and speakers, the speech model,
        voices with a voice library, and the integrations. At start it checks for updates to
        Ollama's models, voices, Python packages, the code and promptfoo, and installs them after
        closing.
      </p>
    ),
    image: '8-settings.png',
    alt: 'The Settings tab: models and folders',
  },
]

export default function AiWorkbench() {
  useTitle('AI Workbench')

  return (
    <>
      <p className="breadcrumb">
        <Link to="/projects">← Projects</Link>
      </p>

      <article className="item">
        <div className="mods-head">
          <img className="mods-logo" src="/images/lundqwist-logo.webp" alt="" />
          <div>
            <h1 className="page-title">AI Workbench</h1>
            <span className="project-status">Ongoing</span>
          </div>
        </div>

        <p className="item-summary">
          Local AI on my own PC: documents, voice, invoices, research, songs, movies and more. No
          cloud, no API keys. A Windows program in Python that runs five AI projects entirely on one PC with
          Ollama, on an RTX 3080 Ti with 12 GB.
        </p>

        <div className="item-image">
          <img
            src={img('0-home.png')}
            alt="AI Workbench's front page: the Lundqwist emblem and a card for every tool"
          />
        </div>

        <div className="prose">
          <p>
            It answers questions from my own documents with sources, turns invoice PDFs and photos
            into checked spreadsheet rows, writes cited research reports from the web, makes songs
            with singing and narrated short movies from one sentence, and has a
            voice assistant I wake with "Hey Luna", in English or Swedish. The assistant can run the
            TV, read my tasks and check my servers, and it asks on screen before doing anything
            more. Test suites with promptfoo keep the answers honest.
          </p>
          <p>
            It's dressed in this site's navy and gold, like{' '}
            <Link to="/projects/lunar-journal">StoryMaker</Link>: it opens on a front page with the
            Lundqwist emblem and a card for every tool.
          </p>
        </div>

        <nav className="mods-toc" aria-label="The tools">
          {tools.map((t) => (
            <a key={t.id} href={`#${t.id}`}>
              {t.title}
            </a>
          ))}
          <a href="#built-with">Built with</a>
        </nav>

        {tools.map((t) => (
          <section key={t.id} id={t.id} className="mod">
            <div className="project-head">
              <h2 className="project-title">{t.title}</h2>
            </div>
            <p className="mod-tagline">{t.tagline}</p>
            <div className="prose">{t.text}</div>
            <div className="item-image">
              <img src={img(t.image)} alt={t.alt} loading="lazy" />
            </div>
          </section>
        ))}

        <section id="built-with" className="mod">
          <div className="project-head">
            <h2 className="project-title">Built with</h2>
          </div>
          <div className="prose">
            <p>
              Python 3.12 · PySide6 (Qt 6) · Ollama (<code>gemma3:12b</code>, <code>qwen3:8b</code>,{' '}
              <code>nomic-embed-text</code>) · ChromaDB · faster-whisper · Piper · PyTorch + diffusers
              (SDXL-Turbo, MusicGen, LTX-Video) · ACE-Step 1.5 · ffmpeg · promptfoo · uv
            </p>
            <p>
              Inside are five projects that also run on their own: a RAG document assistant, a voice
              agent, invoice automation, a research agent and an evaluation platform. Nothing
              personal is in the code: the TV, programs, servers and integrations come from the
              program's own settings, and tokens are read from environment variables, never stored.
              All test data in the repository, and in these screenshots, is made up.
            </p>
          </div>
          <div className="project-links">
            <GitHubButton href={repo} />
          </div>
        </section>
      </article>
    </>
  )
}
