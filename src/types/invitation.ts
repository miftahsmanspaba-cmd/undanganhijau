export interface GiftAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  span?: 'wide' | 'tall' | 'standard';
}

export interface InvitationConfig {
  coupleShort: string;
  brideName: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram: string;
  groomName: string;
  groomFullName: string;
  groomParents: string;
  groomInstagram: string;
  quoteText: string;
  quoteSource: string;
  eventDateISO: string;
  eventDateDisplay: string;
  akadDateDisplay?: string;
  akadTitle: string;
  akadTime: string;
  akadVenue: string;
  resepsiDateDisplay?: string;
  resepsiTitle: string;
  resepsiTime: string;
  resepsiVenue: string;
  dressCode: string;
  venueName: string;
  venueAddress: string;
  venueLat: number;
  venueLng: number;
  musicTitle: string;
  customMusicUrl: string;
  thankYouHeading: string;
  thankYouMessage: string;
  familySignature: string;
  giftAccounts: GiftAccount[];
  gallery: GalleryPhoto[];
}

export type AttendanceStatus = 'hadir' | 'ragu' | 'tidak_hadir';

export interface GuestbookEntry {
  id: string;
  name: string;
  attendance: AttendanceStatus;
  guestsCount: number;
  message: string;
  createdAt: string;
}
