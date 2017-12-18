import {Component, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import * as fromRoot from '../reducers';
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import * as layout from '../actions/layout';
import {Observable} from "rxjs";


@Component({
  selector: 'app-indigo-layout',
  template: `
    <md-sidenav-container fullscreen>
      <header class="site-header">
        <div class="wrapper">
          <a href="/" class="logo">
            <img src="assets/sprites/openbudgets-logo.svg" alt="OpenBudgets">
          </a>
          <nav>
            <ul>
              <li [routerLink]="['/upload']" routerLinkActive="active" >
                <a [routerLink]="['/upload']" routerLinkActive="active">Upload</a>
              </li>
              <li [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:
true}">
                <a  [routerLink]="['/']"  routerLinkActive="active" [routerLinkActiveOptions]="{exact:
true}" >Explore Data</a>
              </li>
            </ul>
          </nav>
        </div>
        <a id="cd-menu-trigger" href="#0"><span class="cd-menu-text">Menu</span><span class="cd-menu-icon"></span></a>
      </header>
      <main class="site" class="cd-main-content" fxLayout="column" fxLayoutAlign="center stretch">
        <div class="content home" fxLayout="column">
          <div class="banner">
            <div class="wrapper">
      <span>
        <h1>Upload, Visualize, Analyse public budget and spending data. Start exploring and learn stories behind budgets.
</h1>
      </span>
            </div>
          </div>
               <router-outlet></router-outlet>
        </div>
        <nav class="footer-nav">
          <ul>
            <li>
              <a href="http://openbudgets.github.io/about">About</a>
            </li>
            <li>
              <a href="http://openbudgets.github.io/about/work-packages">Work Packages</a>
            </li>
            <li>
              <a href="http://openbudgets.github.io/about/deliverables">Deliverables</a>
            </li>
            <li>
              <a href="http://openbudgets.github.io/about/technical-structure">Technical Structure</a>
            </li>
            <li>
              <a href="http://openbudgets.github.io/resources">Resources</a>
            </li>
          </ul>
        </nav>
      </main>
  `,
  styles: [`
    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .secondary {
      color: rgba(0, 0, 0, .54);
    }
    bc-nav-item {
      display: flex;
      padding: 10px;
    }
    bc-nav-item:focus {
      outline: none;
    }
    .footer {
      color: gainsboro;
      text-align: center;
      font-size: x-small;
      justify-content: center;
      display: flex;
    }
    .footer p {
      max-width: calc(90em * 0.5);
      padding: 10px;
    }
    .site {
      display: flex;
      flex-direction: column;
      min-height: 93.5vh;
    }
    .content {
      flex: 1;
    }
    md-sidenav-layout {
      color: white;
    / / right: 30 % !important;
    / / Make space for the devtools, demo only
    }
    md-sidenav {
      width: 300px;
      color: white;
    }
    .indigo {
      font-family: 'Leckerli One', cursive;
      color: white;
    }
    .md-button-wrapper {
      color: #29367f;
    }
  `]
})
export class LayoutComponent {

  constructor(private store: Store<fromRoot.State>, viewContainerRef: ViewContainerRef, private route: ActivatedRoute, private ref: ChangeDetectorRef) {
    this.showSidenav$ = this.store.let(fromRoot.getShowSidenav);

  }

  showSidenav$: Observable<boolean>;


  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }
}
