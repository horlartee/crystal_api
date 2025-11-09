<template>
	<div class="component">
		<v-otp-input
			ref="otpInput"
			input-classes="otp-input"
			separator="-"
			:num-inputs="4"
			:should-auto-focus="true"
			:is-input-num="true"
			:conditionalClass="['one', 'two', 'three', 'four']"
			@on-change="handleOnChange"
			@on-complete="handleOnComplete"
		/>
	</div>
</template>

<script setup>
import VOtpInput from "vue3-otp-input";

const emit = defineEmits(["on-complete"]);

const otpInput = ref(null);

const handleOnComplete = (value) => {
	emit("on-complete", value);
};

const handleOnChange = (value) => {
	// console.log("OTP changed: ", value);
};
</script>

<style>
.component .otp-input {
	width: 40px;
	height: 40px;
	padding: 5px;
	margin: 0 10px;
	font-size: 20px;
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, 0.3);
	text-align: center;
}
/* Background colour of an input field with value */
.component .otp-input.is-complete {
	background-color: #e4e4e4;
}
.component .otp-input::-webkit-inner-spin-button,
.component .otp-input::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.component input::placeholder {
	font-size: 15px;
	text-align: center;
	font-weight: 600;
}
</style>
