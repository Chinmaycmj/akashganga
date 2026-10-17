import { NextResponse } from 'next/server';
import { COSMIC_STAGES } from '@/data/cosmicStages';
import { ATLAS_TOPICS } from '@/data/atlasTopics';
import { CELESTIAL_OBJECTS } from '@/data/celestialObjects';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { NAVAGRAHAS } from '@/data/navagrahasData';
import { RASHIS, NAKSHATRAS } from '@/data/rashiNakshatraData';
import { CURRICULUM_STAGES } from '@/data/curriculumData';
import { TEXTUAL_SOURCES } from '@/data/textualLibraryData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results: Array<{
    type: 'stage' | 'topic' | 'object' | 'glossary' | 'navagraha' | 'rashi' | 'nakshatra' | 'curriculum' | 'source';
    id: string | number;
    title: string;
    subtitle: string;
    url: string;
    status?: string;
  }> = [];

  // 1. Cosmic Stages
  COSMIC_STAGES.forEach(s => {
    if (
      s.title.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'stage',
        id: s.id,
        title: `Stage ${s.id}: ${s.title}`,
        subtitle: s.subtitle,
        url: `/journey?stage=${s.id}`,
        status: s.scientificStatus,
      });
    }
  });

  // 2. Navagrahas
  NAVAGRAHAS.forEach(g => {
    if (
      g.sanskritName.toLowerCase().includes(q) ||
      g.englishName.toLowerCase().includes(q) ||
      g.iast.toLowerCase().includes(q) ||
      g.devanagari.includes(q) ||
      g.archetype.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'navagraha',
        id: g.id,
        title: `${g.sanskritName} (${g.englishName})`,
        subtitle: `${g.archetype} • ${g.element}`,
        url: `/navagraha`,
        status: g.epistemicStatus,
      });
    }
  });

  // 3. Rashis & Nakshatras
  RASHIS.forEach(r => {
    if (
      r.name.toLowerCase().includes(q) ||
      r.westernZodiac.toLowerCase().includes(q) ||
      r.devanagari.includes(q)
    ) {
      results.push({
        type: 'rashi',
        id: r.id,
        title: `Rashi: ${r.name} (${r.westernZodiac})`,
        subtitle: `${r.element} • Ruler: ${r.rulingPlanetId.toUpperCase()}`,
        url: `/rashi-nakshatra`,
        status: 'Traditional Jyotisha Rule',
      });
    }
  });

  NAKSHATRAS.forEach(n => {
    if (
      n.name.toLowerCase().includes(q) ||
      n.deity.toLowerCase().includes(q) ||
      n.associatedStars.toLowerCase().includes(q) ||
      n.devanagari.includes(q)
    ) {
      results.push({
        type: 'nakshatra',
        id: n.id,
        title: `Nakshatra #${n.id}: ${n.name}`,
        subtitle: `Deity: ${n.deity} • ${n.associatedStars}`,
        url: `/rashi-nakshatra`,
        status: 'Astronomical Observation',
      });
    }
  });

  // 4. Curriculum Stages
  CURRICULUM_STAGES.forEach(c => {
    if (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'curriculum',
        id: c.stageNumber,
        title: `Curriculum Stage ${c.stageNumber}: ${c.title}`,
        subtitle: c.subtitle,
        url: `/curriculum`,
      });
    }
  });

  // 5. Textual Sources
  TEXTUAL_SOURCES.forEach(src => {
    if (
      src.title.toLowerCase().includes(q) ||
      src.authorOrAttribution.toLowerCase().includes(q) ||
      src.chapterVerseLocator.toLowerCase().includes(q) ||
      src.sanskritDevanagari.includes(q)
    ) {
      results.push({
        type: 'source',
        id: src.id,
        title: src.title,
        subtitle: `${src.authorOrAttribution} (${src.chapterVerseLocator})`,
        url: `/library`,
        status: src.epistemicNature,
      });
    }
  });

  // 6. Topics
  ATLAS_TOPICS.forEach(t => {
    if (
      t.title.toLowerCase().includes(q) ||
      t.intro.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'topic',
        id: t.id,
        title: t.title,
        subtitle: t.category,
        url: `/atlas/${t.id}`,
        status: t.scientificStatus,
      });
    }
  });

  // 7. Celestial Objects
  CELESTIAL_OBJECTS.forEach(obj => {
    if (
      obj.name.toLowerCase().includes(q) ||
      obj.type.toLowerCase().includes(q) ||
      obj.description.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'object',
        id: obj.id,
        title: obj.name,
        subtitle: `${obj.type} • Stage ${obj.stageId}`,
        url: `/journey?stage=${obj.stageId}`,
        status: obj.scientificStatus,
      });
    }
  });

  // 8. Glossary
  GLOSSARY_TERMS.forEach(g => {
    if (
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'glossary',
        id: g.term,
        title: g.term,
        subtitle: g.category,
        url: `/glossary#${encodeURIComponent(g.term)}`,
        status: g.scientificStatus,
      });
    }
  });

  return NextResponse.json({ results: results.slice(0, 16) });
}
