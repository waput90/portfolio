import { useEffect, useRef, useState } from "react"

const COMMAND = "who-am-i"

type Phase = "typing" | "output" | "pause"

interface TerminalWhoAmIProps {
  yearsOfExp: number
}

export const TerminalWhoAmI: React.FC<TerminalWhoAmIProps> = ({ yearsOfExp }) => {
  
  const OUTPUT_LINES = [
    { label: "Name",         value: "James Tubiano" },
    { label: "Role",         value: "Senior .NET Engineer | React Developer" },
    { label: "Location",     value: "Davao City, Philippines" },
    { label: "Experience",   value: `${yearsOfExp}+ yrs — Production-grade full-stack` },
    { label: "Stack",        value: "C#  .NET Core  React  Angular" },
    { label: "Email",        value: "tubianojames@gmail.com" },
  ]

  const [typedCmd, setTypedCmd]       = useState("")
  const [showOutput, setShowOutput]   = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [phase, setPhase]             = useState<Phase>("typing")
  const timerRef                      = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  const reset = () => {
    setTypedCmd("")
    setShowOutput(false)
    setVisibleLines(0)
    setPhase("typing")
  }

  useEffect(() => {
    if (phase !== "typing") return
    if (typedCmd.length < COMMAND.length) {
      timerRef.current = setTimeout(
        () => setTypedCmd(COMMAND.slice(0, typedCmd.length + 1)),
        80 + Math.random() * 40,
      )
      return clear
    }
    timerRef.current = setTimeout(() => {
      setShowOutput(true)
      setPhase("output")
    }, 380)
    return clear
  }, [phase, typedCmd])

  useEffect(() => {
    if (phase !== "output") return
    if (visibleLines < OUTPUT_LINES.length) {
      timerRef.current = setTimeout(() => setVisibleLines((n) => n + 1), 90)
      return clear
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("pause")
  }, [OUTPUT_LINES.length, phase, visibleLines])

  useEffect(() => {
    if (phase !== "pause") return
    const delay = 15000 + Math.random() * 5000
    timerRef.current = setTimeout(reset, delay)
    return clear
  }, [phase])

  return (
    <div
      className="animate-fade-up mt-4 w-full h-80 max-w-md overflow-hidden rounded-xl border border-white/15 bg-[#0d1117] shadow-2xl"
      style={{ animationDelay: "0.2s", fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace" }}
    >
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#161b22] px-3 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 text-center text-[11px] tracking-wide text-slate-400 select-none">
          james@portfolio — bash
        </span>
      </div>

      {/* terminal body */}
      <div className="p-4 text-[13px] leading-relaxed md:text-sm">
        {/* prompt + typed command */}
        <p className="flex flex-wrap items-center gap-x-1 text-slate-300" aria-live="polite">
          <span className="text-[#58a6ff]">james</span>
          <span className="text-slate-500">@</span>
          <span className="text-[#f9826c]">portfolio</span>
          <span className="text-slate-500">:~$</span>
          <span className="text-[#56d364]">&nbsp;{typedCmd}</span>
          {phase === "typing" && (
            <span className="inline-block h-[1.1em] w-[0.55em] animate-pulse bg-[#56d364] align-middle" />
          )}
        </p>

        {/* output lines */}
        {showOutput && (
          <div className="mt-1.5 space-y-0.5">
            {OUTPUT_LINES.slice(0, visibleLines).map((line) => (
              <p key={line.label} className="flex gap-2 text-slate-300">
                <span className="w-[90px] shrink-0 text-[#8b949e]">{line.label}:</span>
                <span className="text-[#e6edf3]">{line.value}</span>
              </p>
            ))}
          </div>
        )}

        {/* idle blinking cursor after full output */}
        {phase === "pause" && (
          <p className="mt-2 flex items-center gap-x-1 text-slate-300">
            <span className="text-[#58a6ff]">james</span>
            <span className="text-slate-500">@</span>
            <span className="text-[#f9826c]">portfolio</span>
            <span className="text-slate-500">:~$</span>
            <span className="inline-block h-[1.1em] w-[0.55em] animate-pulse bg-[#56d364] align-middle" />
          </p>
        )}
      </div>
    </div>
  )
}
