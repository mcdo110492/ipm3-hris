import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Injectable()
export class ToastrService {
  constructor(private toast: ToastsManager) {}

  loginSuccess() {
    const type = "success";
    const title = "Login Success";
    const message = "";
    this.custom(type, title, message);
  }

  saveSuccess() {
    const type = "success";
    const title = "Save Success";
    const message = "You' re Data has been saved";
    this.custom(type, title, message);
  }

  errorHandler(error: HttpErrorResponse) {
    if (error instanceof Error) {
      const type = "error";
      const title = "Client Error";
      const message =
        "There' s an error occured. Try to refresh your browser. If error persist contact your administrator";
      this.custom(type, title, message);
    } else {
      if (error.status == 500) {
        const type = "error";
        const title = "Server Error";
        const message =
          "There's an error occured while connecting to the server. Make sure you are connected to your network. If error persist contact your administrator";
        this.custom(type, title, message);
      } else if (error.status == 422) {
        const type = "warning";
        const title = "Form Data Inappropriate";
        const message =
          "You submitted a malformed data. Please make sure you meet the neccessary form requirements";

        this.custom(type, title, message);
      }
    }
  }

  custom(type: string, title: string, message: string) {
    switch (type) {
      case "success": {
        this.toast.success(message, title);
        break;
      }
      case "error": {
        this.toast.error(message, title);
        break;
      }
      case "info": {
        this.toast.info(message, title);
        break;
      }
      case "warning": {
        this.toast.warning(message, title);
        break;
      }
      default: {
        this.toast.success(message, title);
        break;
      }
    }
  }
}
