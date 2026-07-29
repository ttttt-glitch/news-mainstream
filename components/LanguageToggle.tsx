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
    <div className="flex bg-slate-800 rounded-md overflow-hidden text-sm font-medium text-white">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 ${currentLang === 'en' ? 'bg-blue-600' : 'bg-transparent'}`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('so')}
        className={`px-3 py-1 ${currentLang === 'so' ? 'bg-blue-600' : 'bg-transparent'}`}
      >
        Somali
      </button>
    </div>
  );
}