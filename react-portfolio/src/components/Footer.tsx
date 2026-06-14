import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { aggregateInsights, davao } from '../variables'
import { divIcon } from 'leaflet'
import React, { useMemo } from 'react'


export const Footer : React.FC = () => {
	const pulseIcon = useMemo(
		() =>
		divIcon({
			className: 'pulse-marker',
			html: '<span class="pulse-dot"></span>',
			iconSize: [22, 22],
			iconAnchor: [11, 11],
		}),
		[],
	)
  
    return (
		<section id="contact" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.24s' }}>
			<div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
				<div>
				<h2 className="font-display text-2xl font-semibold md:text-3xl">Contact</h2>
				<p className="mt-2 text-slate-300">
					If you have questions about my skills and experience, let us connect.
				</p>
				<div className="mt-5 grid gap-2 text-slate-100 md:text-lg">
					<a href="mailto:tubianojames@gmail.com" className="underline decoration-orange-300/70 underline-offset-4">
					tubianojames@gmail.com
					</a>
					<p>Anywhere in Davao City, PH</p>
				</div>
				</div>

				<div className="space-y-3">
				<div className="relative overflow-hidden rounded-2xl border border-white/10">
					<div className="pointer-events-none absolute inset-0 z-[401] bg-gradient-to-t from-[#090c16]/35 to-transparent" />
					<MapContainer
					center={davao}
					zoom={12}
					scrollWheelZoom={false}
					className="h-[320px] w-full"
					>
					<TileLayer
						attribution='&copy; OpenStreetMap contributors &copy; CARTO'
						url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
					/>
					<Marker position={davao} icon={pulseIcon}>
						<Popup>
						Davao City, Philippines<br />Available for remote and freelance work.
						</Popup>
					</Marker>
					</MapContainer>
				</div>

				<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
					<div className="flex items-start gap-3">
					<img
						src="images/profile-img.jpeg"
						alt="James Tubiano"
						className="h-16 w-16 rounded-xl object-cover ring-1 ring-white/20"
					/>
					<div>
						<p className="font-display text-sm font-semibold text-white">James Tubiano</p>
						<p className="text-xs text-slate-300">Senior .NET Engineer | React Frontend Contributor</p>
						<p className="mt-1 text-xs text-slate-400">Summary insights from recommendations</p>
					</div>
					</div>

					<div className="mt-3">
					<p className="text-[11px] tracking-[0.16em] text-slate-400 uppercase">Strongest Themes</p>
					<div className="mt-2 flex flex-wrap gap-1.5">
						{aggregateInsights.strongestThemes.slice(0, 6).map((theme) => (
						<span key={theme} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-100">
							{theme}
						</span>
						))}
					</div>
					</div>

					<div className="mt-3">
					<p className="text-[11px] tracking-[0.16em] text-slate-400 uppercase">Career Signals</p>
					<ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
						{aggregateInsights.careerSignals.slice(0, 4).map((signal) => (
						<li key={signal}>{signal}</li>
						))}
					</ul>
					</div>
				</div>
				</div>
			</div>
		</section>
)
}