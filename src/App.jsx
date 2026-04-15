import {useState, useRef, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const formData = useRef(null);
  const [sessions, setSessions] = useState([]);
  const [count, setCount] = useState(0)

  const handleFormData = (e) => {
    e.preventDefault();
    const date = formData.current.date.value;
    const words = formData.current.words.value;
    console.log(`${date}: ${words}`);
  }

  useEffect(() => {
    async function getSessions() {

      try {
        const response = await fetch("http://localhost:8081/api/sessions");
              if (response.ok) {
                let data = await response.json();
                setSessions(data);
                let ses = data[0];
                for (let key in formData.current){
                  const prop = formData.current[key].id;
                  if (Number.isInteger(Number(key)) && prop){
                    console.log(`${prop}: ${formData.current[key].id.value}`);
                    // console.log(key);
                  }
                }
                // formData.current.date.value = ses.date;
                // formData.current.words.value = ses.words;
                // formData.current.start.value = ses.startTime;
                // formData.current.stop.value = ses.stopTime;
                // formData.current.scene.value = ses.sceneCode;
                console.log(`Session:`);
                console.log(JSON.stringify(data[0]));
              } else {
                console.log(`Error: ${response.status}`);
              }
      } catch (error) {
        console.log(error)
      }
    }
    getSessions().then(() => {
      for (let key in formData.current) {
        if (Number.isInteger(Number(key)) && formData.current[key].value) {
          console.log(`${key}: ${formData.current[key].value} ${typeof formData.current[key].value}`);
        }
      }

      console.log(formData);
    });

  }, []);

  if (sessions.length > 0){
    console.log(`${sessions.length} sessions available.`);

  }
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite collective</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <form ref={formData} onSubmit={handleFormData}>
        <label htmlFor="date" className="text-amber-500">Date</label>
        <input type="date" id="date" name="date" />
        <label htmlFor="startTime">Start Time</label>
        <input type="datetime" id="startTime" name="start" />
        <label htmlFor="stopTime">Stop Time</label>
        <input type="datetime" id="stopTime" name="stop" />
        <label htmlFor="words">Words</label>
        <input type="number" id="words" name="words" />
        <label htmlFor="sceneCode">Scene ID</label>
        <input type="text" id="sceneCode" name="scene" />
        <button type="submit">Submit</button>
      </form>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
