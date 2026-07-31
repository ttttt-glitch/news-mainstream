import"./rolldown-runtime-CNC7AqOf.js";import{n as e,t}from"./react-BrRRJ8T6.js";import{t as n}from"./compiler-runtime-BwZ1Hg30.js";import{F as r,H as i,Mt as a,R as o,St as s,gt as c,jt as l}from"./dist-CFeGgecG.js";import{Go as u,Jo as d,Lo as f,Rl as p,Ro as m,Uo as h,Wo as g,Yo as _,Zo as v,ao as y,oo as b,pn as x,qo as S,ys as C}from"./index2-DDUb87VS.js";var w=e(),T=n();t(),p(),_(),d(),h(),S(),u(),g(),C(),v(),m(),f();var E=1,D=3,O=a(o).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>l`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[D]}px) {
      position: relative;
    }
  `),k=a(i).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return l`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[D]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[E]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function A(e){let t=(0,T.c)(12),n=c(),{state:i}=b(),{isOpen:a}=i,o=n<=E&&a?`hidden`:`auto`,l;t[0]===e?l=t[1]:(l=e.renderDefault(e),t[0]=e,t[1]=l);let u;t[2]!==o||t[3]!==l?(u=(0,w.jsx)(r,{flex:1,height:`fill`,overflow:o,children:l}),t[2]=o,t[3]=l,t[4]=u):u=t[4];let d;t[5]===a?d=t[6]:(d=a&&(0,w.jsx)(k,{zOffset:100,height:`fill`,children:(0,w.jsx)(x,{})}),t[5]=a,t[6]=d);let f;t[7]===d?f=t[8]:(f=(0,w.jsx)(s,{initial:!1,children:d}),t[7]=d,t[8]=f);let p;return t[9]!==u||t[10]!==f?(p=(0,w.jsxs)(O,{sizing:`border`,height:`fill`,children:[u,f]}),t[9]=u,t[10]=f,t[11]=p):p=t[11],p}function j(e){let t=(0,T.c)(4),{enabled:n}=y();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,w.jsx)(A,{...e}),t[2]=e,t[3]=r),r}export{j as TasksStudioActiveToolLayout};