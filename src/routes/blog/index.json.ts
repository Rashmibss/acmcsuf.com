import { readFileSync } from 'fs';
import type { RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import { fetchNewsletters } from './_query';
import { DEBUG } from '$lib/constants';

const SAMPLE_POST = readFileSync('./src/routes/blog/_testdata/posts.json');

export async function get(): Promise<RequestHandlerOutput> {
  // Uses sample data when env variables are not satisfied.
  const isSatisfied =
    import.meta.env.VITE_GH_ACCESS_TOKEN === undefined ||
    import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID === undefined;

  // remove the ! infront of the DEBUG to show only the sample posts
  return new Response(
    !DEBUG || isSatisfied ? SAMPLE_POST : JSON.stringify(await fetchNewsletters()),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
