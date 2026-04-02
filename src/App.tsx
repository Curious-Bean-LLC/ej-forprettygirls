import './App.css'

const coverImageUrl = new URL('./assets/Meet Me On The Dance Floor Cover.png', import.meta.url).href
const trailerVideoUrl = new URL('./assets/MMOTDF4 (TRAILER).mov', import.meta.url).href

function App() {
  return (
    <>
      <img className="bg-cover-blur" src={coverImageUrl} aria-hidden="true" alt="" />
      <section id="center">
        <h1 className="uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#ffe4ec', textShadow: '2px 2px 8px #1a0a2e', fontSize: 'clamp(1rem, 5vw, 3.5rem)', opacity: 0.66 }}>meet me on the dance floor</h1>
        <p className="uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#ffe4ec', textShadow: '1px 1px 6px #1a0a2e', fontSize: 'clamp(0.5rem, 2.5vw, 1.25rem)', opacity: 0.66 }}>an emmitt james project</p>
        <img className="cover-art" src={coverImageUrl} alt="Meet Me On The Dance Floor" />
        <video className="trailer-video" controls playsInline>
          <source src={trailerVideoUrl} type="video/quicktime" />
          <source src={trailerVideoUrl} type="video/mp4" />
        </video>
      </section>
    </>
  )
}

export default App
