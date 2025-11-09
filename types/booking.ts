import { Title, MaritalStatus, Gender } from './auth'
export enum BookingStages {
  YourDetails = 0,
  LovedOnesDetails = 1,
  AboutLovedOne = 2,
  CallSettings = 3,
}

export enum BookingType {
  SELF = 'SELF',
  GUEST = 'GUEST',
}

export enum chargeType {
  PREMIUM = 'PREMIUM',
  STANDARD = 'STANDARD',
  BASIC = 'BASIC',
}

export interface CallType {
  priority: number
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}
export interface CountryCode {
  _id: string
  country: string
  dialCode: string
  basicCharge: number
  standardCharge: number
  premiumCharge: number
}
export interface Caller{
  _id: string
  name: string
}

export interface AvailabilityCalender {
  from: string
  to: string
}

export interface GuestDetails {
  fullName: string
  phoneNumber: string
  gender: Gender
  maritalStatus: MaritalStatus
  title: Title
  location: string
}

// payload
export interface BookingData {
  createdBy: string
  fullName: string
  phoneNumber: string
  gender: Gender
  location: string
  title: Title
  relationshipToUser: string
  category: string
  reasonForCall: string
  maritalStatus: MaritalStatus
  userNickNames: string[]
  clientPetNamesForUser: string[]
  userPetNamesForClient: string[]
  countryCode: string // mongoId
  chargeType: string
  nativeLanguage: string
  customMessage: string
  favoriteSong: string
  favoriteMemories: string
  availabilityCalendar: AvailabilityCalender[]
  isRecorded: boolean
  bookingType: BookingType
  guestDetails?: GuestDetails
  callerGender: Gender
  price?: number
}

export enum Relationship {
  wife = 'Wife',
  Husband = 'Husband',
  Girlfriend = 'Girlfriend',
  Boyfriend = 'Boyfriend',
  Friend = 'Friend',
  Colleague = 'Colleague',
  Father = 'Father',
  Mother = 'Mother',
  Brother = 'Brother',
  Sister = 'Sister',
  Son = 'Son',
  Daughter = 'Daughter',
  Son_in_law = 'Son_in_law',
  Daughter_in_law = 'Daughter_in_law',
  Father_in_law = 'Father_in_law',
  Mother_in_law = 'Mother_in_law',
  Brother_in_law = 'Brother_in_law',
  Sister_in_law = 'Sister_in_law',
  Grandparent = 'Grandparent',
  Business_associate = 'Business_associate',
  Others = 'Others'
}

// response fromm GET
export interface BookingItem {
  _id: string
  createdBy: any //note: not sure if this should be the _id or the user object, so I am using any and handling them where they are being used
  fullName: string
  phoneNumber: string
  gender: string,
  location: string,
  title: Title
  relationshipToUser: Relationship
  category: Record<string, any> 
  reasonForCall: string
  userNickNames: string[]
  clientPetNamesForUser: string[]
  userPetNamesForClient: string[]
  countryCode: string // mongoId
  price: number
  chargeType: chargeType
  nativeLanguage: string
  customMessage: string
  favoriteSong: string
  favoriteMemories: string
  maritalStatus: string
  availabilityCalendar: AvailabilityCalender[]
  isRecorded: boolean
  bookingType: BookingType
  guestDetails?: GuestDetails
  status: BookingStatus
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  callerGender?: any
  __v: number
}

export enum BookingStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN PROGRESS',
  COMPLETED = 'COMPLETED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ON_HOLD = 'ON HOLD',
}

export interface BookingQueryParams {
  bookingDateTimeFrame?: string
  callDateTimeFrame?: string
  customStartDateOfCall?: string // ISOString
  customEndDateOfCall?: string // ISOString
  customBookingStartDate?: string // ISOString
  customBookingEndDate?: string // ISOString
  category?: string // category names fetched from GET /categories
  isPublished?: boolean
  status?: BookingStatus
  price?: number
  perPage?: number
  pageNumber?: number
}

export enum ClientBookingListTabs {
  paid = 'paid',
  draft = 'draft',
}