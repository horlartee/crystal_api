import { defineStore } from "pinia";
import {
  SignupData,
  ResponseData,
  User,
  UserType,
  UserPatch,
  PartialTempUser,
} from "@/types/auth";
import { BookingType } from "@/types/booking";
import { ResponseSchema } from "@/types/response-schema";
import { useToasterStore } from "./toaster";
import { useBookingStore } from "./booking";

const getUnauthorizedUser = (data: any) => {
  const authStore = useAuthStore();
  const toasterStore = useToasterStore();
  if (data.statusCode == 401 || data.error == "jwt expired") {
    toasterStore.showToaster({
      message: "Session time out",
      type: "info",
    });
    authStore.logout();
    return;
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User,
    token: "",
    loggedIn: false,
    requesting: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getUserId: (state) => state.user._id,
    getEmail: (state) => state.user.email,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.loggedIn,
    isEmailVerified: (state) => state.user.isEmailVerified,
    getProfileType: (state) => state.user.type,
  },
  actions: {
    async signup(payload: SignupData): Promise<ResponseData> {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.saveUser(res.data as ResponseData);
        this.requesting = false;
        return res.data as ResponseData;
      } catch (error) {
        this.requesting = false;
        throw error;
      }
    },
    async login(payload: {
      email: string;
      password: string;
      rememberMe: boolean;
      profileType: UserType;
    }): Promise<ResponseData> {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.saveUser(res.data as ResponseData);
        console.log(res.data);
        this.requesting = false;
        // set this here so that when login-out, I can know where to redirect user
        const profileType = useCookie("profileType");
        profileType.value = res?.data?.user?.type || UserType.USER;
        return res.data as ResponseData;
      } catch (error) {
        this.requesting = false;
        throw error;
      }
    },
    async forgotPassword(payload: { email: string }) {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/auth/password/forgot", {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            profileType: UserType.USER,
          }),
        })) as ResponseSchema;

        this.requesting = false;
        return res.data as string;
      } catch (error) {
        this.requesting = false;
        throw error;
      }
    },
    async resetPassword(payload: {
      password: string;
      code: string;
      codeToken: string;
    }) {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/auth/password/reset", {
          method: "POST",
          body: JSON.stringify(payload),
        })) as ResponseSchema;

        this.requesting = false;
        console.log({ res });
        return res.data;
      } catch (error) {
        this.requesting = false;
        throw error;
      }
    },
    async emailVerification(payload: {
      email: string;
      OTPCode: string;
      howYouheardAboutUs: string;
    }): Promise<ResponseData> {
      this.requesting = true;
      const config = useRuntimeConfig().public;
      const toasterStore = useToasterStore();

      try {
        const res = (await $fetch(config.baseUrl + "/auth/verify-account", {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            OTPToken: this.token,
          }),
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.requesting = false;
        return res.data as ResponseData;
      } catch (error) {
        if (error?.statusCode === 400 && error?.data?.error === "jwt expired") {
          this.resendVerification({ email: this.getEmail }); // trigger resend verification
          setTimeout(() => {
            toasterStore.showToaster({
              message:
                "Your session expired. We have sent you a new verification code.",
              type: "success",
            });
          }, 3000);
          return;
        }
        this.requesting = false;
        throw error;
      }
    },
    async resendVerification(payload: { email: string }) {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(
          config.baseUrl + "/auth/resend-verification",
          {
            method: "POST",
            body: JSON.stringify({
              email: payload.email,
            }),
          }
        )) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.requesting = false;
        const userToken = useCookie<string>("userToken");
        userToken.value = res.data?.OTPToken;
        this.token = res.data?.OTPToken;
        return res.data as ResponseData;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    async updateUserDetails(payload: UserPatch) {
      this.requesting = true;
      const config = useRuntimeConfig().public;

      try {
        const res = (await $fetch(config.baseUrl + "/user/" + this.getUserId, {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${this.getToken}`,
          },
        })) as ResponseSchema;

        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw new Error(res.message);
        }
        this.requesting = false;
        return res.data as ResponseData;
      } catch (error) {
        this.requesting = false;
        getUnauthorizedUser(error.data);
        throw error;
      }
    },
    saveUser(response: ResponseData) {
      const userToken = useCookie<string>("userToken");
      userToken.value = response?.OTPToken || response?.token;
      this.token = response?.OTPToken || response?.token;
      const user = useCookie<User>("user");
      user.value = response?.user;
      this.user = response?.user;
      this.loggedIn = true;
    },
    savePartialTempUser({ email, password, token }: PartialTempUser) {
      const tempUser = useCookie<PartialTempUser>("tempStoredUser");
      let data = {} as PartialTempUser;
      if (email) data = { ...data, email };
      if (password) data = { ...data, password };
      if (token) data = { ...data, token };
      tempUser.value = data;
    },
    getPartialTempUser() {
      const tempUser = useCookie<PartialTempUser>("tempStoredUser");
      return tempUser.value;
    },
    clearPartialTempUser() {
      const tempUser = useCookie("tempStoredUser");
      tempUser.value = null;
    },
    hydrateUser() {
      const userToken = useCookie<string>("userToken");
      const user = useCookie<User>("user");
      this.user = user.value ?? {};
      this.token = userToken.value ?? "";
      this.loggedIn = !!userToken.value;
    },
    logout() {
      const userToken = useCookie<string>("userToken");
      const user = useCookie<User>("user");
      const router = useRouter();
      user.value = {} as User;
      userToken.value = "";
      this.user = {} as User;
      this.token = "";
      this.loggedIn = false;
      const hasMadeFirstBooking = useCookie("hasMadeFirstBooking");
      hasMadeFirstBooking.value = null;
      const bookingStore = useBookingStore();
      bookingStore.clearBookingList();
      const profileType = useCookie("profileType");
      profileType.value === UserType.ADMIN
        ? router.push("/admin/login")
        : router.push("/login");
      console.log("logged out");

      // clear both catergories if they have data
      bookingStore.clearBookingData(BookingType.SELF);
      bookingStore.clearBookingData(BookingType.GUEST);
    },
  },
});
