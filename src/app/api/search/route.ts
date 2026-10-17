import { NextResponse } from 'next/server';
import { COSMIC_STAGES } from '@/data/cosmicStages';
import { ATLAS_TOPICS } from '@/data/atlasTopics';
import { CELESTIAL_OBJECTS } from '@/data/celestialObjects';
import { GLOSSARY_TERMS } from '@/data/glossaryData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results: Array<{
    type: 'stage' | 'topic' | 'object' | 'glossary';
    id: string | number;
    title: string;
    subtitle: string;
    url: string;
    status?: string;
  }> = [];

  // Stages
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

  // Topics
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

  // Celestial Objects
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

  // Glossary
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

  return NextResponse.json({ results: results.slice(0, 12) });
}
