<template>
  <Modal>
    <div class="min-w-[100%]">
      <ul
        class="p-6 py-10 max-h-[60vh] overflow-y-auto"
        v-if="
          currentFilter == 'amount' ||
          currentFilter == 'status' ||
          currentFilter == 'typeOfCall' ||
          currentFilter == 'filterList' ||
          currentFilter == 'assignees'
        "
      >
        <h2 class="text-primary text-xl font-bold">
          {{
            currentFilter == "amount"
              ? "Filter by amount"
              : currentFilter == "status"
              ? "Filter by Status"
              : currentFilter == "typeOfCall"
              ? "Filter by Type of call"
              : currentFilter == "assignees"
              ? "Filter by Assignees"
              : "Filter"
          }}
        </h2>
        <div v-for="filter in newFilterList" :key="filter.name">
          <li
            class="font-semibold mt-4 text-lg cursor-pointer hover:text-primary-faded duration-100"
            @click="
              currentFilter == 'filterList'
                ? setCurrentFilter(filter.action)
                : currentFilter == 'typeOfCall'
                ? updateTypeOfCall(filter.action)
                : currentFilter == 'amount'
                ? updateAmount(filter.action)
                : currentFilter == 'status'
                ? updateStatus(filter.action)
                : updateAssignees(filter._id)
            "
            :class="currentFilter == 'amount' && 'text-xl'"
          >
            {{ filter.name }}
          </li>
          <p v-if="currentFilter == 'amount'" class="text-sm mt-2">
            {{ filter.description }}
          </p>
          <p v-if="currentFilter == 'filterList'">{{ filter.value }}</p>
        </div>
        <div
          v-if="currentFilter !== 'filterList'"
          class="mt-6 flex justify-center sm:justify-end text-white"
        >
          <button
            @click="currentFilter = 'filterList'"
            class="bg-primary w-full sm:w-auto px-6 py-2 rounded-md hover:bg-primary-faded duration-200"
          >
            Back
          </button>
        </div>
      </ul>
      <div
        v-if="currentFilter == 'dateOfOrder' || currentFilter == 'dateOfCall'"
        class="py-10 px-4"
      >
        <h2 class="text-primary text-xl font-bold">
          {{
            currentFilter == "dateOfOrder"
              ? "Filter by Date of Order"
              : "Filter by Date of Call"
          }}
        </h2>

        <!-- Date of Order -->
        <div
          v-if="currentFilter == 'dateOfOrder'"
          class="flex flex-col xs:flex-row items-center justify-between space-x-2 sm:space-x-6 mt-5"
        >
          <div
            class="flex-1 font-semibold text-sm min-w-[5rem] sm:min-w-[8rem] flex xs:flex-col space-x-2 xs:space-x-0 xs:space-y-6 mb-4 xs:mb-0 text-center xs:text-left"
          >
            <label
              for="7days"
              :class="
                dateOfCall == 'last7days' || dateOfOrder == 'last7days'
                  ? 'text-primary'
                  : ''
              "
            >
              <p :class="dateOfOrder == 'last7days' ? 'text-primary' : ''">
                Last 7 days
              </p>
              <input
                type="radio"
                id="7days"
                name="date"
                v-model="dateOfOrder"
                value="last7days"
                class="hidden"
              />
            </label>
            <label
              for="14days"
              :class="dateOfOrder == 'last14days' ? 'text-primary' : ''"
            >
              <p>Last 14 days</p>
              <input
                type="radio"
                id="14days"
                name="date"
                v-model="dateOfOrder"
                value="last14days"
                class="hidden"
              />
            </label>
            <label
              for="30days"
              :class="dateOfOrder == 'last30days' ? 'text-primary' : ''"
            >
              <p>Last 30 days</p>
              <input
                type="radio"
                id="30days"
                name="date"
                v-model="dateOfOrder"
                value="last30days"
                class="hidden"
              />
            </label>
            <label
              for="3months"
              :class="dateOfOrder == 'last3months' ? 'text-primary' : ''"
            >
              <p>Last 3 months</p>
              <input
                type="radio"
                id="3months"
                name="date"
                v-model="dateOfOrder"
                value="last3months"
                class="hidden"
              />
            </label>
            <label
              for="12months"
              :class="dateOfOrder == 'last12months' ? 'text-primary' : ''"
            >
              <p>Last 12 months</p>
              <input
                type="radio"
                id="12months"
                name="date"
                v-model="dateOfOrder"
                value="last12months"
                class="hidden"
              />
            </label>
          </div>
          <VueDatePicker
            v-model="orderDate"
            class="justify-self-end"
            style="--dp-highlight-color: #ffa500"
            range
            model-auto
            inline
            auto-apply
          />
        </div>

        <!-- Date of Call -->
        <div
          v-else
          class="flex flex-col xs:flex-row items-center justify-between space-x-2 sm:space-x-6 mt-5"
        >
          <div
            class="flex-1 font-semibold text-sm min-w-[5rem] sm:min-w-[8rem] flex xs:flex-col space-x-2 xs:space-x-0 xs:space-y-6 mb-4 xs:mb-0 text-center xs:text-left"
          >
            <label
              for="7days"
              :class="dateOfCall == 'last7days' ? 'text-primary' : ''"
            >
              <p>Last 7 days</p>
              <input
                type="radio"
                id="7days"
                name="date"
                v-model="dateOfCall"
                value="last7days"
                class="hidden"
              />
            </label>
            <label
              for="14days"
              :class="dateOfCall == 'last14days' ? 'text-primary' : ''"
            >
              <p>Last 14 days</p>
              <input
                type="radio"
                id="14days"
                name="date"
                v-model="dateOfCall"
                value="last14days"
                class="hidden"
              />
            </label>
            <label
              for="30days"
              :class="dateOfCall == 'last30days' ? 'text-primary' : ''"
            >
              <p>Last 30 days</p>
              <input
                type="radio"
                id="30days"
                name="date"
                v-model="dateOfCall"
                value="last30days"
                class="hidden"
              />
            </label>
            <label
              for="3months"
              :class="dateOfCall == 'last3months' ? 'text-primary' : ''"
            >
              <p>Last 3 months</p>
              <input
                type="radio"
                id="3months"
                name="date"
                v-model="dateOfCall"
                value="last3months"
                class="hidden"
              />
            </label>
            <label
              for="12months"
              :class="dateOfCall == 'last12months' ? 'text-primary' : ''"
            >
              <p>Last 12 months</p>
              <input
                type="radio"
                id="12months"
                name="date"
                v-model="dateOfCall"
                value="last12months"
                class="hidden"
              />
            </label>
          </div>
          <VueDatePicker
            v-model="callDate"
            style="--dp-highlight-color: #ffa500"
            range
            model-auto
            inline
            auto-apply
          />
        </div>

        <div class="flex justify-end pt-4 space-x-2">
          <button
            @click="currentFilter = 'filterList'"
            class="border-primary border sm:w-auto px-6 py-2 rounded-md hover:border-primary-faded duration-200"
          >
            Back
          </button>
          <button
            class="bg-primary text-white px-6 py-2 rounded-md"
            @click="
              currentFilter == 'dateOfOrder'
                ? updateDateOfOrder()
                : currentFilter == 'dateOfCall'
                ? updateDateOfCall()
                : ''
            "
          >
            apply
          </button>
        </div>
      </div>
      <!-- Actions -->
      <p
        v-if="error && currentFilter == 'filterList'"
        class="text-red-600 ml-6"
      >
        All filters are requried *
      </p>
      <div
        v-if="currentFilter == 'filterList'"
        class="flex space-x-4 justify-center items-center mb-10 w-full"
      >
        <button
          @click="resetData()"
          type="button"
          class="bg-transparent border border-black hover:border-primary hover:bg-primary hover:text-white duration-200 px-6 py-2 rounded-md"
        >
          Reset
        </button>
        <button
          @click="sendData()"
          class="bg-primary border border-primary text-white px-6 py-2 rounded-md hover:bg-primary-faded hover:border-primary-faded duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, onMounted } from "vue";
