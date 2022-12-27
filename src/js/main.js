import { SimpleDropzone } from "simple-dropzone";
import { Loader } from "./loader";

const dropEl = document.querySelector("#dropzone");
const inputEl = document.querySelector("#input");
const dropCtrl = new SimpleDropzone(dropEl, inputEl);

let loader = new Loader();

dropCtrl.on("drop", ({ files }) => {
	console.log(files);
	try {
		loader.load(files);
	}
	catch (e) {
		window.alert(e);
	}
});
