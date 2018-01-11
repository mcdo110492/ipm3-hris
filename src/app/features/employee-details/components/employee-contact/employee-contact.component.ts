import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import { MobileInputMask } from "@shared/config";

import * as ContactActions from "./../../store/actions/employee-contact.action";
import * as fromContact from "./../../store/reducers/employee-contact.reducer";
import * as ContactSelectors from "./../../store/selectors/employee-contact.selector";
import { EmployeeContact } from "@app/features/employee-details/models";

@Component({
  selector: "app-employee-contact",
  templateUrl: "./employee-contact.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeContactComponent implements OnInit {
  contactForm: FormGroup;
  contactData$: Observable<EmployeeContact>;
  isLoading$: Observable<boolean>;
  mobileMask = MobileInputMask;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromContact.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.contactData$ = this.store$.select(ContactSelectors.getContactData);
    this.isLoading$ = this.store$.select(ContactSelectors.getContactIsLoading);

    this.store$.dispatch(new ContactActions.LoadContactInfo());

    this.contactData$.pipe(take(2)).subscribe((data: EmployeeContact) => {
      if (data !== null) {
        this.contactForm.patchValue(data);
      }
    });
  }

  createForm() {
    this.contactForm = this.fb.group({
      employeeContactId: [null, Validators.required],
      presentAddress: [null, [Validators.required, Validators.maxLength(150)]],
      provincialAddress: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      primaryMobileNumber: [
        null,
        [Validators.required, Validators.maxLength(50)]
      ],
      secondaryMobileNumber: [
        null,
        [Validators.required, Validators.maxLength(50)]
      ],
      telephoneNumber: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }

  save() {
    this.store$.dispatch(
      new ContactActions.SaveContactInfo(this.contactForm.value)
    );
  }
}