import { useBookingStore } from "../../stores/booking";
import { useToasterStore } from "../../stores/toaster";

const toasterStore = useToasterStore();
const bookingStore = useBookingStore();

const assigneeList = computed(() => {
  return bookingStore.callers;
});

const typeOfCall = ref(null);
const orderDate = ref([]);
const callDate = ref([]);
const dateOfOrder = ref(null);
const dateOfCall = ref(null);
const amount = ref(null);
const assignee = ref(null);
const status = ref(null);
const currentFilter = ref("filterList");
const error = ref(null);
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  console.log(endDate);
  orderDate.value = [undefined, startDate];
  callDate.value = [undefined, startDate];
});

const newFilterList = computed(() => {
  if (currentFilter.value == "filterList") {
    return filterList.value;
  } else if (currentFilter.value == "typeOfCall") {
    return typeOfCallList.value;
  } else if (currentFilter.value == "amount") {
    return amountList.value;
  } else if (currentFilter.value == "status") {
    return statusList.value;
  } else if (currentFilter.value == "assignees") {
    return assigneeList.value;
  }
});

// watch([typeOfCall, orderDate, callDate, amount, status], () => {
//   if (
//     typeOfCall.value != null &&
//     orderDate.value != null &&
//     callDate.value != null &&
//     amount.value != null &&
//     status.value != null &&
//     error.value == true
//   ) {
//     error.value = false;
//   }
// });

