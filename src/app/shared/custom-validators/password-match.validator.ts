import { AbstractControl } from "@angular/forms";

export class PasswordMatchValidtor {
  static MatchPassword(ac: AbstractControl) {
    let password = ac.get("password").value;
    let confirmPassword = ac.get("confirmPassword").value;

    if (password !== confirmPassword) {
      ac.get("confirmPassword").setErrors({ passwordMatch: true });
    } else {
      return null;
    }
  }
}
