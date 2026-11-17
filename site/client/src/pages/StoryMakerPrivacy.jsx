import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'
import { GitHubButton } from '../BrandButtons.jsx'

// StoryMaker's privacy policy: /storymaker/privacy. The Microsoft Store listing links here.
export default function StoryMakerPrivacy() {
  useTitle('StoryMaker privacy policy')

  return (
    <>
      <p className="breadcrumb">
        <Link to="/projects/lunar-journal">← Lunar Journal &amp; StoryMaker</Link>
      </p>

      <article className="item">
        <h1 className="page-title">StoryMaker privacy policy</h1>
        <p className="item-summary">
          StoryMaker has no accounts, no tracking and no analytics. It only sends your data where you
          tell it to: to the AI you choose, and to your own website if you set one up.
        </p>

        <div className="prose">
          <h2>What StoryMaker reads on your PC</h2>
          <ul>
            <li>
              The Lunar Journal files that World of Warcraft saves for your characters (in the game's{' '}
              <code>WTF</code> folder): quests, people met, places, times and your own notes.
            </li>
            <li>The pictures and sounds you choose to put in a chapter, for example from the game's screenshots folder.</li>
            <li>
              API keys and the website token, from Windows environment variables that you set yourself.
              StoryMaker never stores them.
            </li>
          </ul>

          <h2>What it sends, and where</h2>
          <ul>
            <li>
              <b>To the AI you choose</b>, when you press <i>Write chapter</i>: the journal for the play
              sessions you ticked, the story so far, and your wishes for the chapter. With Ollama this
              stays on your own PC. With Claude (Anthropic), OpenAI or Gemini (Google) it is sent to that
              company under its own terms and privacy policy.
            </li>
            <li>
              <b>To your website</b>, only if you set one up and press <i>Post</i>: the chapter and the
              pictures and sounds in it. StoryMaker also reads the story so far from it.
            </li>
            <li>
              Nothing is sent to the author of StoryMaker. The <i>Buy me a coffee</i> button only opens
              buymeacoffee.com in your browser.
            </li>
          </ul>

          <h2>What it keeps on your PC</h2>
          <ul>
            <li>
              Its settings, including which play sessions are already in a story, in its own settings
              file (<code>%APPDATA%\LunarJournal\StoryMaker.json</code>, or the app's own data folder when
              installed from the Microsoft Store).
            </li>
            <li>Chapters you save with <i>Save as Markdown</i>, where you save them.</li>
          </ul>
          <p>Uninstalling StoryMaker removes the program; you can delete the settings file and saved chapters yourself.</p>

          <h2>Children</h2>
          <p>StoryMaker is not directed at children and does not knowingly collect anyone's personal data.</p>

          <h2>Questions</h2>
          <p>
            Ask on StoryMaker's GitHub page. StoryMaker is open source, so you can also read exactly
            what it does in its code.
          </p>
          <div className="project-links">
            <GitHubButton href="https://github.com/Lundqwist/StoryMaker/issues">Ask on GitHub</GitHubButton>
          </div>

          <p className="mod-note">Last updated 17 November 2026.</p>
        </div>
      </article>
    </>
  )
}