const filterList = ref([
  {
    name: "Type of Call",
    action: "typeOfCall",
    value: typeOfCall.value || null,
  },
  {
    name: "Date of Order",
    action: "dateOfOrder",
    value: dateOfOrder.value || "",
  },
  { name: "Date of Call", action: "dateOfCall", value: dateOfCall.value || "" },
  { name: "Pricing Package", action: "amount", value: amount.value || "" },
  { name: "Status", action: "status", value: status.value || "" },
  // { name: "Assignees", action: "assignees", value: status.value || "" },
]);

const typeOfCallList = ref([
  { name: "Apology", action: "apology" },
  { name: "Self-Love", action: "selfLove" },
  { name: "Celebratory", action: "celebatory" },
  { name: "Poetry", action: "poetry" },
  { name: "Appreciatory", action: "appreciatory" },
  { name: "Reachout", action: "reachout" },
]);

const amountList = ref([
  {
    name: "N 1,000",
    description: "Basic: Call is made by Ordinary Callers",
    action: 1000,
  },
  {
    name: "N 3,000",
    description: "Standard: Call is made by Experienced Callers",
    action: 3000,
  },
  {
    name: "N 5,000",
    description: "Premium: Call is made by CEO",
    action: 5000,
  },
]);

const statusList = ref([
  { name: "Pending", action: "PENDING" },
  { name: "Approved", action: "APPROVED" },
  { name: "Rejected", action: "REJECTED" },
  { name: "Assigned", action: "ASSIGNED" },
  { name: "In Progress", action: "IN_PROGRESS" },
  { name: "Completed", action: "COMPLETED" },
  { name: "Awaiting Feedback", action: "IN_PROGRESS" },
  { name: "On Hold", action: "ON_HOLD" },
]);

// Function to Update the Values
function setCurrentFilter(name: string) {
  currentFilter.value = name;
}
const updateTypeOfCall = (val) => {
  typeOfCall.value = val;
  const targetNumber = filterList.value.findIndex(
    (filter) => filter.action == currentFilter.value
  );
  const valName = typeOfCallList.value.find((type) => type.action == val);
  filterList.value[targetNumber].value = valName.name;
  currentFilter.value = "filterList";
};

