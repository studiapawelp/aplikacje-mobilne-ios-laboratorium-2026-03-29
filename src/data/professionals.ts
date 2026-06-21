import { Professional } from '../types';

// In memory list of professionals. This simulates data from a backend.
// Images come from picsum.photos with a stable seed so they do not change.
const img = (seed: string): string =>
  `https://picsum.photos/seed/${seed}/400/400`;

export const professionals: Professional[] = [
  {
    id: 'pro-1',
    name: 'Marek Kowalski',
    category: 'Elektryk',
    rating: 4.9,
    reviewsCount: 128,
    priceFrom: 120,
    city: 'Warszawa',
    experienceYears: 12,
    about:
      'Doświadczony elektryk z uprawnieniami SEP. Wykonuję instalacje, naprawy i pomiary. Działam szybko i czysto.',
    imageUrl: img('marek'),
    featured: true,
    reviews: [
      {
        id: 'rev-1-1',
        author: 'Anna Z.',
        rating: 5,
        text: 'Szybko i profesjonalnie. Naprawił instalację w jeden dzień.',
      },
      {
        id: 'rev-1-2',
        author: 'Piotr W.',
        rating: 5,
        text: 'Polecam, bardzo solidny fachowiec i uczciwa cena.',
      },
      {
        id: 'rev-1-3',
        author: 'Kasia M.',
        rating: 4,
        text: 'Dobra robota, choć trochę spóźniony na wizytę.',
      },
    ],
  },
  {
    id: 'pro-2',
    name: 'Tomasz Nowak',
    category: 'Hydraulik',
    rating: 4.7,
    reviewsCount: 95,
    priceFrom: 100,
    city: 'Kraków',
    experienceYears: 8,
    about:
      'Hydraulik z pasją. Usuwam awarie, montuję armaturę i kotły. Dostępny również w weekendy.',
    imageUrl: img('tomasz'),
    featured: true,
    reviews: [
      {
        id: 'rev-2-1',
        author: 'Marta K.',
        rating: 5,
        text: 'Przyjechał w godzinę i usunął wyciek. Super!',
      },
      {
        id: 'rev-2-2',
        author: 'Jan L.',
        rating: 4,
        text: 'Solidnie, ale trzeba było chwilę poczekać na termin.',
      },
    ],
  },
  {
    id: 'pro-3',
    name: 'Agnieszka Wójcik',
    category: 'Serwis IT',
    rating: 5.0,
    reviewsCount: 64,
    priceFrom: 150,
    city: 'Wrocław',
    experienceYears: 6,
    about:
      'Naprawa komputerów i laptopów, odzyskiwanie danych oraz konfiguracja sieci domowych i firmowych.',
    imageUrl: img('agnieszka'),
    featured: true,
    reviews: [
      {
        id: 'rev-3-1',
        author: 'Robert N.',
        rating: 5,
        text: 'Uratowała moje dane z zepsutego dysku. Mistrzostwo.',
      },
      {
        id: 'rev-3-2',
        author: 'Ewa S.',
        rating: 5,
        text: 'Szybka diagnoza i konkretne rozwiązanie problemu.',
      },
    ],
  },
  {
    id: 'pro-4',
    name: 'Krzysztof Lewandowski',
    category: 'Złota rączka',
    rating: 4.6,
    reviewsCount: 142,
    priceFrom: 80,
    city: 'Poznań',
    experienceYears: 15,
    about:
      'Drobne naprawy domowe, montaż mebli, wieszanie półek i karniszy. Złota rączka na każdą okazję.',
    imageUrl: img('krzysztof'),
    featured: false,
    reviews: [
      {
        id: 'rev-4-1',
        author: 'Magda P.',
        rating: 5,
        text: 'Złożył całą szafę w godzinę. Bardzo pomocny.',
      },
      {
        id: 'rev-4-2',
        author: 'Adam T.',
        rating: 4,
        text: 'Dobra robota za rozsądne pieniądze.',
      },
    ],
  },
  {
    id: 'pro-5',
    name: 'Joanna Kamińska',
    category: 'Sprzątanie',
    rating: 4.8,
    reviewsCount: 210,
    priceFrom: 60,
    city: 'Gdańsk',
    experienceYears: 5,
    about:
      'Profesjonalne sprzątanie mieszkań i biur. Mycie okien, pranie tapicerki i sprzątanie po remoncie.',
    imageUrl: img('joanna'),
    featured: true,
    reviews: [
      {
        id: 'rev-5-1',
        author: 'Beata R.',
        rating: 5,
        text: 'Mieszkanie lśni czystością. Na pewno skorzystam ponownie.',
      },
      {
        id: 'rev-5-2',
        author: 'Łukasz D.',
        rating: 5,
        text: 'Bardzo dokładna i punktualna.',
      },
    ],
  },
  {
    id: 'pro-6',
    name: 'Paweł Zieliński',
    category: 'Elektryk',
    rating: 4.5,
    reviewsCount: 73,
    priceFrom: 110,
    city: 'Łódź',
    experienceYears: 9,
    about:
      'Montaż oświetlenia, gniazdek i tablic rozdzielczych. Inteligentny dom i automatyka.',
    imageUrl: img('pawel'),
    featured: false,
    reviews: [
      {
        id: 'rev-6-1',
        author: 'Iwona G.',
        rating: 5,
        text: 'Zamontował inteligentne oświetlenie. Działa idealnie.',
      },
      {
        id: 'rev-6-2',
        author: 'Marcin B.',
        rating: 4,
        text: 'Fachowo, choć ceny trochę wyższe niż u innych.',
      },
    ],
  },
  {
    id: 'pro-7',
    name: 'Barbara Szymańska',
    category: 'Hydraulik',
    rating: 4.4,
    reviewsCount: 51,
    priceFrom: 90,
    city: 'Szczecin',
    experienceYears: 7,
    about:
      'Naprawy i montaż instalacji wodno-kanalizacyjnych. Wymiana baterii, syfonów i spłuczek.',
    imageUrl: img('barbara'),
    featured: false,
    reviews: [
      {
        id: 'rev-7-1',
        author: 'Grzegorz F.',
        rating: 4,
        text: 'Sprawnie wymieniła baterię w kuchni.',
      },
      {
        id: 'rev-7-2',
        author: 'Natalia H.',
        rating: 5,
        text: 'Miła i kompetentna. Polecam.',
      },
    ],
  },
  {
    id: 'pro-8',
    name: 'Michał Dąbrowski',
    category: 'Serwis IT',
    rating: 4.9,
    reviewsCount: 88,
    priceFrom: 130,
    city: 'Katowice',
    experienceYears: 10,
    about:
      'Wsparcie IT dla firm i osób prywatnych. Usuwanie wirusów, instalacja systemów i optymalizacja.',
    imageUrl: img('michal'),
    featured: false,
    reviews: [
      {
        id: 'rev-8-1',
        author: 'Sylwia K.',
        rating: 5,
        text: 'Wyczyścił laptopa z wirusów, działa jak nowy.',
      },
      {
        id: 'rev-8-2',
        author: 'Tomasz J.',
        rating: 5,
        text: 'Szybka i skuteczna pomoc zdalna.',
      },
    ],
  },
];
