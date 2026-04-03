import { useRef, useState } from 'react'
import './App.css'

const coverImageUrl = new URL(
  './assets/mmotdf-cover.png',
  import.meta.url,
).href
const trailerVideoUrl = new URL(
  './assets/mmotdf-trailer.mov',
  import.meta.url,
).href
const audioUrl = new URL(
  './assets/mmotdf.mp3',
  import.meta.url,
).href
const bloopersVideoUrl = new URL(
  './assets/mmotdf-bloopers.mov',
  import.meta.url,
).href

const scriptLines = [
  {
    speaker: 'NARRATION',
    text: 'INT. RESTAURANT - NIGHT. Sheena and Em are on a date at a restaurant, reminiscing on memorable dates and their shared appreciation for dance.',
  },
  {
    speaker: 'Sheena',
    text: "So what about you? When's the last time you had a really good time on a date? Like what did you do?",
  },
  {
    speaker: 'Em',
    text: 'Hmmm. Okay this is gonna sound mad simple, but we went dancing. But like actually danced. It was hella fun.',
  },
  {
    speaker: 'Sheena',
    text: 'Oh, so you like to dance?',
  },
  {
    speaker: 'Em',
    text: 'You can say that.',
  },
  {
    speaker: 'Sheena',
    text: 'But what would you say?',
  },
  {
    speaker: 'Em',
    text: "I mean, I don't go dancing often but there is something freeing about it. Especially when you got a healthy relationship with the dance floor.",
  },
  {
    speaker: 'Sheena',
    text: 'I feel that, but that requires you to stop caring about the people around you.',
  },
  {
    speaker: 'Em',
    text: 'Exactly! You get it. So do you like to dance?',
  },
  {
    speaker: 'Sheena',
    text: 'Like is definitely an understatement.',
  },
  {
    speaker: 'Em',
    text: "I can definitely see you in the middle of the dance floor once they get the circle going. You know what's crazy though?",
  },
  {
    speaker: 'Sheena',
    text: 'What?',
  },
  {
    speaker: 'Em',
    text: "That people be at the dance spots and don't dance anymore.",
  },
  {
    speaker: 'Sheena',
    text: "I know, right? That's so wild to me. Matter of fact, take me dancing. I'll be so tired after you ain't even gotta feed me.",
  },
  {
    speaker: 'Em',
    text: 'If you wanna go dancing with me, just say that.',
  },
  {
    speaker: 'Sheena',
    text: 'If you wanna meet me on the dance floor, just say that.',
  },
  {
    speaker: 'Em',
    text: 'Touché.',
  },
] as const

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  function restart() {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    setPlaying(true)
  }

  function scrub(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <>
      <img
        className='bg-cover-blur'
        src={coverImageUrl}
        aria-hidden='true'
        alt='meet me on the dance floor cover image spread across background and blurred'
      />
      <section id='center'>
        <div>
          <h1
            className='uppercase tracking-widest'
            style={{
              fontFamily: 'Barrio',
              color: 'var(--yellow)',
              textShadow: '2px 2px 8px #1a0a2e',
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            }}
          >
            for pretty girls that don't dance
          </h1>
        </div>
        <div className='single-col'>
          <h2
            className='uppercase tracking-widest'
            style={{
              fontFamily: 'Barrio',
              color: 'var(--yellow)',
              textShadow: '2px 2px 8px #1a0a2e',
            }}
          >
            Trailer
          </h2>
          <video className='trailer-video' controls playsInline>
            <source src={trailerVideoUrl} type='video/quicktime' />
            <source src={trailerVideoUrl} type='video/mp4' />
          </video>
          <h2
            className='uppercase tracking-widest'
            style={{
              fontFamily: 'Barrio',
              color: 'var(--yellow)',
              textShadow: '2px 2px 8px #1a0a2e',
            }}
          >
            Script
          </h2>
          <section className='script-card' aria-label='Scene script'>
            <div className='script-body'>
              {scriptLines.map((line, idx) => (
                <p key={`${line.speaker}-${idx}`} className='script-line'>
                  <span
                    className={`speaker speaker-${line.speaker.toLowerCase()}`}
                  >
                    {line.speaker}
                  </span>
                  <span className='line-text'>{line.text}</span>
                </p>
              ))}
            </div>
          </section>
          <h2
            className='uppercase tracking-widest'
            style={{
              fontFamily: 'Barrio',
              color: 'var(--yellow)',
              textShadow: '2px 2px 8px #1a0a2e',
            }}
          >
            Cover
          </h2>
          <img
            className='cover-art'
            src={coverImageUrl}
            alt='Meet Me On The Dance Floor'
          />
          <h2
            className='uppercase tracking-widest'
            style={{
              fontFamily: 'Barrio',
              color: 'var(--yellow)',
              textShadow: '2px 2px 8px #1a0a2e',
            }}
          >
            Listen
          </h2>
          <div className='music-player'>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />
            <span className='player-title'>Meet Me On The Dance Floor</span>
            <div className='player-scrubber'>
              <input
                type='range'
                min={0}
                max={duration || 0}
                step={0.01}
                value={currentTime}
                onChange={scrub}
                style={
                  {
                    '--progress': duration
                      ? `${(currentTime / duration) * 100}%`
                      : '0%',
                  } as React.CSSProperties
                }
                aria-label='Seek'
              />
              <div className='player-times'>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className='player-controls'>
              <button onClick={restart} aria-label='Restart'>
                <svg
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width='18'
                  height='18'
                >
                  <path d='M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z' />
                </svg>
              </button>
              <button
                onClick={togglePlay}
                className='play-pause'
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <svg
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    width='22'
                    height='22'
                  >
                    <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                  </svg>
                ) : (
                  <svg
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    width='22'
                    height='22'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <h2
            className='uppercase tracking-widest'
            style={{
              fontFamily: 'Barrio',
              color: 'var(--yellow)',
              textShadow: '2px 2px 8px #1a0a2e',
            }}
          >
            Bloopers
          </h2>
          <video className='trailer-video bloopers-video' controls playsInline>
            <source src={bloopersVideoUrl} type='video/quicktime' />
            <source src={bloopersVideoUrl} type='video/mp4' />
          </video>
        </div>
      </section>
      <footer className='site-footer uppercase'>
        <p>© 2026</p>
        <p>
          <a href='https://emmittjames.com' target='_blank' rel='noopener noreferrer'>
            emmittjames.com
          </a>
        </p>
        <p>
          brought to you by{' '}
          <a href='https://curiousbean.dev' target='_blank' rel='noopener noreferrer'>
            curious bean llc
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