const updateDateOfOrder = () => {
  const targetNumber = filterList.value.findIndex(
    (filter) => filter.action == currentFilter.value
  );
  // const valName = statusList.value.find((type) => type.action == val);
  filterList.value[targetNumber].value = `${new Date(
    orderDate.value[0]
  ).toLocaleDateString()} - ${new Date(
    orderDate.value[1]
  ).toLocaleDateString()} `;
  currentFilter.value = "filterList";
};
const updateDateOfCall = () => {
  const targetNumber = filterList.value.findIndex(
    (filter) => filter.action == currentFilter.value
  );
  // const valName = statusList.value.find((type) => type.action == val);
  filterList.value[targetNumber].value = `${new Date(
    callDate.value[0]
  ).toLocaleDateString()} - ${new Date(
    callDate.value[1]
  ).toLocaleDateString()}`;
  currentFilter.value = "filterList";
};
const updateAmount = (val) => {
  amount.value = val;
  const targetNumber = filterList.value.findIndex(
    (filter) => filter.action == currentFilter.value
  );
  const valName = amountList.value.find((type) => type.action == val);
  filterList.value[targetNumber].value = valName.name;
  currentFilter.value = "filterList";
};
const updateStatus = (val) => {
  status.value = val;
  const targetNumber = filterList.value.findIndex(
    (filter) => filter.action == currentFilter.value
  );
  const valName = statusList.value.find((type) => type.action == val);
  filterList.value[targetNumber].value = valName.name;
  currentFilter.value = "filterList";
};

const updateAssignees = (val: string) => {
  console.log(val);
  assignee.value = val;
  const targetNumber = filterList.value.findIndex(
    (filter) => filter.action == currentFilter.value
  );
  const valName = assigneeList.value.find((type) => type._id == val);
  filterList.value[targetNumber].value = valName.name;
  currentFilter.value = "filterList";
};

// Actions
const emits = defineEmits(["getNewFilter"]);

function resetData() {
  typeOfCall.value = null;
  orderDate.value = [undefined, undefined];
  callDate.value = [undefined, undefined];
  dateOfOrder.value = null;
  amount.value = null;
  status.value = null;
  currentFilter.value = "filterList";
  filterList.value.forEach((val) => (val.value = null));
}

function sendData() {
  const filterData = {
    category: typeOfCall.value,
    status: status.value,
    price: amount.value,
    assigneeId: assignee.value,
  };

  if (callDate && callDate.value[0] !== undefined) {
    filterData["customStartDateOfCall"] = new Date(
      callDate?.value[0]
    ).toISOString();
  }
  if (callDate && callDate.value[1] !== undefined) {
    filterData["customEndDateOfCall"] = new Date(
      callDate?.value[1]
    ).toISOString();
  }
  if (orderDate && orderDate.value[0] !== undefined) {
    filterData["customBookingStartDate"] = new Date(
      orderDate?.value[0]
    ).toISOString();
  }
  if (orderDate && orderDate.value[1] !== undefined) {
    filterData["customBookingEndDate"] = new Date(
      orderDate?.value[1]
    ).toISOString();
  }

  console.log(filterData);
  emits("getNewFilter", filterData);
}

watch([dateOfOrder, dateOfCall], () => {
  if (dateOfOrder.value == "last7days") {
    orderDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 7)),
      new Date(),
    ];
    console.log(orderDate.value);
  }
  if (dateOfCall.value == "last7days") {
    callDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 7)),
      new Date(),
    ];
  }
  if (dateOfOrder.value == "last14days") {
    orderDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 14)),
      new Date(),
    ];
  }
  if (dateOfCall.value == "last14days") {
    callDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 14)),
      new Date(),
    ];
  }
  if (dateOfOrder.value == "last30days") {
    orderDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 30)),
      new Date(),
    ];
  }
  if (dateOfCall.value == "last30days") {
    callDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 30)),
      new Date(),
    ];
  }
  if (dateOfOrder.value == "last3months") {
    orderDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 90)),
      new Date(),
    ];
  }
  if (dateOfCall.value == "last3months") {
    callDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 90)),
      new Date(),
    ];
  }
  if (dateOfOrder.value == "last12months") {
    orderDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 365)),
      new Date(),
    ];
  }
  if (dateOfCall.value == "last12months") {
    callDate.value = [
      new Date(new Date().setDate(new Date().getDate() - 365)),
      new Date(),
    ];
  }
});
</script>