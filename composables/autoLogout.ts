import { useAuthStore } from "../stores/auth";

export default function (timer: number) {
  window.addEventListener("DOMContentLoaded", () => {
    const events = ["click", "mousedown", "keydown", "change", "mouseover"];
    const authStore = useAuthStore();
    let logoutTimeout = setTimeout(logUserOut, timer);
    events.forEach((event) => {
      window.addEventListener(event, handleEvent);
      console.log(event);
    });

    function logUserOut() {
      authStore.logout();
    }
    function handleEvent() {
      clearTimeout(logoutTimeout);
      logoutTimeout = setTimeout(logUserOut, timer);
    }
  });
}
