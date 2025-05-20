import parseHtml from 'html-react-parser';
import { i18n, Locale } from '~/lib/i18n/config';
import { translation } from '~/lib/i18n/dictionaries';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AppLangPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const list = (await translation('ExampleIntro.list', lang, [])) as string[];

  return (
    <div>
      <h1>{translation('Common.language', lang)}</h1>
      <ul>
        {list.map((item) => (
          <li key={item}>{parseHtml(item)}</li>
        ))}
      </ul>
    </div>
  );
}
