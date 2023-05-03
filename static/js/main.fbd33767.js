(()=>{"use strict";var e={9440:(e,t,o)=>{o.r(t);var n=o(5629),r=o(5861),i=o(885),l=o(4552),a=o(9526),d=o(3292),s=o(8859),c=o(7132),m=o(4637),p=o(9233),f=o(3497),u=o(1133),g=o(3020),x=o(5060),b=o(7557);const h=function(e){var t=e.emoji,o=e.label,n=e.percentage,r=e.selected;return(0,b.jsxs)(l.StyledComponent,{className:"flex items-center m-2 px-4 py-2 rounded-lg "+(r?"bg-lime-400":"bg-yellow-200"),component:u.default,children:[(0,b.jsx)(l.StyledComponent,{className:"text-3xl",component:p.default,children:t}),(0,b.jsx)(l.StyledComponent,{className:"text-sm font-semibold dark",component:p.default,children:o}),(0,b.jsxs)(l.StyledComponent,{className:"text-sm",component:p.default,children:[n%1===0?n:n.toFixed(2),"%"]})]})};l.NativeWindStyleSheet.create({styles:{"m-2":{marginTop:8,marginRight:8,marginBottom:8,marginLeft:8},flex:{display:"flex"},"items-center":{alignItems:"center"},"rounded-lg":{borderTopLeftRadius:8,borderTopRightRadius:8,borderBottomRightRadius:8,borderBottomLeftRadius:8},"bg-lime-400":{backgroundColor:"#a3e635"},"bg-yellow-200":{backgroundColor:"#fef08a"},"px-4":{paddingLeft:16,paddingRight:16},"py-2":{paddingTop:8,paddingBottom:8},"font-semibold":{fontWeight:"600"},"text-3xl":{fontSize:30,lineHeight:36},"text-sm":{fontSize:14,lineHeight:20}}});const y=function(e){var t=e.prediction;return(0,b.jsx)(b.Fragment,{children:t&&(0,b.jsx)(l.StyledComponent,{className:"flex justify-center items-center",component:u.default,children:(0,b.jsxs)(l.StyledComponent,{className:"flex-row justify-center flex-wrap mt-2 max-w-sm",component:u.default,children:[(0,b.jsx)(h,{emoji:"\ud83d\ude32",label:"Surprise",percentage:t.probabilities[1],selected:1==t.predicted}),(0,b.jsx)(h,{emoji:"\ud83d\ude0a",label:"Happiness",percentage:t.probabilities[2],selected:2==t.predicted}),(0,b.jsx)(h,{emoji:"\ud83d\ude20",label:"Anger",percentage:t.probabilities[3],selected:3==t.predicted}),(0,b.jsx)(h,{emoji:"\ud83d\ude28",label:"Fear",percentage:t.probabilities[4],selected:4==t.predicted}),(0,b.jsx)(h,{emoji:"\ud83e\udd22",label:"Disgust",percentage:t.probabilities[5],selected:5==t.predicted}),(0,b.jsx)(h,{emoji:"\ud83d\ude22",label:"Sadness",percentage:t.probabilities[6],selected:6==t.predicted})]})})})};l.NativeWindStyleSheet.create({styles:{"mt-2":{marginTop:8},flex:{display:"flex"},"max-w-sm":{maxWidth:384},"flex-row":{flexDirection:"row"},"flex-wrap":{flexWrap:"wrap"},"items-center":{alignItems:"center"},"justify-center":{justifyContent:"center"}}});var w=o(6032),j=o(9899),v=o(6418);const S=function(e){var t=e.progress,o=(0,l.useColorScheme)().colorScheme;return(0,b.jsx)(b.Fragment,{children:t&&(0,b.jsxs)(l.StyledComponent,{className:"flex-1 absolute left-0 top-0 w-full h-full items-center justify-center bg-white dark:bg-neutral-900",component:u.default,children:[(0,b.jsx)(l.StyledComponent,{source:v,className:"w-80 h-80 rounded-xl",component:j.default}),(0,b.jsxs)(l.StyledComponent,{className:"flex-row items-center justify-center",component:u.default,children:[(0,b.jsx)(w.default,{size:"large",color:"dark"===o?"white":"black"}),(0,b.jsx)(l.StyledComponent,{className:"m-8 text-lg font-semibold dark:text-white",component:p.default,children:t})]})]})})};l.NativeWindStyleSheet.create({styles:{absolute:{position:"absolute"},"left-0":{left:0},"top-0":{top:0},"m-8":{marginTop:32,marginRight:32,marginBottom:32,marginLeft:32},"h-full":{height:"100%"},"h-80":{height:320},"w-full":{width:"100%"},"w-80":{width:320},"flex-1":{flexGrow:1,flexShrink:1},"flex-row":{flexDirection:"row"},"items-center":{alignItems:"center"},"justify-center":{justifyContent:"center"},"rounded-xl":{borderTopLeftRadius:12,borderTopRightRadius:12,borderBottomRightRadius:12,borderBottomLeftRadius:12},"bg-white":{backgroundColor:"#fff"},"font-semibold":{fontWeight:"600"},"text-lg":{fontSize:18,lineHeight:28},".dark:bg-neutral-900":{backgroundColor:"#171717"},".dark:text-white":{color:"#fff"}}});var k=o(3144),C=o(5671),R=o(5466),N=(0,k.default)((function e(){(0,C.default)(this,e),this.loadSession=function(){var e=(0,r.default)((function*(e){try{window.session=yield R.InferenceSession.create("/skripsi-app/static/model/"+e),console.log("Session loaded!")}catch(t){throw alert("Can't load model!"),t}}));return function(t){return e.apply(this,arguments)}}(),this.predict=function(){var e=(0,r.default)((function*(e){var t,o=window.session;o||alert("Model is not loaded!");var n=new R.Tensor("string",[e],[1,1]);return yield o.run({words:n}).then((function(e){t={predicted:e.label.data[0],probabilities:Array.from(e.probabilities.data).map((function(e){return 100*e}))}})).catch((function(e){throw alert("Failed to predict!."),e})),t}));return function(t){return e.apply(this,arguments)}}()})),T=(0,k.default)((function e(){var t=this;(0,C.default)(this,e),this.init=(0,r.default)((function*(){yield window.pyodide.runPythonAsync("\n      import re\n      import string\n      import unicodedata\n      from Sastrawi.Stemmer.StemmerFactory import StemmerFactory\n      from indoNLP.preprocessing import (emoji_to_words, remove_html,\n          remove_url, replace_slang, replace_word_elongation\n      )\n      \n      factory = StemmerFactory()\n      STEMMER = factory.create_stemmer()\n    ")})),this.preprocessing=window.pyodide.runPython('\n    def preprocessing(text):\n        text = text.lower()\n        text = re.sub(r"\\s+", " ", text, flags=re.UNICODE)  # remove whitespace\n        text = emoji_to_words(text)  # remove emoji\n        text = unicodedata.normalize("NFD", text).encode("ascii", "ignore").decode("ascii")\n        text = remove_html(text)  # remove html tags\n        text = remove_url(text)  # remove url\n        text = replace_word_elongation(text)\n        text = replace_slang(text)  # replace slang words\n        # text = remove_stopwords(text)\n        text = text.translate(str.maketrans("", "", string.digits))  # remove numbers\n        text = text.translate(\n            str.maketrans(string.punctuation, " " * len(string.punctuation))\n        )  # remove punctuation\n        text = " ".join(text.split())\n        text = STEMMER.stem(text)\n        return " ".join(text.split())\n    preprocessing\n    '),this.run=function(e){return t.preprocessing(e)}}));const L=function(){var e=(0,a.useState)("Loading Model..."),t=(0,i.default)(e,2),o=t[0],n=t[1],h=(0,a.useState)(""),w=(0,i.default)(h,2),j=w[0],v=w[1],k=(0,a.useState)(null),C=(0,i.default)(k,2),R=C[0],L=C[1],O=(0,l.useColorScheme)(),_=O.colorScheme,P=O.setColorScheme,B=new N,W=(0,a.useState)("model-svm-linear-small.ort"),E=(0,i.default)(W,2),z=E[0],D=E[1],F=(0,a.useRef)(null),I=function(){var e=(0,r.default)((function*(){if(""!==j){var e,t=null==(e=F.current)?void 0:e.run(j),o=yield B.predict(t);o&&L(o)}else s.default.alert("Null text submitted!","Please type a text to detect.")}));return function(){return e.apply(this,arguments)}}();return(0,a.useEffect)((function(){"web"===c.default.OS&&(document.getElementsByTagName("html")[0].className="dark"===_?"dark":"")}),[_]),(0,a.useEffect)((function(){var e=function(){var e=(0,r.default)((function*(){if(yield B.loadSession(z),"web"===c.default.OS){n("Loading Pyodide...");var e=yield loadPyodide();yield e.loadPackage("micropip");var t=e.pyimport("micropip");n("Installing pydeps on pyodide..."),yield t.install(["indoNLP","PySastrawi"]),window.pyodide=e}F.current=new T,yield F.current.init(),n(null)}));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,b.jsxs)(l.StyledComponent,{className:"flex-1 bg-white dark:bg-neutral-900",component:u.default,children:[(0,b.jsxs)(l.StyledComponent,{className:"flex-1 items-center justify-between mx-4 mb-4 "+("web"===c.default.OS?"mt-4":"mt-9"),component:u.default,children:[(0,b.jsxs)(l.StyledComponent,{className:"flex-row items-center w-full justify-between",component:u.default,children:[(0,b.jsx)(l.StyledComponent,{className:"px-2.5 pt-1.5 pb-2 bg-black dark:bg-violet-900 rounded-lg",component:u.default,children:(0,b.jsx)(l.StyledComponent,{className:"text-3xl text-white font-semibold",component:p.default,children:"Showcase"})}),(0,b.jsx)(m.default,{onPress:function(){P("dark"===_?"light":"dark")},children:"dark"===_?(0,b.jsx)(g.default,{name:"weather-sunny",size:35,color:"white"}):(0,b.jsx)(g.default,{name:"weather-night",size:35,color:"black"})})]}),(0,b.jsxs)(l.StyledComponent,{className:"flex items-center w-full",component:u.default,children:[(0,b.jsxs)(l.StyledComponent,{className:"flex items-center justify-center",component:u.default,children:[(0,b.jsx)(l.StyledComponent,{className:"text-3xl font-semibold text-center dark:text-white",component:p.default,children:"Emotion Detector [ID]"}),(0,b.jsxs)(l.StyledComponent,{className:"text-sm text-center mx-2 dark:text-white",component:p.default,children:["Text emotion detector using ",(0,b.jsx)(l.StyledComponent,{className:"font-bold",component:p.default,children:"SVM"})," live in"," ","web"===c.default.OS?"browser":"mobile"," powered by",(0,b.jsx)(l.StyledComponent,{className:"text-sm font-bold italic",component:p.default,children:"web"===c.default.OS?" onnxruntime-web":" onnxruntime-mobile"})]}),"web"===c.default.OS&&(0,b.jsxs)(x.Picker,{style:{marginTop:"6px",padding:"5px",paddingTop:"3px",backgroundColor:"black",color:"#A3E635",borderRadius:4,fontSize:14,lineHeight:20},selectedValue:z,onValueChange:function(){var e=(0,r.default)((function*(e){n("Loading model "+e),yield B.loadSession(e),D(e),n(null)}));return function(t){return e.apply(this,arguments)}}(),children:[(0,b.jsx)(x.Picker.Item,{label:"model-svm-linear-small.ort",value:"model-svm-linear-small.ort"}),(0,b.jsx)(x.Picker.Item,{label:"model-svm-linear-medium.ort",value:"model-svm-linear-medium.ort"}),(0,b.jsx)(x.Picker.Item,{label:"model-svm-linear-large.ort",value:"model-svm-linear-large.ort"})]})]}),(0,b.jsxs)(l.StyledComponent,{className:"flex w-full max-w-[550px] mb-4 mt-3",component:u.default,children:[(0,b.jsx)(l.StyledComponent,{onChangeText:v,value:j,placeholder:"Any words to detect?",multiline:!0,className:"p-3 mx-5 border rounded text-md text-center dark:border-violet-800 dark:text-white",onKeyPress:function(e){e.nativeEvent.ctrlKey&&"Enter"==e.nativeEvent.key?(e.preventDefault(),I()):e.nativeEvent.ctrlKey&&"Backspace"==e.nativeEvent.key&&(e.preventDefault(),v(""),L(null))},component:f.default}),(0,b.jsxs)(l.StyledComponent,{className:"flex-row justify-center mt-4",component:u.default,children:[(0,b.jsx)(l.StyledComponent,{className:"bg-black p-2.5 pt-3 rounded mx-2 dark:bg-violet-800",onPress:I,component:m.default,children:(0,b.jsx)(l.StyledComponent,{className:"text-white font-bold",component:p.default,children:"Predict"})}),(0,b.jsx)(l.StyledComponent,{className:"bg-transparent border-2 border-black p-2.5 rounded mx-2 dark:border-violet-800",onPress:function(){v(""),L(null)},component:m.default,children:(0,b.jsx)(l.StyledComponent,{className:"font-bold dark:text-violet-800",component:p.default,children:"Reset"})})]}),(0,b.jsx)(y,{prediction:R})]})]}),(0,b.jsx)(u.default,{children:(0,b.jsxs)(l.StyledComponent,{className:"text-base text-center dark:text-white",component:p.default,children:[(0,b.jsxs)(l.StyledComponent,{className:"font-bold",component:p.default,children:["Copyright \xa9 ",(new Date).getFullYear()," Wahyu Setianto"]}),", Built with React Native and ","\u2764"]})}),(0,b.jsx)(d.default,{style:"auto"})]}),(0,b.jsx)(S,{progress:o})]})};l.NativeWindStyleSheet.create({styles:{"mx-4":{marginLeft:16,marginRight:16},"mx-2":{marginLeft:8,marginRight:8},"mx-5":{marginLeft:20,marginRight:20},"mb-4":{marginBottom:16},"mt-4":{marginTop:16},"mt-9":{marginTop:36},"mt-3":{marginTop:12},flex:{display:"flex"},"w-full":{width:"100%"},"max-w-[550px]":{maxWidth:550},"flex-1":{flexGrow:1,flexShrink:1},"flex-row":{flexDirection:"row"},"items-center":{alignItems:"center"},"justify-center":{justifyContent:"center"},"justify-between":{justifyContent:"space-between"},"rounded-lg":{borderTopLeftRadius:8,borderTopRightRadius:8,borderBottomRightRadius:8,borderBottomLeftRadius:8},rounded:{borderTopLeftRadius:4,borderTopRightRadius:4,borderBottomRightRadius:4,borderBottomLeftRadius:4},border:{borderTopWidth:1,borderRightWidth:1,borderBottomWidth:1,borderLeftWidth:1},"border-2":{borderTopWidth:2,borderRightWidth:2,borderBottomWidth:2,borderLeftWidth:2},"border-black":{borderTopColor:"#000",borderRightColor:"#000",borderBottomColor:"#000",borderLeftColor:"#000"},"bg-white":{backgroundColor:"#fff"},"bg-black":{backgroundColor:"#000"},"bg-transparent":{backgroundColor:"transparent"},"p-3":{paddingTop:12,paddingRight:12,paddingBottom:12,paddingLeft:12},"p-2.5":{paddingTop:10,paddingRight:10,paddingBottom:10,paddingLeft:10},"p-2":{paddingTop:8,paddingRight:8,paddingBottom:8,paddingLeft:8},"px-2.5":{paddingLeft:10,paddingRight:10},"px-2":{paddingLeft:8,paddingRight:8},"pt-1.5":{paddingTop:6},"pb-2":{paddingBottom:8},"pt-1":{paddingTop:4},"pt-3":{paddingTop:12},"text-center":{textAlign:"center"},"font-semibold":{fontWeight:"600"},"font-bold":{fontWeight:"700"},italic:{fontStyle:"italic"},"text-white":{color:"#fff"},"text-3xl":{fontSize:30,lineHeight:36},"text-sm":{fontSize:14,lineHeight:20},"text-base":{fontSize:16,lineHeight:24},".dark:border-violet-800":{borderTopColor:"#5b21b6",borderRightColor:"#5b21b6",borderBottomColor:"#5b21b6",borderLeftColor:"#5b21b6"},".dark:bg-neutral-900":{backgroundColor:"#171717"},".dark:bg-violet-900":{backgroundColor:"#4c1d95"},".dark:bg-violet-800":{backgroundColor:"#5b21b6"},".dark:text-white":{color:"#fff"},".dark:text-violet-800":{color:"#5b21b6"}}}),(0,n.default)(L)},6418:(e,t,o)=>{e.exports=o.p+"static/media/loading.aefac1ac8ff7517b45dc.png"}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.m=e,(()=>{var e=[];o.O=(t,n,r,i)=>{if(!n){var l=1/0;for(c=0;c<e.length;c++){for(var[n,r,i]=e[c],a=!0,d=0;d<n.length;d++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](n[d])))?n.splice(d--,1):(a=!1,i<l&&(l=i));if(a){e.splice(c--,1);var s=r();void 0!==s&&(t=s)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,r,i]}})(),o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;o.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"===typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"===typeof n.then)return n}var i=Object.create(null);o.r(i);var l={};e=e||[null,t({}),t([]),t(t)];for(var a=2&r&&n;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>l[e]=()=>n[e]));return l.default=()=>n,o.d(i,l),i}})(),o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="/skripsi-app/",(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[l,a,d]=n,s=0;if(l.some((t=>0!==e[t]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(d)var c=d(o)}for(t&&t(n);s<l.length;s++)i=l[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},n=self.webpackChunkweb=self.webpackChunkweb||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=o.O(void 0,[787],(()=>o(9440)));n=o.O(n)})();
//# sourceMappingURL=main.fbd33767.js.map