import React, { useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { Compass, Copy, Check, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { RevealText } from './BotanicalEffects';

interface LatLngPoint {
  lat: number;
  lng: number;
}

interface MapPolyline {
  setOptions: (opts: { strokeColor?: string; strokeWeight?: number; strokeOpacity?: number }) => void;
  setMap: (map: unknown) => void;
}

interface VenueMapSectionProps {
  config: InvitationConfig;
  quotaExceeded: boolean;
}

interface RouteOverlayProps {
  origin: string | LatLngPoint | null;
  destination: LatLngPoint;
  onRouteResult: (summary: { distanceKm: string; durationMins: number } | null, errorMsg: string | null) => void;
}

const RouteOverlay: React.FC<RouteOverlayProps> = ({ origin, destination, onRouteResult }) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<MapPolyline[]>([]);

  useEffect(() => {
    if (!routesLib || !map || !origin) return;

    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    const request = {
      origin,
      destination,
      travelMode: 'DRIVING',
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
    };

    let cancelled = false;

    (routesLib.Route as unknown as {
      computeRoutes: (req: typeof request) => Promise<{
        routes?: Array<{
          createPolylines: () => MapPolyline[];
          viewport?: unknown;
          distanceMeters?: number;
          durationMillis?: number;
        }>;
      }>;
    })
      .computeRoutes(request)
      .then(({ routes }) => {
        if (cancelled) return;
        const primaryRoute = routes?.[0];
        if (!primaryRoute) {
          onRouteResult(null, 'Rute tidak ditemukan dari titik keberangkatan tersebut.');
          return;
        }

        const newPolylines = primaryRoute.createPolylines();
        newPolylines.forEach((polyline) => {
          polyline.setOptions({
            strokeColor: '#3a5240',
            strokeWeight: 5,
            strokeOpacity: 0.9,
          });
          polyline.setMap(map);
        });
        polylinesRef.current = newPolylines;

        if (primaryRoute.viewport) {
          (map as unknown as { fitBounds: (bounds: unknown) => void }).fitBounds(primaryRoute.viewport);
        }

        const distanceKm = ((primaryRoute.distanceMeters ?? 0) / 1000).toFixed(1);
        const durationMins = Math.max(1, Math.round((primaryRoute.durationMillis ?? 0) / 60000));
        onRouteResult({ distanceKm, durationMins }, null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('OVER_QUERY_LIMIT') || msg.includes('429')) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onRouteResult(null, 'Rute langsung tidak tersedia saat ini. Gunakan tombol Buka Google Maps di bawah.');
      });

    return () => {
      cancelled = true;
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [routesLib, map, origin, destination, onRouteResult]);

  return null;
};

const VenueMarkerWithInfo: React.FC<{ config: InvitationConfig }> = ({ config }) => {
  const [open, setOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const position = { lat: config.venueLat, lng: config.venueLng };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={() => setOpen((v) => !v)}
        title={config.venueName}
      >
        <Pin background="#3a5240" borderColor="#232b25" glyphColor="#faf8f4" scale={1.15} />
      </AdvancedMarker>
      {open && marker && (
        <InfoWindow anchor={marker} maxWidth={240} onCloseClick={() => setOpen(false)}>
          <div className="text-xs leading-relaxed text-[#232b25]">
            <p className="font-semibold text-[#3a5240]">{config.venueName}</p>
            <p className="mt-1 text-[#525f56]">{config.venueAddress}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const VenueMapSection: React.FC<VenueMapSectionProps> = ({ config, quotaExceeded }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const hasMapsKey = Boolean(apiKey && apiKey.trim().length > 0 && apiKey !== 'MY_GOOGLE_MAPS_API_KEY');

  const [originInput, setOriginInput] = useState('');
  const [activeOrigin, setActiveOrigin] = useState<string | LatLngPoint | null>(null);
  const [routeSummary, setRouteSummary] = useState<{ distanceKm: string; durationMins: number } | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const destination = { lat: config.venueLat, lng: config.venueLng };

  const googleMapsDirUrl = (() => {
    const params = new URLSearchParams({
      api: '1',
      destination: `${config.venueLat},${config.venueLng}`,
    });
    if (typeof activeOrigin === 'string' && activeOrigin.trim()) {
      params.set('origin', activeOrigin.trim());
    } else if (activeOrigin && typeof activeOrigin === 'object') {
      params.set('origin', `${activeOrigin.lat},${activeOrigin.lng}`);
    }
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  })();

  const handleComputeFromInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originInput.trim()) return;
    setRouteError(null);
    setActiveOrigin(originInput.trim());
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setRouteError('Perangkat Anda tidak mendukung deteksi lokasi GPS.');
      return;
    }
    setLocating(true);
    setRouteError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setOriginInput('Lokasi Saya Saat Ini');
        setActiveOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setLocating(false);
        setRouteError('Izin lokasi belum diberikan. Anda dapat mengetik titik keberangkatan secara manual.');
      },
      { timeout: 8000 }
    );
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${config.venueName}, ${config.venueAddress}`);
    setCopiedAddress(true);
    window.setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="lokasi" className="px-6 sm:px-10 py-16 sm:py-20 border-t border-[#495d4c]/14">
      <div className="text-center">
        <RevealText variant="fade-down">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a6895b]">
            Rangkaian Acara &amp; Lokasi
          </p>
        </RevealText>
        <RevealText variant="fade-up" delay={90}>
          <h2 className="font-display mt-2.5 text-3xl sm:text-4xl text-[#2b332c] text-balance">
            Jadwal &amp; Petunjuk Arah
          </h2>
        </RevealText>
        <RevealText variant="fade-up" delay={160}>
          <p className="mt-2 text-sm text-[#566157]">
            Dress Code: {config.dressCode}
          </p>
        </RevealText>
      </div>

      {/* Akad & Resepsi botanical double-framed cards */}
      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <RevealText variant="slide-left" delay={80}>
          <article className="botanical-double-frame p-6 text-center h-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a6895b]">
              Prosesi Suci
            </p>
            <h3 className="font-display mt-1.5 text-3xl text-[#2b332c]">{config.akadTitle}</h3>
            <div className="mt-4 space-y-1.5 text-sm text-[#566157]">
              <p className="font-medium text-[#2b332c]">
                {config.akadDateDisplay ?? config.eventDateDisplay}
              </p>
              <p className="tabular-nums font-medium text-[#495d4c]">{config.akadTime}</p>
              <p className="text-xs leading-relaxed pt-1">{config.akadVenue}</p>
            </div>
          </article>
        </RevealText>

        <RevealText variant="slide-right" delay={140}>
          <article className="botanical-double-frame p-6 text-center h-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a6895b]">
              Ramah Tamah
            </p>
            <h3 className="font-display mt-1.5 text-3xl text-[#2b332c]">{config.resepsiTitle}</h3>
            <div className="mt-4 space-y-1.5 text-sm text-[#566157]">
              <p className="font-medium text-[#2b332c]">
                {config.resepsiDateDisplay ?? config.eventDateDisplay}
              </p>
              <p className="tabular-nums font-medium text-[#495d4c]">{config.resepsiTime}</p>
              <p className="text-xs leading-relaxed pt-1">{config.resepsiVenue}</p>
            </div>
          </article>
        </RevealText>
      </div>

      {/* Integrated Google Maps Card */}
      <RevealText variant="fade-up" delay={120}>
        <div className="mt-7 botanical-card overflow-hidden">
        <div className="relative h-[320px] sm:h-[360px] w-full bg-[#ece6da]">
          {hasMapsKey && !quotaExceeded ? (
            <APIProvider apiKey={apiKey!} libraries={['marker', 'routes']} language="id" region="ID">
              <GoogleMap
                mapId="DEMO_MAP_ID"
                defaultCenter={destination}
                defaultZoom={16}
                gestureHandling="cooperative"
                mapTypeControl={false}
                streetViewControl={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="h-full w-full"
              >
                <VenueMarkerWithInfo config={config} />
                {activeOrigin && (
                  <RouteOverlay
                    origin={activeOrigin}
                    destination={destination}
                    onRouteResult={(summary, err) => {
                      setRouteSummary(summary);
                      setRouteError(err);
                    }}
                  />
                )}
              </GoogleMap>
            </APIProvider>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#495d4c]/20 bg-white text-[#495d4c]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-display mt-3 text-2xl text-[#2b332c]">{config.venueName}</p>
              <p className="mt-1 max-w-sm text-xs text-[#566157]">{config.venueAddress}</p>
              <p className="mt-2 text-[11px] text-[#7c877d]">
                {quotaExceeded
                  ? 'Tampilan peta langsung sedang membatasi kuota. Gunakan tombol Petunjuk Arah di bawah.'
                  : 'Tambahkan VITE_GOOGLE_MAPS_API_KEY di pengaturan hosting atau klik tombol Petunjuk Arah.'}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#495d4c] shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="font-display text-2xl text-[#2b332c]">{config.venueName}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#566157]">{config.venueAddress}</p>
              <p className="mt-1 text-xs text-[#7c877d] tabular-nums">
                Koordinat: {config.venueLat.toFixed(5)}, {config.venueLng.toFixed(5)}
              </p>
            </div>
          </div>

          {hasMapsKey && !quotaExceeded && (
            <form onSubmit={handleComputeFromInput} className="mt-5 space-y-2.5 border-t border-[#495d4c]/12 pt-5">
              <label htmlFor="route-origin" className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#566157]">
                Cek Rute Perjalanan
              </label>
              <div className="flex gap-2">
                <input
                  id="route-origin"
                  type="text"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  placeholder="Asal keberangkatan (mis. Stasiun Gambir)"
                  className="w-full rounded-lg border border-[#495d4c]/20 bg-[#f8f5ee] px-3.5 py-2 text-sm text-[#2b332c] placeholder:text-[#7c877d] focus:border-[#495d4c] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#495d4c] px-4 py-2 text-xs font-medium text-white hover:bg-[#364739] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Cek Rute
                </button>
              </div>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={locating}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#495d4c] hover:underline cursor-pointer disabled:opacity-60"
              >
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{locating ? 'Mendeteksi lokasi GPS...' : 'Gunakan Lokasi Saya Saat Ini'}</span>
              </button>

              {routeSummary && (
                <div className="rounded-lg bg-[#f3efe6] px-4 py-2.5 text-xs text-[#2b332c] tabular-nums">
                  Estimasi berkendara: <span className="font-semibold">{routeSummary.distanceKm} km</span> ·{' '}
                  <span className="font-semibold">{routeSummary.durationMins} menit</span>
                </div>
              )}
              {routeError && <p className="text-xs text-[#9e473a]">{routeError}</p>}
            </form>
          )}

          <div className="mt-5 pt-5 border-t border-[#495d4c]/12 flex flex-wrap gap-3">
            <a
              href={googleMapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#495d4c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#364739] transition-colors whitespace-nowrap shrink-0"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              <span>Buka Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-2 rounded-lg border border-[#495d4c]/25 bg-white px-4 py-2.5 text-sm font-medium text-[#495d4c] hover:bg-[#f3efe6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedAddress ? (
                <>
                  <Check className="h-4 w-4 text-[#495d4c]" aria-hidden="true" />
                  <span>Alamat Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      </RevealText>
    </section>
  );
};
