(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"f+ep":function(n,l,u){"use strict";u.r(l);var t=u("8Y7J");class a{constructor(n,l,u){this.afAuth=l,this.router=u,this.title="lights"}ngOnInit(){this.afAuth.authState.subscribe(n=>{console.log("Login State:",n)})}logout(){this.afAuth.auth.signOut()}successCallback(n){console.log("successCallback",n),this.router.navigate(["controller"])}errorCallback(n){console.warn("errorCallback",n)}}class b{}var o=u("pMnS"),i=u("IpyT"),s=u("b+hB"),c=u("irV9"),e=u("bujt"),r=u("Fwaw"),C=u("5GAg"),g=u("omvX"),h=u("iInd"),f=u("Xr7G"),d=t.qb({encapsulation:0,styles:[[""]],data:{}});function k(n){return t.Kb(0,[(n()(),t.sb(0,0,null,null,1,"firebase-ui",[],null,[[null,"signInSuccessWithAuthResult"],[null,"signInFailure"]],(function(n,l,u){var t=!0,a=n.component;return"signInSuccessWithAuthResult"===l&&(t=!1!==a.successCallback(u)&&t),"signInFailure"===l&&(t=!1!==a.errorCallback(u)&&t),t}),i.b,i.a)),t.rb(1,245760,null,0,s.b,[c.a,"firebaseUIAuthConfig","firebaseUIAuthConfigFeature",t.x,s.c],null,{signInSuccessWithAuthResultCallback:"signInSuccessWithAuthResult",signInFailureCallback:"signInFailure"}),(n()(),t.sb(2,0,null,null,2,"button",[["mat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(n,l,u){var t=!0;return"click"===l&&(t=!1!==n.component.logout()&&t),t}),e.b,e.a)),t.rb(3,180224,null,0,r.b,[t.k,C.b,[2,g.a]],null,null),(n()(),t.Jb(-1,0,["Logout"])),(n()(),t.sb(5,0,null,null,4,"button",[["mat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(n,l,u){var a=!0;return"click"===l&&(a=!1!==t.Eb(n,7).onClick()&&a),a}),e.b,e.a)),t.rb(6,180224,null,0,r.b,[t.k,C.b,[2,g.a]],null,null),t.rb(7,16384,null,0,h.n,[h.m,h.a,[8,null],t.C,t.k],{routerLink:[0,"routerLink"]},null),t.Fb(8,1),(n()(),t.Jb(-1,0,["To second page"]))],(function(n,l){n(l,1,0);var u=n(l,8,0,"/controller");n(l,7,0,u)}),(function(n,l){n(l,2,0,t.Eb(l,3).disabled||null,"NoopAnimations"===t.Eb(l,3)._animationMode),n(l,5,0,t.Eb(l,6).disabled||null,"NoopAnimations"===t.Eb(l,6)._animationMode)}))}function p(n){return t.Kb(0,[(n()(),t.sb(0,0,null,null,1,"login",[],null,null,null,k,d)),t.rb(1,114688,null,0,a,[f.a,c.a,h.m],null,null)],(function(n,l){n(l,1,0)}),null)}var I=t.ob("login",a,p,{},{},[]),m=u("SVse"),A=u("QQfA"),v=u("IP0z"),j=u("POq0"),w=u("JjoW"),F=u("Xd0L"),S=u("cUpR"),E=u("/HVE"),O=u("zMNK"),R=u("hOhj"),J=u("HsOI");u.d(l,"LoginModuleNgFactory",(function(){return L}));var L=t.pb(b,[],(function(n){return t.Bb([t.Cb(512,t.j,t.ab,[[8,[o.a,I]],[3,t.j],t.v]),t.Cb(4608,m.l,m.k,[t.s,[2,m.x]]),t.Cb(4608,A.c,A.c,[A.i,A.e,t.j,A.h,A.f,t.p,t.x,m.c,v.b,[2,m.f]]),t.Cb(5120,A.j,A.k,[A.c]),t.Cb(4608,j.c,j.c,[]),t.Cb(5120,w.a,w.b,[A.c]),t.Cb(4608,s.c,s.c,[c.a]),t.Cb(1073742336,m.b,m.b,[]),t.Cb(1073742336,v.a,v.a,[]),t.Cb(1073742336,F.j,F.j,[[2,F.c],[2,S.f]]),t.Cb(1073742336,E.b,E.b,[]),t.Cb(1073742336,F.s,F.s,[]),t.Cb(1073742336,r.c,r.c,[]),t.Cb(1073742336,O.f,O.f,[]),t.Cb(1073742336,R.b,R.b,[]),t.Cb(1073742336,A.g,A.g,[]),t.Cb(1073742336,F.q,F.q,[]),t.Cb(1073742336,F.o,F.o,[]),t.Cb(1073742336,j.d,j.d,[]),t.Cb(1073742336,J.d,J.d,[]),t.Cb(1073742336,w.d,w.d,[]),t.Cb(1073742336,s.a,s.a,[]),t.Cb(1073742336,h.o,h.o,[[2,h.t],[2,h.m]]),t.Cb(1073742336,b,b,[]),t.Cb(256,"firebaseUIAuthConfigFeature",{signInOptions:[s.d.auth.GoogleAuthProvider.PROVIDER_ID]},[]),t.Cb(1024,h.k,(function(){return[[{path:"",component:a}]]}),[])])}))}}]);