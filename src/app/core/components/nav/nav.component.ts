import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Role} from '../../models/user';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {faCalendarCheck, faCalendarPlus, faClipboard, faHospital, faUser} from '@fortawesome/free-regular-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public role: Role | null  = null;
  public Role = Role;
  public faClipboard = faClipboard;
  public faHospital = faHospital;
  public faCalendarCheck = faCalendarCheck;
  public faUser = faUser;
  public faCalendarPlus = faCalendarPlus;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.isLoggedIn$.pipe(untilDestroyed(this)).subscribe(isLoggedIn => {
      this.role = isLoggedIn;
    });
  }

  logout() {
    this._authService.logout();
  }
}
