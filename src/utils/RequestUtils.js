import {constructError} from "@/utils/ResponseUtils";
import Swal from "sweetalert2";

export const performHttpRequest = async (action) => {
  try {
    await action();
  } catch (e) {
    Swal.fire('Error', `Terjadi kesalahan, Silahkan coba lagi<br>Detail Error : ${constructError(e)}`, 'error')
  }
}
