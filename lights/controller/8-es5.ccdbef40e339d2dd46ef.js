function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,l){for(var t=0;t<l.length;t++){var u=l[t];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(n,u.key,u)}}function _createClass(n,l,t){return l&&_defineProperties(n.prototype,l),t&&_defineProperties(n,t),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"f+ep":function(n,l,t){"use strict";t.r(l);var u=t("8Y7J"),e=function(){function n(l,t,u){_classCallCheck(this,n),this.afAuth=t,this.router=u,this.title="lights"}return _createClass(n,[{key:"ngOnInit",value:function(){this.afAuth.authState.subscribe((function(n){console.log("Login State:",n)}))}},{key:"logout",value:function(){this.afAuth.auth.signOut()}},{key:"successCallback",value:function(n){console.log("successCallback",n),this.router.navigate(["controller"])}},{key:"errorCallback",value:function(n){console.warn("errorCallback",n)}}]),n}(),a=function n(){_classCallCheck(this,n)},o=t("pMnS"),i=t("IpyT"),b=t("b+hB"),c=t("irV9"),r=t("bujt"),s=t("Fwaw"),f=t("5GAg"),C=t("omvX"),h=t("iInd"),g=t("Xr7G"),k=u.qb({encapsulation:0,styles:[[""]],data:{}});function d(n){return u.Kb(0,[(n()(),u.sb(0,0,null,null,1,"firebase-ui",[],null,[[null,"signInSuccessWithAuthResult"],[null,"signInFailure"]],(function(n,l,t){var u=!0,e=n.component;return"signInSuccessWithAuthResult"===l&&(u=!1!==e.successCallback(t)&&u),"signInFailure"===l&&(u=!1!==e.errorCallback(t)&&u),u}),i.b,i.a)),u.rb(1,245760,null,0,b.b,[c.a,"firebaseUIAuthConfig","firebaseUIAuthConfigFeature",u.x,b.c],null,{signInSuccessWithAuthResultCallback:"signInSuccessWithAuthResult",signInFailureCallback:"signInFailure"}),(n()(),u.sb(2,0,null,null,2,"button",[["mat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.logout()&&u),u}),r.b,r.a)),u.rb(3,180224,null,0,s.b,[u.k,f.b,[2,C.a]],null,null),(n()(),u.Jb(-1,0,["Logout"])),(n()(),u.sb(5,0,null,null,4,"button",[["mat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(n,l,t){var e=!0;return"click"===l&&(e=!1!==u.Eb(n,7).onClick()&&e),e}),r.b,r.a)),u.rb(6,180224,null,0,s.b,[u.k,f.b,[2,C.a]],null,null),u.rb(7,16384,null,0,h.n,[h.m,h.a,[8,null],u.C,u.k],{routerLink:[0,"routerLink"]},null),u.Fb(8,1),(n()(),u.Jb(-1,0,["To second page"]))],(function(n,l){n(l,1,0);var t=n(l,8,0,"/controller");n(l,7,0,t)}),(function(n,l){n(l,2,0,u.Eb(l,3).disabled||null,"NoopAnimations"===u.Eb(l,3)._animationMode),n(l,5,0,u.Eb(l,6).disabled||null,"NoopAnimations"===u.Eb(l,6)._animationMode)}))}var p=u.ob("login",e,(function(n){return u.Kb(0,[(n()(),u.sb(0,0,null,null,1,"login",[],null,null,null,d,k)),u.rb(1,114688,null,0,e,[g.a,c.a,h.m],null,null)],(function(n,l){n(l,1,0)}),null)}),{},{},[]),m=t("SVse"),I=t("QQfA"),v=t("IP0z"),A=t("POq0"),_=t("JjoW"),w=t("Xd0L"),y=t("cUpR"),j=t("/HVE"),F=t("zMNK"),E=t("hOhj"),O=t("HsOI");t.d(l,"LoginModuleNgFactory",(function(){return P}));var P=u.pb(a,[],(function(n){return u.Bb([u.Cb(512,u.j,u.ab,[[8,[o.a,p]],[3,u.j],u.v]),u.Cb(4608,m.l,m.k,[u.s,[2,m.x]]),u.Cb(4608,I.c,I.c,[I.i,I.e,u.j,I.h,I.f,u.p,u.x,m.c,v.b,[2,m.f]]),u.Cb(5120,I.j,I.k,[I.c]),u.Cb(4608,A.c,A.c,[]),u.Cb(5120,_.a,_.b,[I.c]),u.Cb(4608,b.c,b.c,[c.a]),u.Cb(1073742336,m.b,m.b,[]),u.Cb(1073742336,v.a,v.a,[]),u.Cb(1073742336,w.j,w.j,[[2,w.c],[2,y.f]]),u.Cb(1073742336,j.b,j.b,[]),u.Cb(1073742336,w.s,w.s,[]),u.Cb(1073742336,s.c,s.c,[]),u.Cb(1073742336,F.f,F.f,[]),u.Cb(1073742336,E.b,E.b,[]),u.Cb(1073742336,I.g,I.g,[]),u.Cb(1073742336,w.q,w.q,[]),u.Cb(1073742336,w.o,w.o,[]),u.Cb(1073742336,A.d,A.d,[]),u.Cb(1073742336,O.d,O.d,[]),u.Cb(1073742336,_.d,_.d,[]),u.Cb(1073742336,b.a,b.a,[]),u.Cb(1073742336,h.o,h.o,[[2,h.t],[2,h.m]]),u.Cb(1073742336,a,a,[]),u.Cb(256,"firebaseUIAuthConfigFeature",{signInOptions:[b.d.auth.GoogleAuthProvider.PROVIDER_ID]},[]),u.Cb(1024,h.k,(function(){return[[{path:"",component:e}]]}),[])])}))}}]);