export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ANY = 'ANY GENDER',
}
export enum Title {
  Mr = 'Mr',
  Mrs = 'Mrs',
  Ms = 'Ms',
  Chief = 'Chief',
  Dr = 'Dr',
  Prof = 'Prof',
  Sir = 'Sir',
  Lady = 'Lady',
  Rev = 'Rev',
  Alhaji = 'Alhaji',
  NA = 'N/A',
}
export enum MaritalStatus {
  Married = 'Married',
  Single = 'Single',
  Divorced = 'Divorced',
  NA = 'N/A',
}

export interface SignupData {
  fullName: string
  email: string
  location: string
  username: string
  dob: string
  phoneNumber: string
  password: string
  type: UserType
  gender: Gender
  maritalStatus: MaritalStatus
  imageUrl: string
  title: Title
}

export interface Location {
  name: string
  address: string
  city: string
  country: string
  countryCode: string
  type: string
  coordinates: number[]  
}

export interface User {
  _id: string
  type: UserType
  email: string
  phoneNumber: string
  username: string
  gender: Gender
  maritalStatus: MaritalStatus
  dob: string
  fullName: string
  location: Location | string
  isEmailVerified: boolean
  imageUrl: string
  bio: string
  title: Title
  referralCode: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface UserPatch {
  email?: string
  phoneNumber?: string
  username?: string
  gender?: Gender
  maritalStatus?: MaritalStatus
  dob?: string
  fullName?: string
  location?: Location
  isEmailVerified?: boolean
  imageUrl?: string
  bio?: string
  title?: Title
}

export interface ResponseData {
  user: User,
  OTPToken: string,
  link: string
}

export interface PartialTempUser {
  email: string
  password?: string
  token?: string
}