import { User, UserType } from "@/types/auth";
import { ref } from "vue";
export default defineNuxtRouteMiddleware((to, from, next) => {
  const userToken = useCookie<string>("userToken");
  const user = useCookie<User>("user");
  const profileType = useCookie("profileType") || ref(UserType.USER);
  // this.profileType === UserType.USER ? router.push('/login') : router.push('/admin/login')

  // console.log({ to: to.path, from: from.path , isEmailVerified: user.value?.isEmailVerified , userToken: userToken.value })
  if (!user.value?.isEmailVerified && userToken.value && to.path === "/login") {
    return true;
  }

  if (
    !user.value?.isEmailVerified &&
    userToken.value &&
    to.path === "/signup"
  ) {
    return true;
  }

  if (
    !userToken.value &&
    to.path !== "/login" &&
    to.path !== "/signup" &&
    to.path !== "/passwords/forgot-password" &&
    to.path !== "/passwords/reset-password" &&
    to.path !== "/email-verification"
  ) {
    return navigateTo(
      profileType.value === UserType.ADMIN ? "/admin/login" : "/login"
    );
  }
  if (
    !user.value?.isEmailVerified &&
    userToken.value &&
    to.path !== "/email-verification"
  ) {
    console.log({ to: to.path, from: from.path });
    return navigateTo("/email-verification");
  }

  if (userToken.value && to.path === "/login") {
    return navigateTo("/");
  }

  if (userToken.value && to.path === "/signup") {
    return navigateTo("/");
  }
});
