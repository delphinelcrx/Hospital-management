import { Component } from "@angular/core"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { Observable } from "rxjs"
import { map, shareReplay } from "rxjs/operators"
import { TranslocoService } from "@ngneat/transloco"
import { AuthService } from "src/app/shared/service/auth.service"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  constructor(private breakpointObserver: BreakpointObserver, private translocoService: TranslocoService, private authApi: AuthService) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  )

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang)
  }

  logout() {
    this.authApi.logout()
  }
}
