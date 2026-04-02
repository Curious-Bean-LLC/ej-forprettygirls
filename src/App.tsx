import { useRef, useState } from 'react'
import './App.css'

const coverImageUrl = new URL(
  './assets/Meet Me On The Dance Floor Cover.png',
  import.meta.url,
).href
const trailerVideoUrl = new URL(
  './assets/MMOTDF4 (TRAILER).mov',
  import.meta.url,
).href
const audioUrl = new URL(
  './assets/Meet Me On The Dance Floor (master.2).mp3',
  import.meta.url,
).href

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
        alt=''
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
            meet me on the dance floor
          </h1>
          <p
            className='uppercase tracking-widest mb-2'
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: 'var(--yellow)',
              textShadow: '1px 1px 6px #1a0a2e',
              fontSize: 'clamp(0.85rem, 2.5vw, 1.25rem)',
            }}
          >
            an emmitt james project
          </p>
        </div>
        <div className='two-col'>
          <div className='col-left'>
            <div className='music-player'>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              />
              {/* <span className="player-title">Meet Me On The Dance Floor</span> */}

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
            </div>
            <img
              className='cover-art'
              src={coverImageUrl}
              alt='Meet Me On The Dance Floor'
            />
          </div>
          <div className='col-right mt-2'>
            <video className='trailer-video' controls playsInline>
              <source src={trailerVideoUrl} type='video/quicktime' />
              <source src={trailerVideoUrl} type='video/mp4' />
            </video>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
