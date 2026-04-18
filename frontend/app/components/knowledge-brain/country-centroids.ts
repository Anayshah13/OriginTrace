/**
 * Approximate country / region centroids for mapping suppliers from trade graph
 * `country` strings (lng, lat). Multi-region strings use an average of segments.
 */

const KNOWN: Record<string, [number, number]> = {
  usa: [-98.5, 39.8],
  'united states': [-98.5, 39.8],
  japan: [138.25, 36.2],
  china: [104.2, 35.9],
  france: [2.2, 46.2],
  'south korea': [127.8, 35.9],
  korea: [127.8, 35.9],
  germany: [10.45, 51.2],
  luxembourg: [6.13, 49.6],
  chile: [-71.5, -35.7],
  australia: [133.8, -25.3],
  uk: [-3.4, 55.4],
  'united kingdom': [-3.4, 55.4],
  brazil: [-51.9, -14.2],
  switzerland: [8.2, 46.8],
  sweden: [18.1, 59.3],
  finland: [25.7, 61.9],
  denmark: [9.5, 56.3],
  belgium: [4.5, 50.5],
  netherlands: [5.3, 52.1],
  norway: [8.5, 60.5],
  ireland: [-8.2, 53.4],
  russia: [37.6, 55.8],
  eu: [10.5, 50.5],
  indonesia: [113.9, -0.8],
  drc: [23.6, -2.5],
  'democratic republic of the congo': [23.6, -2.5],
};

function hash01(id: string, salt: string): number {
  const s = `${id}:${salt}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 2 ** 32;
}

function normalizeToken(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[,]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function lookupOne(token: string): [number, number] | null {
  const t = normalizeToken(token);
  if (KNOWN[t]) return KNOWN[t];
  if (t.includes('usa') || t.includes('united states')) return KNOWN.usa;
  if (t.includes('japan')) return KNOWN.japan;
  if (t.includes('china')) return KNOWN.china;
  if (t.includes('korea')) return KNOWN['south korea'];
  if (t.includes('germany')) return KNOWN.germany;
  if (t.includes('luxembourg')) return KNOWN.luxembourg;
  if (t.includes('chile')) return KNOWN.chile;
  if (t.includes('australia')) return KNOWN.australia;
  if (t === 'uk' || t.includes('united kingdom')) return KNOWN.uk;
  if (t.includes('brazil')) return KNOWN.brazil;
  if (t.includes('switzerland')) return KNOWN.switzerland;
  if (t.includes('sweden')) return KNOWN.sweden;
  if (t.includes('finland')) return KNOWN.finland;
  if (t.includes('denmark')) return KNOWN.denmark;
  if (t.includes('belgium')) return KNOWN.belgium;
  if (t.includes('netherlands')) return KNOWN.netherlands;
  if (t.includes('norway')) return KNOWN.norway;
  if (t.includes('ireland')) return KNOWN.ireland;
  if (t.includes('russia')) return KNOWN.russia;
  if (t === 'eu' || t.includes('european')) return KNOWN.eu;
  if (t.includes('indonesia')) return KNOWN.indonesia;
  if (t.includes('drc') || t.includes('congo')) return KNOWN.drc;
  if (t.includes('france')) return KNOWN.france;
  return null;
}

/** Small jitter so many nodes in the same country remain visually separable. */
export function getLngLatForSupplyNode(
  country: string,
  nodeId: string
): { lng: number; lat: number } {
  const segments = country
    .split(/\s*\/\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const resolved: [number, number][] = [];
  for (const seg of segments) {
    const c = lookupOne(seg);
    if (c) resolved.push(c);
  }

  let lng: number;
  let lat: number;
  if (resolved.length === 0) {
    lng = -25;
    lat = 18;
  } else {
    lng = resolved.reduce((a, p) => a + p[0], 0) / resolved.length;
    lat = resolved.reduce((a, p) => a + p[1], 0) / resolved.length;
  }

  const jx = (hash01(nodeId, 'geo-x') - 0.5) * 5.5;
  const jy = (hash01(nodeId, 'geo-y') - 0.5) * 4.2;
  return { lng: lng + jx, lat: lat + jy };
}
