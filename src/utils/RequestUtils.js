import {constructError} from "@/utils/ResponseUtils";
import Swal from "sweetalert2";

export const performHttpRequest = async (action) => {
  try {
    await action();
  } catch (e) {
    console.log('performHttpRequest', e);
    Swal.fire('Error', `Something wrong, please try again<br>Detail Error : ${constructError(e)}`, 'error')
  }
}

export const performDeleteRequest = async (action) => {
  Swal.fire({
    title: "Delete?",
    text: "Are you sure?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, Delete it!",
    closeOnCancel: true,
    allowOutsideClick: false
  }).then(async (result) => { // <--
    if (result.value) {
      await performDeleteRequest(action());
    }
  });
}
