import { useEffect, useRef, useState } from 'react'

const videoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'
const portraitUrl =
  `${import.meta.env.BASE_URL}marleen-van-valkenhoef.png`

type PageKey = 'home' | 'specialisaties' | 'over-mij' | 'werkwijze' | 'vergoeding' | 'contact'

const pages: Record<Exclude<PageKey, 'home'>, { title: string; intro: string; sections: { heading: string; text: string }[] }> = {
  specialisaties: {
    title: 'Specialisaties',
    intro: 'Ik begeleid u met persoonlijke voedingsadviezen die passen bij uw gezondheid, leefstijl en dagelijks leven.',
    sections: [
      {
        heading: 'Kwaliteit & specialisatie',
        text: 'Ik begeleid mensen met overgewicht en ondergewicht, verhoogd cholesterol, hoge bloeddruk, Diabetes Mellitus, darmklachten, jicht, chronische obstructieve longziekten, voedselallergie of ziekten aan de organen. Ik ben ook bekend met het FODMAP-dieet bij PDS.',
      },
      {
        heading: 'Wat kan ik nog meer voor u betekenen?',
        text: 'Daarnaast begeleid ik graag bij verantwoorde kindervoeding, voeding bij zwangerschap of een vegetarische voeding. Ook andere vragen over voeding zie ik als een uitdaging. Tevens maak ik gebruik van koolhydraatarme of beperkte diëten wanneer reguliere voedingsadviezen niet het gewenste resultaat geven.',
      },
      {
        heading: 'Maatwerk',
        text: 'Als diëtist werk ik evidence based: ik geef alleen adviezen die wetenschappelijk onderbouwd zijn. Ik lever hierbij maatwerk, want niemand is hetzelfde. Samen bespreken we eventuele achterliggende problemen en werken we aan gedrag dat bij u past.',
      },
    ],
  },
  'over-mij': {
    title: 'Over mij',
    intro: 'Even voorstellen',
    sections: [
      {
        heading: 'Marleen van Valkenhoef',
        text: 'Al op jonge leeftijd was ik met voeding bezig en dacht ik na hoe mensen gezonder konden eten. Daarom koos ik voor de opleiding Voeding en Diëtetiek. Uiteindelijk rondde ik de masteropleiding Voeding en Gezondheid aan de Wageningen Universiteit af omdat ik geïnteresseerd ben in de voedingswetenschap.',
      },
      {
        heading: 'Voeding en leefstijl',
        text: 'Na enkele jaren gewerkt te hebben in het bedrijfsleven, merkte ik dat mijn passie toch bij het begeleiden van mensen en hun voedingsgedrag ligt. Ik ben ook leefstijlcoach, dus naast voeding houd ik mij bezig met alle leefstijlvraagstukken.',
      },
      {
        heading: 'Samen werken aan uw doel',
        text: 'Een nieuwe levensstijl ontwikkelen kan lastig zijn. Twijfelt u of u de juiste voeding neemt, eet u uit stress of heeft u zoveel diëten gevolgd dat u door de bomen het bos niet meer ziet? Ik geloof in uw eigen kracht om met de juiste coaching uw doel te bereiken.',
      },
    ],
  },
  werkwijze: {
    title: 'Werkwijze',
    intro: 'Mijn werkwijze als diëtist',
    sections: [
      {
        heading: 'Intakegesprek',
        text: 'Alvorens we starten vraag ik u een eetverslag bij te houden en krijgt u de behandelingsovereenkomst per mail. Het intakegesprek duurt ongeveer 45 tot 60 minuten. We nemen uw situatie, voedingspatroon en leefstijl uitgebreid door.',
      },
      {
        heading: 'Lichaamsmetingen',
        text: 'Ik doe lichaamsmetingen met de InBody-weegschaal. Deze meet nauwkeurig uw gewicht, vetpercentage, vochthuishouding en spiermassa. Ook doe ik een tailleomtrekmeting en bespreek ik uw laboratoriumuitslagen, als die beschikbaar zijn.',
      },
      {
        heading: 'Vervolggesprek',
        text: 'Het vervolggesprek duurt ongeveer 15 tot 30 minuten. We evalueren de behandeling en er is ruimte voor vragen. Hoe snel het vervolggesprek wordt gepland, hangt af van uw situatie en uw wensen.',
      },
      {
        heading: 'Uw privacy',
        text: 'Uw privacy wordt gewaarborgd en uw gegevens worden niet verstrekt aan andere partijen. Hiervoor vult u vóór de behandeling plaatsvindt de behandelingsovereenkomst in.',
      },
    ],
  },
  vergoeding: {
    title: 'Vergoeding en consulten',
    intro: 'Informatie over vergoeding, consultduur en tarieven.',
    sections: [
      { heading: 'Vergoeding', text: 'In 2026 wordt dieetadvisering door de zorgverzekeraar vergoed vanuit de basisverzekering voor maximaal 3 uur. Hierbij dien je rekening te houden met het wettelijk en eventueel vrijwillig eigen risico. Daarnaast bieden sommige verzekeraars een extra vergoeding aan in het aanvullende pakket. Voor kinderen tot 18 jaar geldt in de basisverzekering geen eigen risico.' },
      { heading: 'Verwijzing en ketenzorg', text: 'De meeste zorgverzekeraars stellen een verwijzing door een arts als voorwaarde om voor vergoeding van de kosten in aanmerking te komen. Kijk dit na in je eigen polisvoorwaarden. Wanneer dieetadvisering onderdeel uitmaakt van ketenzorg, zoals bij Diabetes type 2, CVRM en COPD, geldt geen eigen risico. Je huisarts of praktijkondersteuner kan vertellen of je onder ketenzorg valt.' },
      { heading: 'Tarieven', text: 'Voor niet-gecontracteerde zorg, of wanneer de zorgverzekeraar geen vergoeding meer biedt, hanteren wij een tarief van €23,75 per 15 minuten consult.' },
      { heading: 'Consulten', text: 'De hieronder genoemde tijd voor de consulten is een richtlijn. Neem contact met ons op om je situatie en wensen te bespreken en te komen tot een plan op maat. Eerste consult: gemiddeld 60 minuten, exclusief uitwerktijd. Vervolgconsult: 15 tot 45 minuten. Bij een huisbezoek rekenen wij een toeslag van €23,50.' },
    ],
  },
  contact: {
    title: 'Contact',
    intro: 'Heeft u vragen over voeding, leefstijl of een begeleidingstraject?',
    sections: [
      {
        heading: 'Neem contact op',
        text: 'U kunt contact met mij opnemen via de website van de Voedingsadviesgroep. Via deze website kunt u zich ook bij mij aanmelden.',
      },
      {
        heading: 'Aanmelden',
        text: 'U kunt zonder verwijzing bij mij terecht. Soms kan het handig zijn om een verwijzing te vragen, omdat hier relevante gegevens op staan, zoals medicatiegebruik en laboratoriumuitslagen.',
      },
      {
        heading: 'Praktijkgegevens',
        text: 'KVK-nummer: 55590349',
      },
    ],
  },
}

