import { AuthService } from "src/app/shared/service/auth.service"
import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "hospital-management"
  userLoggedIn: boolean = false
  constructor(private authApi: AuthService) {}

  ngOnInit() {
    this.userLoggedIn = this.authApi.isUserLoggedIn()
  }
}
