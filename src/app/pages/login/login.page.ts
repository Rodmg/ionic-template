import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services";
import { first } from "rxjs/operators";
import { UiLoadingService } from "src/app/services/ui-loading.service";
import { IonInput } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  error: any = null;

  initialEmail = "";

  @ViewChild("email", { static: false }) emailField: IonInput;
  @ViewChild("password", { static: false }) passwordField: IonInput;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private loader: UiLoadingService
  ) {}

  ngOnInit() {
    this.initialEmail = this.route.snapshot.queryParams.email || "";
    this.loginForm = this.formBuilder.group({
      email: [this.initialEmail, [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
    // reset login status
    this.authService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = "/"; // this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  ionViewDidEnter() {
    setTimeout(() => {
      if (this.initialEmail.length) {
        this.passwordField.setFocus();
      } else {
        this.emailField.setFocus();
      }
    }, 1000);
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.error = null;
    const { email, password } = this.loginForm.value;
    if (email && password) {
      await this.loader.present();
      this.authService
        .login(email, password)
        .pipe(first())
        .subscribe(
          _ => {
            this.router.navigate([this.returnUrl]);
          },
          async error => {
            this.error = error;
            await this.loader.dismiss();
          },
          async () => {
            await this.loader.dismiss();
          }
        );
    }
  }
}
