'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LanguageToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'en';

  const switchLanguage = (lang: string) => {
    router.push(`?lang=${lang}`);
  };

  return (
    <div className="flex bg-slate-800 rounded-md overflow-hidden text-sm font-medium text-white flex-shrink-0">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 ${currentLang === 'en' ? 'bg-blue-600' : 'bg-transparent'}`}
      >
        <span className="sm:hidden">EN</span>
        <span className="hidden sm:inline">English</span>
      </button>
      <button
        onClick={() => switchLanguage('so')}
        className={`px-3 py-1 ${currentLang === 'so' ? 'bg-blue-600' : 'bg-transparent'}`}
      >
        <span className="sm:hidden">SO</span>
        <span className="hidden sm:inline">Somali</span>
      </button>
    </div>
  );
}