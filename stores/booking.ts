import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  BookingType,
  CallType,
  BookingData,
  CountryCode,
  BookingItem,
  Caller,
  BookingStatus,
  BookingQueryParams,
  ClientBookingListTabs,
} from "@/types/booking";
import { UserPatch, User } from "@/types/auth";
import { ResponseSchema, PaginatedData } from "@/types/response-schema";
import { useAuthStore } from "./auth";
import { useToasterStore } from "./toaster";

const getUnauthorizedUser = (data: any) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const toasterStore = useToasterStore();
  if (data.statusCode == 401 || data.error == "jwt expired") {
    toasterStore.showToaster({
      message: "Session time out",
      type: "info",
    });
    setTimeout(() => {
      authStore.logout();
    }, 1000);
  }
};

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookingFor: "" as BookingType,
    activeStage: 1,
    activeStage2: 1,
    maxProgress: 1,
    maxProgress2: 1,
    callTypes: [] as CallType[],
    countryCodes: [] as CountryCode[],
    requesting: false,
    confirmBookingAbort: false,
    currentPage: 1,
    callers: [] as Caller[],
    filteredBookingList: null as PaginatedData<BookingItem[]> | null,
    bookingList: null as PaginatedData<BookingItem[]> | null,
    selectedBookingListTab: ClientBookingListTabs.paid as ClientBookingListTabs,
    currentUsersBookingList: null as PaginatedData<BookingItem[]> | null,
  }),
  getters: {
    getOrderedBookingList: () => {
      return (
        bookingList: BookingItem[],
        order: "asc" | "desc"
      ): BookingItem[] => {
        return bookingList.sort((a, b) => {
          const createdAtA = new Date(a.createdAt).setHours(0, 0, 0, 0);
          const createdAtB = new Date(b.createdAt).setHours(0, 0, 0, 0);
          return order === "asc"
            ? createdAtA - createdAtB
            : createdAtB - createdAtA;
        });
      };
    },
    getBookingById:
      (state) =>
      (id: string): Promise<BookingItem> => {
        return new Promise((resolve, reject) => {
          const booking = state.bookingList?.data.find(
            (booking) => booking._id === id
          ) as BookingItem;
          return booking
            ? resolve(booking)
            : reject(new Error("Booking not found"));
        });
      },
    // getPublishedBookingList: (state) => {
    //   // return state.bookingList.filter(booking => booking.isPublished === true) as BookingItem[]
    //   return state.bookingList
    // }
  },
  actions: {
    setBookingType(bookingFor: BookingType) {
      this.bookingFor = bookingFor;
    },
    setActiveStage(stage: number) {
      this.activeStage = stage;
    },
    setActiveStage2(stage: number) {
      this.activeStage2 = stage;
    },
    setMaxProgress(progress: number) {
      this.maxProgress = progress;
    },
    setMaxProgress2(progress: number) {
      this.maxProgress2 = progress;
    },
    async fetchCallTypes() {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/category", {
          method: "GET",
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.callTypes = res.data as CallType[];
        this.requesting = false;
        return res.data as CallType[];
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async fetchCountryCodes() {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/country-code", {
          method: "GET",
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.requesting = false;
        this.countryCodes = res.data as CountryCode[];
        return res.data as CountryCode[];
      } catch (error) {
        const authStore = useAuthStore();
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async fetchBookingList(query?: BookingQueryParams) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();

      try {
        this.bookingList = null;
        const res = (await $fetch(config.baseUrl + "/booking", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          query,
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.requesting = false;
        console.log(res.data);

        this.bookingList = res.data as PaginatedData<BookingItem[]>;
        return res.data as PaginatedData<BookingItem[]>;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async fetchCurrentUsersBookingList(query?: BookingQueryParams) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();

      try {
        const res = (await $fetch(config.baseUrl + "/booking/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          query,
        })) as ResponseSchema;

        this.requesting = false;
        this.currentUsersBookingList = res.data as PaginatedData<BookingItem[]>;
        return res.data as PaginatedData<BookingItem[]>;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },

    async fetchBookingById(id: string) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();

      try {
        const res = (await $fetch(config.baseUrl + "/booking/" + id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })) as ResponseSchema;
        this.requesting = false;
        return res.data as BookingItem;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async attemptBooking({
      bookingPayload,
      userPatchPayload,
    }: {
      bookingPayload: BookingData;
      userPatchPayload?: UserPatch;
    }) {
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();

      interface Res {
        booking: BookingItem;
        user: User;
      }
      try {
        let res: Res = {
          booking: {} as BookingItem,
          user: {} as User,
        };
        const bookingRes = await this.createBooking(bookingPayload);
        res.booking = bookingRes;

        // try {
        //   // const userPatchRes = await authStore.updateUserDetails(userPatchPayload)
        //   // res.user = userPatchRes
        // } catch (error) {
        //   // throw error
        // }
        return res;
      } catch (error) {
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async createBooking(payload: BookingData) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();

      try {
        const res = (await $fetch(config.baseUrl + "/booking", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })) as ResponseSchema;

        this.requesting = false;
        // this is used to display appropriate message to user on landing page
        const hasMadeFirstBooking = useCookie("hasMadeFirstBooking", {
          default: () => false,
          watch: false,
        });
        if (!hasMadeFirstBooking.value) hasMadeFirstBooking.value = true;
        return res.data as BookingItem;
      } catch (error) {
        console.log(error);
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async updateBookingStatus({
      status,
      bookingId,
      reason,
    }: {
      status: BookingStatus;
      bookingId: string;
      reason: string;
    }) {
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();

      try {
        const res = (await $fetch(
          config.baseUrl + "/booking/update-status/" + bookingId,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({ action: status, reason }),
          }
        )) as ResponseSchema;

        // update store
        const bookingIndex = this.bookingList?.data.findIndex(
          (booking) => booking._id === bookingId
        );
        if (bookingIndex && bookingIndex !== -1) {
          this.bookingList.data[bookingIndex].status = status;
        }
        return res.data;
      } catch (error) {
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async updateBookingById({
      newDetails,
      bookingId,
    }: {
      newDetails: BookingItem;
      bookingId: string;
    }) {
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();
      console.log(newDetails);
      try {
        const res = (await $fetch(config.baseUrl + "/booking/" + bookingId, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          body: JSON.stringify({ ...newDetails }),
        })) as ResponseSchema;

        // update store
        const bookingIndex = this.bookingList?.data.findIndex(
          (booking) => booking._id === bookingId
        );
        if (bookingIndex && bookingIndex !== -1) {
          this.bookingList.data[bookingIndex].status = status;
        }
        return res.data;
      } catch (error) {
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    updateBookingAbortStatus(status: boolean) {
      this.confirmBookingAbort = status;
    },
    clearBookingData(bookingType: BookingType) {
      const cookiePostfix =
        (!!bookingType && bookingType) === BookingType.GUEST ? "Guest" : "";
      this.bookingFor = "" as BookingType;
      if (bookingType === BookingType.GUEST) {
        this.activeStage2 = 1;
        this.maxProgress2 = 1;
      } else {
        this.activeStage = 1;
        this.maxProgress = 1;
      }
      const stageOne = useCookie("stageOneForm" + cookiePostfix);
      stageOne.value = null;
      const stageTwo = useCookie("stageTwoForm" + cookiePostfix);
      stageTwo.value = null;
      const stageThree = useCookie("stageThreeForm" + cookiePostfix);
      stageThree.value = null;
      const stageFour = useCookie("stageFourForm" + cookiePostfix);
      stageFour.value = null;
      const bookingStage = useCookie("bookingStageInfo" + cookiePostfix);
      bookingStage.value = null;
    },
    async fetchViewedBookingCreator(creatorId: string): Promise<User> {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/user/" + creatorId, {
          method: "GET",
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.requesting = false;
        return res.data as User;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    clearBookingList() {
      this.bookingList = null;
      this.currentUsersBookingList = null;
    },
    filterBooking(search: any) {
      // console.log(this.bookingList);
      const filterData = this.bookingList?.data.filter(
        (booking: BookingItem) => {
          if (
            booking.createdBy.fullName
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return booking.createdBy.fullName
              .toLowerCase()
              .includes(search.toLowerCase());
          }
          if (booking.status.toLowerCase().includes(search.toLowerCase())) {
            return booking.status.toLowerCase().includes(search.toLowerCase());
          }
          if (booking.fullName.toLowerCase().includes(search.toLowerCase())) {
            return booking.fullName
              .toLowerCase()
              .includes(search.toLowerCase());
          }
          if (booking._id.toLowerCase().includes(search.toLowerCase())) {
            return booking._id.toLowerCase().includes(search.toLowerCase());
          }
          if (
            booking.category.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return booking.category.name
              .toLowerCase()
              .includes(search.toLowerCase());
          }
        }
      );
      // console.log(filterData);
      this.filteredBookingList = {
        data: filterData,
        pagination: this.bookingList?.pagination,
      };
      // console.log(this.filteredBookingList);
    },
    async fetchFilteredBooking(query) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();
      console.log(query);
      try {
        const res = (await $fetch(config.baseUrl + "/booking", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          query,
        })) as ResponseSchema;
        console.log(res.data);
        this.bookingList = res.data;
        this.requesting = false;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        console.log(error);
      }
    },
    async fetchCallers(query: any) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();
      try {
        const res = (await $fetch(config.baseUrl + "/caller", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          query,
        })) as ResponseSchema;
        this.callers = res.data;
        this.requesting = false;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        console.log(error);
      }
    },
    async updateCaller({ bookingId, assigneeId }) {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const authStore = useAuthStore();
      // const bookingToPatch = this.bookingList?.data.find(
      //   (booking) => booking._id == bookingId
      // );
      // let {
      //   fullName,
      //   gender,
      //   location,
      //   relationshipToUser,
      //   userNickNames,
      //   clientPetNamesForUser,
      //   userPetNamesForClient,
      //   isRecorded,
      //   title,
      //   bookingType,
      //   createdBy,
      //   nativeLanguage,
      //   chargeType,
      //   callerGender,
      // } = bookingToPatch;
      // createdBy.location = "Lagos, Nigeria";
      // userNickNames = ["Tola", "ade"];
      // userPetNamesForClient = ["jack", "tin"];
      // clientPetNamesForUser = ["jcsa", "eaf"];
      // const newCategory = bookingToPatch.category._id;
      // const newAvailabilityCalendar = new Date(
      //   new Date().getTime() + 1000 * 60 * 24
      // ).toISOString();
      // // console.log(newAvailabilityCalendar);
      // let newMaritalStatus = bookingToPatch.maritalStatus.toLowerCase();
      // const firstStatus = newMaritalStatus.charAt(0).toUpperCase();
      // const remainStatus = newMaritalStatus.slice(1);
      // const maritalStatus = firstStatus + remainStatus;
      try {
        const res = (await $fetch(
          config.baseUrl + `/booking/update-assignee/${bookingId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({
              // category: newCategory,
              // availabilityCalendar: [
              //   { from: newAvailabilityCalendar, to: newAvailabilityCalendar },
              //   { from: newAvailabilityCalendar, to: newAvailabilityCalendar },
              // ],
              // maritalStatus,
              // fullName,
              // relationshipToUser,
              // location,
              // title,
              // isRecorded,
              // guestDetails: createdBy,
              // callerGender,
              // bookingType,
              // nativeLanguage,
              // chargeType,
              // userPetNamesForClient,
              // clientPetNamesForUser,
              // userNickNames,
              // gender,
              assignedTo: assigneeId,
            }),
          }
        )) as ResponseSchema;

        // update store
        const bookingIndex = this.bookingList?.data.findIndex(
          (booking) => booking._id === bookingId
        );
        if (bookingIndex && bookingIndex !== -1) {
          this.bookingList.data[bookingIndex].assignedTo = assigneeId;
        }

        console.log(res.data);
        this.requesting = false;
      } catch (error) {
        this.requesting = false;
        const toasterStore = useToasterStore();
        getUnauthorizedUser(error.data);
        if (
          error.data.error ==
          "You cannot update booking when it has been approved"
        ) {
          toasterStore.showToaster({
            message: "You cannot update booking when it has been approved",
            type: "info",
          });
          return;
        }
        if (error.data.statusCode == 400) {
          toasterStore.showToaster({
            message: "Unable to finish the task",
            type: "info",
          });
        }
        console.log(error.data);
      }
    },
  },
});
