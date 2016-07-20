/* Transform langcodes to the right KAT id. */
export default function filteredLangCode(langcode) {
  if (langcode.replace(/\D/g, '') !== '') return langcode;

  let langId = '';

  switch (langcode) {
    case 'en':
      langId = 2;
      break;
    case 'sq':
      langId = 42;
      break;
    case 'ar':
      langId = 7;
      break;
    case 'eu':
      langId = 44;
      break;
    case 'bn':
      langId = 46;
      break;
    case 'pt-br':
      langId = 39;
      break;
    case 'bg':
      langId = 37;
      break;
    case 'yue':
      langId = 45;
      break;
    case 'ca':
      langId = 47;
      break;
    case 'zh':
      langId = 10;
      break;
    case 'hr':
      langId = 34;
      break;
    case 'cs':
      langId = 32;
      break;
    case 'da':
      langId = 26;
      break;
    case 'nl':
      langId = 8;
      break;
    case 'tl':
      langId = 11;
      break;
    case 'fi':
      langId = 31;
      break;
    case 'fr':
      langId = 5;
      break;
    case 'de':
      langId = 4;
      break;
    case 'el':
      langId = 30;
      break;
    case 'he':
      langId = 25;
      break;
    case 'hi':
      langId = 6;
      break;
    case 'hu':
      langId = 27;
      break;
    case 'it':
      langId = 3;
      break;
    case 'ja':
      langId = 15;
      break;
    case 'kn':
      langId = 49;
      break;
    case 'ko':
      langId = 16;
      break;
    case 'lt':
      langId = 43;
      break;
    case 'ml':
      langId = 21;
      break;
    case 'cmn':
      langId = 23;
      break;
    case 'ne':
      langId = 48;
      break;
    case 'no':
      langId = 19;
      break;
    case 'fa':
      langId = 33;
      break;
    case 'pl':
      langId = 9;
      break;
    case 'pt':
      langId = 17;
      break;
    case 'pa':
      langId = 35;
      break;
    case 'ro':
      langId = 18;
      break;
    case 'ru':
      langId = 12;
      break;
    case 'sr':
      langId = 28;
      break;
    case 'sl':
      langId = 36;
      break;
    case 'es':
      langId = 14;
      break;
    case 'sv':
      langId = 20;
      break;
    case 'ta':
      langId = 13;
      break;
    case 'te':
      langId = 22;
      break;
    case 'th':
      langId = 24;
      break;
    case 'tr':
      langId = 29;
      break;
    case 'uk':
      langId = 40;
      break;
    case 'vi':
      langId = 38;
      break;
    default:
      langId = '';
  }

  return langId;
}
