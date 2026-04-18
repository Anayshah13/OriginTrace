'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Edge, Node } from '@xyflow/react';
import Mapbox, {
  Layer,
  Marker,
  NavigationControl,
  Source,
  type MapRef,
} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getLngLatForSupplyNode } from './country-centroids';
import { tierAccent, type SupplyNodeData } from './supply-chain-data';

export type MapPathHighlight = {
  edgeIds: Set<string>;
  nodeIds: Set<string>;
};

export type SupplyChainMapViewProps = {
  nodes: Node<SupplyNodeData>[];
  edges: Edge[];
  rootId: string;
  hoveredId: string | null;
  selectedId: string | null;
  query: string;
  pathHighlight: MapPathHighlight | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
};

const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11';

function useMapToken(): string {
  return process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
}

function SupplyChainMapViewInner({
  nodes,
  edges,
  rootId,
  hoveredId,
  selectedId,
  query,
  pathHighlight,
  onHoverNode,
  onSelectNode,
}: SupplyChainMapViewProps) {
  const token = useMapToken();
  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState(false);

  const posById = useMemo(() => {
    const m = new Map<string, { lng: number; lat: number }>();
    for (const n of nodes) {
      m.set(n.id, getLngLatForSupplyNode(n.data.country, n.id));
    }
    return m;
  }, [nodes]);

  const tierById = useMemo(() => {
    const m = new Map<string, number>();
    for (const n of nodes) m.set(n.id, n.data.tier);
    return m;
  }, [nodes]);

  const initialBounds = useMemo(() => {
    const pts = [...posById.values()];
    if (pts.length === 0) {
      return [
        [-170, -55],
        [170, 70],
      ] as [[number, number], [number, number]];
    }
    const lngs = pts.map((p) => p.lng);
    const lats = pts.map((p) => p.lat);
    const padX = Math.max(8, (Math.max(...lngs) - Math.min(...lngs)) * 0.12);
    const padY = Math.max(6, (Math.max(...lats) - Math.min(...lats)) * 0.15);
    return [
      [Math.min(...lngs) - padX, Math.min(...lats) - padY],
      [Math.max(...lngs) + padX, Math.max(...lats) + padY],
    ] as [[number, number], [number, number]];
  }, [posById]);

  const edgeGeoJson = useMemo(() => {
    const q = query.trim().toLowerCase();
    const active = !!hoveredId && pathHighlight;
    const hiE = pathHighlight?.edgeIds;

    type LineFeature = {
      type: 'Feature';
      id: string;
      properties: { color: string; opacity: number; lineWidth: number };
      geometry: { type: 'LineString'; coordinates: number[][] };
    };

    const raw = edges.map((e): LineFeature | null => {
      const p0 = posById.get(String(e.source));
      const p1 = posById.get(String(e.target));
      if (!p0 || !p1) return null;
      const targetTier = tierById.get(String(e.target)) ?? 1;
      const color = tierAccent(targetTier);

      const n = nodes.find((x) => x.id === e.target);
      const hay = n
        ? [n.data.label, n.data.country, n.data.hsnCode, n.data.commodity, n.data.about]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
        : '';
      const searchDim = q.length > 0 && !hay.includes(q);

      let opacity: number;
      let lineWidth: number;
      if (searchDim) {
        opacity = 0.06;
        lineWidth = 0.6;
      } else if (!active) {
        opacity = 0.42;
        lineWidth = 1.25;
      } else if (hiE?.has(e.id)) {
        opacity = 0.95;
        lineWidth = 3.4;
      } else {
        opacity = 0.1;
        lineWidth = 0.9;
      }

      return {
        type: 'Feature' as const,
        id: e.id,
        properties: { color, opacity, lineWidth },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [p0.lng, p0.lat],
            [p1.lng, p1.lat],
          ],
        },
      };
    });

    const features = raw.filter((f): f is LineFeature => f !== null);

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, [edges, nodes, posById, tierById, hoveredId, pathHighlight, query]);

  const flyToNode = useCallback(
    (id: string) => {
      const p = posById.get(id);
      const map = mapRef.current?.getMap();
      if (!p || !map) return;
      const tier = tierById.get(id) ?? 0;
      const zoom = Math.min(6.2, 2.85 + tier * 0.22);
      map.stop();
      map.flyTo({
        center: [p.lng, p.lat],
        zoom,
        duration: 900,
        curve: 1.35,
        essential: true,
      });
    },
    [posById, tierById]
  );

  useEffect(() => {
    if (!mapReady || !selectedId) return;
    flyToNode(selectedId);
  }, [mapReady, selectedId, flyToNode]);

  const onMapLoad = useCallback(() => {
    setMapReady(true);
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.resize();
    try {
      map.fitBounds(initialBounds, { padding: 56, maxZoom: 4.2, duration: 0 });
    } catch {
      /* ignore */
    }
  }, [initialBounds]);

  const sortedMarkers = useMemo(() => {
    const sel = selectedId;
    const withSel = nodes.filter((n) => n.id === sel);
    const rest = nodes.filter((n) => n.id !== sel);
    return [...rest, ...withSel];
  }, [nodes, selectedId]);

  if (!token) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#06080c] px-6 text-center">
        <p className="text-sm font-medium text-zinc-300">Mapbox token missing</p>
        <p className="max-w-md text-xs leading-relaxed text-zinc-500">
          Set <span className="font-mono text-zinc-400">MAPBOX_API_KEY</span> in{' '}
          <span className="font-mono text-zinc-400">frontend/.env</span>. It is
          forwarded to the browser as{' '}
          <span className="font-mono text-zinc-400">NEXT_PUBLIC_MAPBOX_TOKEN</span>{' '}
          via <span className="font-mono text-zinc-400">next.config.ts</span>, then
          restart <span className="font-mono text-zinc-400">next dev</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full min-h-0 bg-[#06080c]">
      <Mapbox
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle={MAP_STYLE}
        attributionControl
        reuseMaps
        initialViewState={{
          bounds: initialBounds,
          fitBoundsOptions: { padding: 64, maxZoom: 4.25 },
        }}
        style={{ width: '100%', height: '100%' }}
        dragRotate={false}
        pitchWithRotate={false}
        onLoad={onMapLoad}
        onClick={() => onHoverNode(null)}
      >
        <NavigationControl position="top-right" showCompass={false} />

        <Source id="supply-edges" type="geojson" data={edgeGeoJson}>
          <Layer
            id="supply-edge-line"
            type="line"
            layout={{
              'line-cap': 'round',
              'line-join': 'round',
            }}
            paint={{
              'line-color': ['get', 'color'],
              'line-opacity': ['get', 'opacity'],
              'line-width': ['get', 'lineWidth'],
            }}
          />
        </Source>

        {sortedMarkers.map((n) => {
          const p = posById.get(n.id);
          if (!p) return null;
          const d = n.data;
          const q = query.trim().toLowerCase();
          const hay = [d.label, d.country, d.hsnCode, d.commodity, d.about]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          const searchDim = q.length > 0 && !hay.includes(q);

          const pathOn = !!(pathHighlight?.nodeIds.has(n.id));
          const selected = n.id === selectedId;
          const isRoot = n.id === rootId;

          const baseOpacity = searchDim ? 0.14 : 1;
          const scale =
            selected ? 1.12 : pathOn ? 1.06 : hoveredId === n.id ? 1.04 : 1;

          return (
            <Marker
              key={n.id}
              longitude={p.lng}
              latitude={p.lat}
              anchor="center"
            >
              <button
                type="button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  onSelectNode(n.id);
                }}
                onMouseEnter={() => onHoverNode(n.id)}
                onMouseLeave={() => onHoverNode(null)}
                className="relative flex cursor-pointer flex-col items-center outline-none"
                style={{
                  opacity: baseOpacity,
                  transform: `scale(${scale})`,
                  transition:
                    'transform 0.25s ease, opacity 0.2s ease, box-shadow 0.25s ease',
                }}
                aria-label={`${d.label}, tier ${d.tier}`}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full blur-md transition-opacity duration-300"
                  style={{
                    background: d.accentColor,
                    opacity: pathOn ? 0.85 : selected ? 0.55 : 0.25,
                  }}
                />
                <span
                  className="relative flex size-4 items-center justify-center rounded-full border-[2.5px] shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:size-[18px]"
                  style={{
                    borderColor: pathOn
                      ? d.accentColor
                      : selected
                        ? d.accentColor
                        : 'rgba(255,255,255,0.18)',
                    background: 'linear-gradient(180deg, #141820 0%, #0a0c10 100%)',
                    boxShadow: pathOn
                      ? `0 0 22px ${d.accentColor}66, inset 0 0 12px ${d.accentColor}22`
                      : selected
                        ? `0 0 18px ${d.accentColor}44`
                        : undefined,
                  }}
                >
                  <span
                    className="rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                    style={{
                      width: isRoot ? 9 : 6,
                      height: isRoot ? 9 : 6,
                    }}
                  />
                </span>
                <span className="mt-1 max-w-[120px] truncate rounded bg-black/55 px-1 py-0.5 text-[8px] font-semibold text-white/95 backdrop-blur-sm sm:max-w-[140px] sm:text-[9px]">
                  {d.label}
                </span>
              </button>
            </Marker>
          );
        })}
      </Mapbox>
    </div>
  );
}

export default function SupplyChainMapView(props: SupplyChainMapViewProps) {
  return <SupplyChainMapViewInner {...props} />;
}