function App() {
  const [activePage, setActivePage] = useState<PageKey>(() => {
    const page = window.location.hash.slice(1) as PageKey
    return page in pages || page === 'home' ? page : 'home'
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoLayerRef = useRef<HTMLDivElement>(null)

  const navigate = (page: PageKey) => {
    window.location.hash = page === 'home' ? 'home' : page
    setActivePage(page)
  }

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.slice(1) as PageKey
      setActivePage(page in pages || page === 'home' ? page : 'home')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const videoLayer = videoLayerRef.current

    if (!video || !videoLayer) return

    let animationFrame = 0
    let restartTimeout: number | undefined

    const setOpacity = (opacity: number) => {
      videoLayer.style.opacity = String(Math.max(0, Math.min(1, opacity)))
    }

    const monitorVideo = () => {
      const { currentTime, duration } = video

      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < 0.5) {
          setOpacity(currentTime / 0.5)
        } else if (duration - currentTime < 0.5) {
          setOpacity((duration - currentTime) / 0.5)
        } else {
          setOpacity(1)
        }
      }

      animationFrame = requestAnimationFrame(monitorVideo)
    }

    const restartVideo = () => {
      setOpacity(0)
      restartTimeout = window.setTimeout(() => {
        video.currentTime = 0
        void video.play().catch(() => undefined)
      }, 100)
    }

    video.addEventListener('ended', restartVideo)
    animationFrame = requestAnimationFrame(monitorVideo)
    void video.play().catch(() => undefined)

    return () => {
      cancelAnimationFrame(animationFrame)
      video.removeEventListener('ended', restartVideo)
      if (restartTimeout !== undefined) window.clearTimeout(restartTimeout)
    }
  }, [])

  return (
    <main className="relative m-2 min-h-[calc(100vh-1rem)] w-[calc(100%-1rem)] overflow-hidden rounded-[22px] bg-white">
      <div
        ref={videoLayerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[235px] z-0 overflow-hidden opacity-0 transition-opacity duration-150"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-background" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-10 py-4">
        <div className="flex flex-col items-start">
          <a href="index.html" className="font-display text-xl tracking-tight text-black sm:text-2xl">
            Marleen van Valkenhoef
          </a>
          <img
            src={portraitUrl}
            alt="Marleen van Valkenhoef"
            className="mt-2 h-24 w-24 rounded-full object-cover opacity-[0.68] sm:h-28 sm:w-28"
          />
        </div>

        <div className="flex items-baseline gap-3 sm:gap-6">
          <a href="index.html" className={`text-xs transition-colors sm:text-base ${activePage === 'home' ? 'text-black' : 'text-[#6F6F6F] hover:text-black'}`}>
            Home
          </a>
          <a href="specialisaties.html" className={`text-xs transition-colors sm:text-base ${activePage === 'specialisaties' ? 'text-black' : 'text-[#6F6F6F] hover:text-black'}`}>
            Specialisaties
          </a>
          <a href="over-mij.html" className={`text-xs transition-colors sm:text-base ${activePage === 'over-mij' ? 'text-black' : 'text-[#6F6F6F] hover:text-black'}`}>
            Over mij
          </a>
          <a href="werkwijze.html" className={`text-xs transition-colors sm:text-base ${activePage === 'werkwijze' ? 'text-black' : 'text-[#6F6F6F] hover:text-black'}`}>
            Werkwijze
          </a>
          <a href="vergoeding.html" className={`text-xs transition-colors sm:text-base ${activePage === 'vergoeding' ? 'text-black' : 'text-[#6F6F6F] hover:text-black'}`}>
            Vergoeding
          </a>
          <a href="contact.html" className={`text-xs transition-colors sm:text-base ${activePage === 'contact' ? 'text-black' : 'text-[#6F6F6F] hover:text-black'}`}>
            Contact
          </a>
          <a
            href="https://www.voedingsadviesgroep.nl/ons-team/marleen-van-valkenhoef/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-black px-4 py-2 text-xs !text-white transition-transform hover:scale-[1.03] sm:text-sm"
          >
            Aanmelden
          </a>
        </div>

      </nav>

      {activePage === 'home' ? <section
        id="home"
        className="relative z-10 flex flex-col items-center px-6 pb-40 pt-6 text-center"
      >
        <h1 className="animate-fade-rise max-w-7xl font-display text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-black sm:text-6xl md:text-7xl">
          Uw <em className="font-normal not-italic text-[#6F6F6F]">diëtist</em> in Vianen.
        </h1>
        <p className="animate-fade-rise-delay mt-6 max-w-2xl text-lg leading-relaxed text-[#6F6F6F] sm:text-xl">
          Persoonlijke voedingsbegeleiding en leefstijlcoaching, evidence based en afgestemd op wat bij u past.
        </p>
        <a
          id="aanmelden"
          href="https://www.voedingsadviesgroep.nl/ons-team/marleen-van-valkenhoef/"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-rise-delay-2 mt-12 rounded-full bg-black px-10 py-3.5 text-sm text-white transition-transform hover:scale-[1.03]"
        >
          Aanmelden
        </a>
      </section> : <section className="relative z-10 mx-auto max-w-4xl px-6 pb-32 pt-8">
        <article className="rounded-[22px] border border-black/20 bg-white/95 px-7 py-9 text-left shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:px-12 sm:py-12">
          <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[#6F6F6F]">Diëtist Vianen</p>
          <h1 className="font-display text-5xl font-normal leading-none tracking-[-1.5px] text-black sm:text-7xl">{pages[activePage].title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6F6F6F]">{pages[activePage].intro}</p>
          <div className="mt-10 space-y-8">
            {pages[activePage].sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl font-normal text-black">{section.heading}</h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[#444444]">{section.text}</p>
                {activePage === 'contact' && section.heading === 'Neem contact op' && <a className="mt-6 inline-flex rounded-full bg-black px-10 py-4 text-sm text-white transition-transform hover:scale-[1.03]" href="https://www.voedingsadviesgroep.nl/ons-team/marleen-van-valkenhoef/" target="_blank" rel="noopener noreferrer">Contact</a>}
              </section>
            ))}
          </div>
          {activePage === 'contact' && <a className="mt-10 inline-flex rounded-full bg-black px-10 py-4 text-sm text-white transition-transform hover:scale-[1.03]" href="https://www.voedingsadviesgroep.nl/ons-team/marleen-van-valkenhoef/" target="_blank" rel="noopener noreferrer">Aanmelden</a>}
        </article>
      </section>}

      <footer className="absolute bottom-5 left-0 right-0 z-10 px-6 text-center">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          <a className="text-xs text-black/60 transition-colors hover:text-black sm:text-sm" href="https://www.voedingsadviesgroep.nl/algemene-voorwaarden/" target="_blank" rel="noopener noreferrer">Algemene voorwaarden</a>
          <a className="text-xs text-black/60 transition-colors hover:text-black sm:text-sm" href="https://www.voedingsadviesgroep.nl/klachtenregeling/" target="_blank" rel="noopener noreferrer">Klachtenregeling</a>
          <a className="text-xs text-black/60 transition-colors hover:text-black sm:text-sm" href="https://www.voedingsadviesgroep.nl/privacyverklaring/" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a className="text-xs text-black/60 transition-colors hover:text-black sm:text-sm" href="https://www.sales-architects.nl/" target="_blank" rel="noopener noreferrer">Webdesign</a>
        </nav>
      </footer>
    </main>
  )
}

export default App
