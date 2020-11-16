# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.11.1] (2020-09-21)


### Bug Fixes

* **vue:** step back and bundle esm output ([67b84df])





# [0.11.0] (2020-09-21)


### Features

* **vue:** support table column width in string ([4e9a341])


### Performance Improvements

* **vue:** output unbundled but compiled files ([e46697d]), closes [#193]





## [0.10.1] (2020-08-26)

**Note:** Version bump only for package @clair/vue





# [0.10.0] (2020-08-25)


### Bug Fixes

* **vue:** unify observer behavior cross platform ([d3fab3d])


### Features

* **vue:** add ghost button ([0825e59]), closes [#52] [#75]
* **vue:** update position when elements resize ([8f70407])
* **vue:** update position when panel content resize ([6d46d80])





# [0.9.0] (2020-07-16)


### Bug Fixes

* **vue:** fix some issues of cascader ([8508269]), closes [#180] [#188]
* **vue:** make table shadow reactive to columns' change ([9a5115c]), closes [#186]


### Features

* **react:** add select component ([c7defd6]), closes [#17]
* **vue:** add tree component ([281b8ac]), closes [#80]
* **vue:** simplify event interface and fix lazy load issue ([de91c04]), closes [#189]





## [0.8.1] (2020-06-25)


### Bug Fixes

* **vue:** fix ssr issue ([050470b])





# [0.8.0] (2020-06-23)


### Bug Fixes

* **vue:** avoid false positive of all selected state ([8314443]), closes [#181] [#181]
* **vue:** focus on confirm button after modal appear ([f9d78d0])
* **vue:** upgrade rollup plugins to the latest ([dc520f0])


### Features

* **react:** add DatePicker and RangePicker component ([4c13f5b]), closes [#147]
* **theme-default:** add selected background for table row ([4530d90])





# [0.7.0] (2020-05-21)


### Bug Fixes

* **vue:** avoid depending on \`regenerator-runtime\` ([e3d382b])
* **vue:** avoid unwanted change event from checkbox ([ea3bf4d])
* **vue:** externalize \`@babel/runtime\` ([2f456e8])
* **vue:** handle float page number input ([25c61a1]), closes [#155]
* **vue:** leave nullish default value untouched ([c734d19])
* **vue:** make selected option scroll into view ([f8965bc])
* **vue:** render tag text with valid \`color\` ([c71b555])
* **vue:** use \`class\` instead of \`className\` in jsx ([fcce0b7]), closes [#173]
* **vue:** use new id prefix for switch ([da8e889]), closes [#172]


### Features

* **eslint-plugin:** init eslint-plugin ([16ddca5]), closes [#173]
* **helpers:** update placement direction accordingly ([203bfe1])
* **vue:** improve control over rendering modal's footer ([ce320d9]), closes [#176]
* **vue:** support path like prop ([7efd7b3]), closes [#111]





# [0.6.0] (2020-04-30)


### Bug Fixes

* **vue:** emit correct item-key when using menu-item with slot ([86f387d]), closes [#158]
* **vue:** emit correct value with \`press-enter\` event ([efde794])
* **vue:** fix typos in changelog ([d3d65f3])
* **vue:** respond to resize/scroll event right after first render ([77884c3]), closes [#162]
* **vue:** update cascader-panel properly when `options` changed ([8bf974a]), closes [#148]


### Features

* **vue:** add \`input-attrs\` to input ([84a1785]), closes [#163] [#167]





# [0.5.0] (2020-04-16)


### Bug Fixes

* hide modal as soon as mousedown is triggered on mask ([35c3f2b])
* **vue:** fix active menu-item not clickable ([75a9cb5]), closes [#159]


### Features

* **vue:** add \`append-target\` props to cascader ([ba7b70b])





# [0.4.0] (2020-04-09)


### Bug Fixes

* **vue:** avoid calling \`onLeave\` and \`onAfterLeave\` twice ([3a8a70c]), closes [#151]
* **vue:** avoid excessive validation of change event ([ee35b7a])
* **vue:** disallow non-number input to pagination's jumper ([e7f8273]), closes [#150]
* **vue:** emit \`change\` event properly ([c597852])
* **vue:** scroll option into view when operating with keyboard ([1089d1f]), closes [#153]
* **vue:** support programmatic update of tabs ([757f838])


### Features

* **react:** refocus on the previously focused element after modal exit ([5b3257a])
* **theme-default:** add a new transition to popover ([4ba1128]), closes [#139]
* **vue:** enable styling message and notification ([4798374])





## [0.3.3] (2020-03-26)


### Bug Fixes

* **vue:** enable time-picker to trigger form validation ([2284591]), closes [#142]
* **vue:** stop calling \`router.push\` with same \`to\` repeatedly ([3f4f17f])
* **vue:** use esm format bundle for \`browser\` field ([1a72efc])





## [0.3.2] (2020-03-05)

**Note:** Version bump only for package @clair/vue





## [0.3.1] (2020-02-27)


### Bug Fixes

* **vue:** handle immediate loading update ([966f2e7])
* **vue:** stop updating id on checkbox for every render ([dbfd7af])





# [0.3.0] (2020-02-20)


### Bug Fixes

* **vue:** make \`stroke-color\` work for circular progress ([5ccb6cd])


### Features

* **vue:** add \`custom-class\` and \`custom-style\` to modal ([cedfae8])





# [0.2.0] (2020-02-06)


### Bug Fixes

* **vue:** do not scroll into viewport when focus within modal ([d85ad18])
* **vue:** emit events after blur instead of focus ([a135aea])
* **vue:** make height of collapse-item's content flexible ([c77391f])
* **vue:** pass \`transition\` down to popover ([58f5fb0])
* **vue:** pass \`transition\` down to popover ([736c971])
* **vue:** update select's `displayValue` correctly ([48d8390]), closes [#138]


### Features

* **vue:** support using component as description ([1f24d7c])





# [0.1.0] (2020-01-09)


### Features

* **vue:** control row's selection and expansion ([a78c656])





## [0.0.14] (2019-12-26)


### Bug Fixes

* **vue:** make \`v-model\` on textarea work ([5b6155e])
* **vue:** refine cursor style for select ([4c833d3])


### Performance Improvements

* **vue:** use \`lodash-es\` and add deps to externals(esm only) ([c4c7538])





## <small>0.0.13 (2019-12-19)</small>

* fix(vue): rename import path from  \`datepicker\` to \`date-picker\` ([4b55a4d])


## <small>0.0.12 (2019-12-19)</small>

* fix(vue): emit \`focus\` and \`blur\` more consistently ([14f07638])
* docs(vue): add notice for validating string type with \`required: true\` ([afc4ce1a])
* fix(vue): make sure loading stay on top ([be69d844])
* fix(vue): use \`update:value\` for input's v-model control ([72e3428b])
* docs(vue): update getting-started ([af19e2c3])
* fix(vue): adopt mobile first for grid ([8a459b3e])
* fix(vue): do not show clear icon when disabled ([aacfa4bc])
* fix(vue): make \`visible\` prop work as design ([b7f89746])
* fix(vue): calculate position only after panel is visible ([c30e590d])





## <small>0.0.11 (2019-12-16)</small>

* docs(vue): update changelog for website ([bd27e55])




## <small>0.0.10 (2019-12-15)</small>

* fix(sites): fix download link of sketch template for dashboard project ([61ed862])
* fix(sites): fix width of last item in resources page ([92cf964])
* fix(vue): destroy modal instance after close ([b6ad835])
* fix(vue): make popover able to receive focus when \`focus\` is a trigger ([362c6b6])
* fix(vue): update clear and emit logic ([1f7ccc4])
* docs(vue): add description for \`this.$modal\` usage ([40ed838])
* docs(vue): add description for cascader's demos ([54b7511])
* docs(vue): add missing date for changelog ([ffd6006])
* docs(vue): polish demo's style ([860857c])
* docs(vue): udpate notification's word-break rule ([c12b156])
* docs(vue): unify punctuation ([3b5968f])
* docs(vue): update cascader's demos ([d6483d2])
* docs(vue): update changelog for website ([aed92e5])
* docs(vue): update layout of buttons in popover's demos ([fcaf600])
* docs(vue): update layout of date-pickers in demos ([7c6471d])
* docs(vue): update tooltip's placement demo ([e1859fd])
* refactor(vue): use different approach to style timeline ([22ab650])
* feat(vue): add \`readonly\` props to input ([88d122e])




## <small>0.0.9 (2019-12-12)</small>

* fix(vue): disable select-all when there is no data ([d328e1e])
* fix(vue): do not emit `change` when the value is the same ([683399a])
* fix(vue): export date-picker and time-picker in esm ([2cf99bd])
* fix(vue): set select's default placement to \`bottom-left\` ([6a30f85])
* docs(vue): add more details of \`registerEmitDirective\` ([05ca876])
* docs(vue): add placeholder for template resource ([6405506])
* docs(vue): update changelog for website ([15d7d26])
* docs(vue): use `<div />` as slot in timeline's demo ([c3073d0])
* chore(vue): fix import syntax ([a2ae731])
* chore(vue): make rollup and jest work with each other ([5eab798])
* chore(vue): override some styles to remove quirk behavior ([780eb18])
* refactor(vue): export whole package as a single object in umd ([b76dee8])
* feat(vue): add \`registerEmitDirective\` ([313b71f])
* feat(vue): add \`v-model\` to modal component ([b3465db])




## <small>0.0.8 (2019-12-06)</small>

* fix(vue): use \`.babelrc.js\` for build ([8663ee7])
* docs(vue): fix props table for time-picker and date-picker ([ebedd17])
* docs(vue): update changelog for website ([531ac7c])




## <small>0.0.7 (2019-12-05)</small>

* feat(vue): add datepicker component ([f66f1e4])
* feat(vue): add time-picker component ([b6428df])
* feat(vue): add timeline component ([6bb4d9a])
* feat(vue): export timeline in esm ([ba12d50])
* feat(vue): expose all event listeners on popover ([b005293])
* feat(vue): update signature of alert close event parameter ([7d20625])
* feat(vue): update signature of tag close event parameter ([a88d012])
* refactor(vue): update reference of trigger element in dropdown ([4b53abd])
* fix(vue): avoid overly using capture for popover ([1ff13ee])
* docs(vue): fix typos and format ([d4f9cad])
* docs(vue): update changelog for website ([6a5d44e])
* docs(vue): update description of table's \`selected-change\` event ([1705bce])
* docs(vue): update icons' layout ([418ea8f])
* perf(vue): reduce listeners to MediaQueryList ([a50e083])


### BREAKING CHANGE

* Change signature of alert close event
* Change signature of tag close event



## <small>0.0.6 (2019-11-29)</small>

* fix(vue): allow pass customClass to popover in array and object ([caf7e6c])
* fix(vue): display placeholder for certain cases ([cd9b1b0])
* fix(vue): don't display exceeding number in v-model use case ([6079145])
* fix(vue): update slider's tooltip in time ([005b794])
* fix(vue): use inline-block for popover's trigger container ([af4354d])
* docs(vue): update changelog for website ([108985a])
* docs(vue): update table example about editing row data ([7a09c07])




## <small>0.0.5 (2019-11-22)</small>

* fix(vue): ensure step's \`status\` is reactive ([5c3b834]), closes [#132]
* fix(vue): fix options passed to upload's `httpRequest` method ([5628dfd])
* fix(vue): remove media query listener correctly ([4ceaac3])
* fix(vue): respond to \`check all\` correctly ([feabec0]), closes [#133]
* fix(vue): respond to scrolling more soundly ([d980093])
* fix(vue): set default placement of tooltip to \`top\` ([31fd403])
* fix(vue): use c-icon-star-filled for rating ([6d9ca6e])
* docs(vue): fix icon reference and related style ([0afe6cd])
* docs(vue): fix text error in menu's README ([26d3745])
* docs(vue): fix typos ([e4b39dd])
* docs(vue): fix typos ([dea8151])
* docs(vue): update changelog for v0.0.4 ([d1b2cc3])
* docs(vue): update changelog for website ([833f1b9])
* docs(vue): update select's README for new feature ([f745800])
* chore(vue): support \`:focus-visible\` for development ([57be8b3])
* feat(vue): add c-icon-star-filled icon ([ddca079])




## <small>0.0.4 (2019-11-15)</small>

* fix(vue): display label when value of selected option is \`0\` ([f7de062])
* fix(vue): ensure portal stay in components tree ([ba2ac09])
* fix(vue): export all components in esm entry ([9a90457])
* fix(vue): export dropdown in esm ([a17436c])
* fix(vue): make table's shadow reactive ([28ca2e5])
* fix(vue): pass \`id\` properly on popover ([8f28b14])
* fix(vue): set default of \`showDelay\` back to \`100\` ([8635ae1])
* fix(vue): submenu expand timer ([66dbe12])
* fix(vue): sync \`visible\` correctly ([9bdd0f0])
* fix(vue): trigger \`visibility-change\` only from event ([2e8587d])
* fix(vue): use capture for \`focus\` and \`blur\` trigger pair ([3f32847])
* fix(vue): use capture for all trigger event ([b418cba])
* fix(vue): use proper backup responsive config for grid ([0994960])
* fix(vue): use Symbol as key of the cached portal hash map ([31f5462])
* feat(theme-default): remove padding of popover's content ([48ae570])
* feat(vue): add \`append-target\` prop to popover ([0aab844])
* feat(vue): add borderless style and custom body style for card ([4cb2cf7])
* feat(vue): add vnode support for popover's content ([7147adf])
* feat(vue): export all events on radio ([dc050c8]), closes [#130]
* feat(vue): pass attrs to popup panel and remove \`title\` props ([5ef9c1e])
* feat(vue): update event signature and expose all events on checkbox ([32a7e50]), closes [#130]
* feat(vue): use popover to empower select ([e0ac4dd])
* Merge branch 'fix/vue-submenu' into 'master' ([1c0769a])
* refactor(vue): pass down a11y attrs on popover directly ([f298d6a])
* refactor(vue): use \`mounted\` hook for initial side effects ([9646981])
* refactor(vue): use popover to empower dropdown ([3a8684c])
* refactor(vue): use popover to empower popconfirm ([0e9a893])
* refactor(vue): use popover to empower tooltip ([969608d])
* test(vue): update test suites of popconfirm ([aeb6410])
* test(vue): update test suites of popover ([1aa528c])
* perf(vue): release memory after being destroyed ([94a7e7c])
* docs(vue): update changelog for v0.0.3 ([aa85882])


### BREAKING CHANGE

* Change event signature to \`{ target: { checked: boolean, value: any }, nativeEvent: Event }\` on
checkbox and \`{ target: { value: any[] }, nativeEvent: Event }\` on checkbox-group
* Remove \`title\` prop from popover



## <small>0.0.3 (2019-11-08)</small>

* docs(sites): update uxc-vue sites for @clair/vue v0.0.2 ([0f3923a])




## <small>0.0.2 (2019-11-08)</small>

* docs: update badge docs ([a01685f])
* docs(site): add a README file for menu component ([ca02f77])
* docs(site): add some docs for design system ([20b2a1e])
* docs(site): add static docs for layout component ([2112440])
* docs(site): change style of resources page ([a2d8ecb])
* docs(site): fix column width bug of checkable table demo ([dacac1a])
* docs(site): fix demo of tags ([01f297f])
* docs(site): put control buttons on top of badge example ([8e94026])
* docs(site): remove !default in theming docs ([b9c98d9])
* docs(site): remove delay demos of popconfirm because of bug ([d4ae2b7])
* docs(site): set modal width in demos ([34fb378])
* docs(site): update docs for color ([70c28e5])
* docs(site): update docs for grid component ([b9c2505])
* docs(site): update docs of alert ([4d0b3e8])
* docs(site): update docs of button ([ce434d4])
* docs(site): update docs of form ([33d0809])
* docs(site): update docs of message components ([fad82a5])
* docs(site): update docs of some components ([4b6c83d])
* docs(site): update image margins in icon docs ([b39d5ad])
* docs(vue): add API table for radio ([ea1fd53])
* docs(vue): add missing data for form demo ([b409a32])
* docs(vue): add slots description for modal ([92f7163]), closes [#83]
* docs(vue): add trigger explanation for form validate ([8773eb6]), closes [#107]
* docs(vue): fix misleading props table ([b49ab43])
* docs(vue): fix typos ([a96cff9])
* docs(vue): fix typos and update event tables of checkbox ([b0e3ade])
* docs(vue): fix typos in READMEs ([8eacea6])
* docs(vue): remove code block background  in md theme ([b6718a8])
* docs(vue): remove vue language suggestion for code block ([683208d])
* docs(vue): unify props table ([42fc3b2])
* docs(vue): unify props table ([02532a2])
* docs(vue): update [button] docs ([6423626])
* docs(vue): update API tables ([39d7689])
* docs(vue): update breadcrumb's README ([c550fa1])
* docs(vue): update collapse's README ([ddb4cca])
* docs(vue): update color related details ([475908a])
* docs(vue): update demos for button, modal, tag, and tooltip ([070fb45])
* docs(vue): update deps ([19a0dcb])
* docs(vue): update getting-started ([54de87b])
* docs(vue): update getting-started for better guidance ([24b0b64])
* docs(vue): update input docs ([1d67891])
* docs(vue): update layout of tooltip's demo ([757a431])
* docs(vue): update notification docs ([4c234d4])
* docs(vue): update props table of checkbox ([07373dd])
* docs(vue): update README of table component ([68a0ae7])
* docs(vue): update READMEs ([1419916])
* docs(vue): update tabs docs ([b2fc02c])
* docs(vue): update tabs' README ([7b20e97])
* docs(vue): update theme colors ([e0722fb])
* docs(vue): update xxl boundry to 2560px ([8172790])
* docs(vue): upgrade storybook to v5 ([d4feecd])
* refactor: merge latest master ([e747714])
* refactor(theme-default): update form label size & padding & demo ([a4da62b])
* refactor(vue): [alert] make alert a stateful component ([0b51e2c])
* refactor(vue): add IconStatus ([64e3a77])
* refactor(vue): add name for component created by \`createPortal\` ([985db51])
* refactor(vue): add nullish injection proof to collapse ([edbf6a8])
* refactor(vue): apply latest class for avatar ([ae2e2f2]), closes [#122]
* refactor(vue): comply with icon updates ([20d71b2])
* refactor(vue): create a new entry file for named export only ([1c76ce6])
* refactor(vue): drop resize props of input ([347185c])
* refactor(vue): export icons directly now ([154e01b])
* refactor(vue): normalize import path of icons ([52b9cef])
* refactor(vue): prefer $refs over DOM API ([ba0786a])
* refactor(vue): refactor table to improve readability and performance ([bd1d01e])
* refactor(vue): remove surplus css and update test descriptions for badge ([47c1f33])
* refactor(vue): remove unnecessary field of icon component ([e4d55b6])
* refactor(vue): rename blueteeth icon to bluetooth ([359090a])
* refactor(vue): rename icon components and apply ([626f232])
* refactor(vue): rename iconComponentWrapper to registerIconComponent ([a750071])
* refactor(vue): simplify how to calculate rows of textarea ([7557232])
* refactor(vue): simplify state and imporve a11y of input-number ([6a6f805])
* refactor(vue): update icon's attributes more dynamically ([a84d392])
* refactor(vue): use \`{ target: value }\` as rating's event type ([2751afb])
* refactor(vue): use \`aria-disabled\` to indicate disabled state ([241dadf])
* refactor(vue): use $scopedSlots to collect column data ([b958527])
* refactor(vue): use clear icon for tag ([16413a3])
* refactor(vue): use named export for alias ([0367a80])
* refactor(vue): use props instead of data.attrs for IconStatus ([98a8d6b])
* refactor(vue): use scoped slots instead of slots ([74238e4])
* feat: add \`size\` prop to radio group ([8914e16])
* feat: add icon for question mark ([407359a])
* feat(homepage): add docs ([65a8cca])
* feat(sites): add new components in clair-vue 0.0.1 to website ([3bc16e6])
* feat(sites): initiate sites ([9f6b730])
* feat(theme-default): add input-number component ([c06c92d]), closes [#21]
* feat(vue):  add message component ([1dc6e43])
* feat(vue): add \`autocomplete\` and \`autofocus\` to input ([0d623b2]), closes [#110]
* feat(vue): add avatar component ([165ab1a])
* feat(vue): add avatar icon ([178d263])
* feat(vue): add badge component ([e5614e1])
* feat(vue): add breadcrumb component ([4e64755])
* feat(vue): add button group ([05658f0])
* feat(vue): add card component for vue ([9beabc2]), closes [#89]
* feat(vue): add card component for vue ([f58582e]), closes [#89]
* feat(vue): add cascader family and popover ([c212852]), closes [#25]
* feat(vue): add checkbox component ([247c7e5])
* feat(vue): add collapse component@vue ([88e8918])
* feat(vue): add createError utility function ([676270d])
* feat(vue): add drag and drop to upload component ([06fef3c])
* feat(vue): add dropdown component ([d4faf0e])
* feat(vue): add empty component ([e090122])
* feat(vue): add grid ([d30b564])
* feat(vue): add input component ([908aacd])
* feat(vue): add internal icon components ([cdf4ee2])
* feat(vue): add layout component ([711ff31]), closes [#65]
* feat(vue): add loading component ([1045baf])
* feat(vue): add long press support for input-number ([83354f8])
* feat(vue): add menu component ([71c7a2c]), closes [#70]
* feat(vue): add more functionalities to modal ([4e3f679])
* feat(vue): add more icons ([bdcaf84])
* feat(vue): add new icons ([2f95ced])
* feat(vue): add new icons ([6aa1d1d])
* feat(vue): add new icons ([23e429c])
* feat(vue): add pagination component ([d944b76])
* feat(vue): add pop-confirm component ([4974068])
* feat(vue): add progress component ([5947a2f])
* feat(vue): add provide $formItem for form control component ([9ca0bbf])
* feat(vue): add radio component ([8d4728c])
* feat(vue): add rating component ([36bf65d]), closes [#72]
* feat(vue): add role to input-number ([9b58196]), closes [#118]
* feat(vue): add select component ([61f2751])
* feat(vue): add slider component ([2f8d47b]), closes [#113]
* feat(vue): add step(s) component ([16d63d0])
* feat(vue): add switch component ([351032c]), closes [#63]
* feat(vue): add tabs component ([ac5c275])
* feat(vue): add tooltip component ([b8a362f])
* feat(vue): add upload component ([0e601a1]), closes [#56]
* feat(vue): add v-model to collapse and update its event's argument ([19744dd]), closes [#66]
* feat(vue): adopt new css and html for pagination ([121a83a])
* feat(vue): components icon and alert ([f7170d3])
* feat(vue): export new components in named export ([fb41e5d])
* feat(vue): fix page lists in pagination and add pagination to table ([5be00be])
* feat(vue): make input-number support form validation ([e586a9d]), closes [#77]
* feat(vue): make radio and checkbox support form validation ([7a34e0a])
* feat(vue): make select support form validation and fix bugs ([4138fb1]), closes [#77] [#81] [#88] [#96] [#98]
* feat(vue): notification accept vue component as description now ([96938f2])
* feat(vue): rename avatar to user ([8fe7477])
* feat(vue): rename icons ([dc33f0c])
* feat(vue): support named export ([4cea80f])
* feat(vue): table init ([683647d])
* feat(vue): this.$modal will return promise now ([6341754])
* feat(vue): update event signature of modal ([34393d3])
* feat(vue): update parameter signature of input's event ([bf49d8c])
* feat(vue): update status-icons ([f564200])
* feat(vue): use new status icons ([6472758])
* feat(vue): vue dropdown init ([8fe7118])
* fix: fix dropdown docs ([59d960c])
* fix: fix props reactivity of c-tab-pane ([c91dbae])
* fix: fix style and ux issues, and handle composition event ([643c497])
* fix: fix style issues of input-number ([0eecbe5])
* fix: improve the UI detail and docs ([bccd28b])
* fix: remove hover effect of empty table and update table docs ([f5d3e3e])
* fix: uI refine after designer review ([a986b16])
* fix: update breadcrumb styles and demos ([9911b96])
* fix: update collapse docs to align with design docs ([405e893])
* fix: update docs for popconfirm and fix error when customizing footer ([d5d828f])
* fix: update docs of modal ([b18d29d])
* fix: update dropdown docs and merge ([ac7a889])
* fix: update select style ([c77b868])
* fix: vertical alignment issue of select ([0c57b08])
* fix: wrong success icon ([f8933b3])
* fix(site): add docs and update demo for icon ([87725ce])
* fix(site): add play and pause for video ([bcd8fd1])
* fix(site): fix 404 error of breadcrumb link ([fdce5b4])
* fix(site): fix alignment and icon size of dropdown example ([f66a652])
* fix(site): fix margin of \`p\` and \`h1\` in demo ([e163bfa])
* fix(site): fix responsive design of the docs page ([cda5f3b])
* fix(site): fix typo ([3dbad2e])
* fix(site): fix typo: Axture -> Axure ([88a40a6])
* fix(site): refine ui ([f77c129])
* fix(site): static to vue ([d535895])
* fix(site): update docs ([bf4c37a])
* fix(site): update font size docs ([bb1f3a0])
* fix(site): update play and pause icons ([94eb806])
* fix(site): update play icon and mask background of transition video ([38b44cd])
* fix(theme-default): add classname for multiple select dropdown ([155c08a])
* fix(theme-default): add transition for alert ([00ff84d])
* fix(theme-default): remove pale-background-color ([864ae76])
* fix(vue): [alert] render null if invisible ([85a6ba1])
* fix(vue): [button] delegate native click event ([78392a9])
* fix(vue): add `lazy` prop to tabs ([dff85e7]), closes [#93]
* fix(vue): add default trigger ([3035b85])
* fix(vue): add e.detail.sourceType for modal close event ([2c24f74])
* fix(vue): add key for v-for ([3cde2bb])
* fix(vue): add new features to pagination ([3337657]), closes [#68]
* fix(vue): add step(s) component ([0af7fad]), closes [#100]
* fix(vue): change exported name of icons ([3f8c540])
* fix(vue): change syntax highlighting from html to markup ([151713b])
* fix(vue): check for empty value of $formItem ([f17eb6f])
* fix(vue): ensure content slot of popover is reactive ([a7786cb]), closes [#117]
* fix(vue): ensure trigger of validation works ([437c54a])
* fix(vue): export default in esm ([44d6f75])
* fix(vue): fix a typo in \`aria-labelledby\` ([20fb063])
* fix(vue): fix aria-label of input-number ([069295d])
* fix(vue): fix c-input does't trigger form validation bug ([af26732]), closes [#84]
* fix(vue): fix dropdown ([21d83de])
* fix(vue): fix dropdown ([776dbb8])
* fix(vue): fix dropdown ([828da1f])
* fix(vue): fix dropdown ([3981a5b])
* fix(vue): fix dropdown ([2ea65e9])
* fix(vue): fix dropdown ([e547853])
* fix(vue): fix dropdown ([c273d80])
* fix(vue): fix event handling and circle radius ([2dc6482])
* fix(vue): fix priority between slot and props ([fa0e2c1])
* fix(vue): fix select filter bug ([00165f6])
* fix(vue): fix several ux details of input-number ([a7bf95c])
* fix(vue): fix some input related bugs ([6542ba2])
* fix(vue): fix syntax highlighting in Vue docs ([4e7a3f8])
* fix(vue): fix table bug about border ([67057ee])
* fix(vue): fix table is bordered by default bug ([8cac74c])
* fix(vue): fix type check for empty's description ([d84a3f3])
* fix(vue): fix typos of method's name in message component ([6a55327])
* fix(vue): improve table's shadow display management ([76af860]), closes [#76] [#102]
* fix(vue): invoke validation only if inside form-item ([a31269a])
* fix(vue): make active-key of tab reactive ([6c06f8e]), closes [#95]
* fix(vue): make event listener works for certain icons ([a975844])
* fix(vue): make popconfirm's content reactive ([a005ac5])
* fix(vue): merge and dropdown commit ([2e4cd01])
* fix(vue): merge and fix dropdown ([9051c50])
* fix(vue): merge and update dropdown css ([5669d3d])
* fix(vue): merge attrs properly for icons ([de90b2d])
* fix(vue): merge master ([42f9db3])
* fix(vue): re-render slot content responsively ([26562a0]), closes [#91]
* fix(vue): remove aria-hidden from icon ([c735b8e]), closes [#119]
* fix(vue): remove empty id from input ([88e599a])
* fix(vue): remove support for using vue component as description ([d734d69])
* fix(vue): remove unused class names in radio ([08df992])
* fix(vue): render label DOM conditionally ([e704646])
* fix(vue): respond to keyboard event correctly ([62a3bd5])
* fix(vue): set initial strokeWidth of icon to exact 1px ([1c0079a])
* fix(vue): update \`updateStrokeWidth\` method of icon ([8516d69])
* fix(vue): update dropdown event ([cf7ab47])
* fix(vue): update dropdown readme and index.spec.js ([064d0ad])
* fix(vue): update dropdown scss ([218d051])
* fix(vue): update dropdown.scss ([be896b7])
* fix(vue): update event signature of tabs ([bc317a1])
* fix(vue): update how to update strokeWidth ([be1f4f4])
* fix(vue): update table docs and change element to fullscreen ([eb00eb4])
* fix(vue): update table snap ([f1fba43])
* fix(vue): update tooltip's content reactively ([20d1bf7]), closes [#117]
* fix(vue): update tooltip's position in time ([14a7821]), closes [#85]
* fix(vue): use \`aria-controls\` for select ([55277ca])
* fix(vue): use kebab-cased event name for tooltip ([9f7f3ab])
* fix(vue): use zIndexManager to control notification ([90f8051])
* fix(vue): use zIndexManager to controll message's zIndex ([9c220fd]), closes [#101]
* fix(vue): 解决dropdown存在的问题 ([e3ce647])
* chore: add date-fns to vue and react package ([52083ef])
* chore: add pattern arguments to pretty-check ([9d12508])
* chore: bump internal deps version ([334192d])
* chore: merge latest master ([944fcc4])
* chore: replace rm -rf with rimraf ([30431ca])
* chore: specify theme using env var THEME during developing ([f6837e2])
* chore: support publish to qnpm ([bab079f])
* chore: theme update ([e1544d1])
* chore: upgrade documentation workflow ([9c98948])
* chore(helpers): release @clair/helpers 0.0.1 ([dae154e])
* chore(icons): add svg files in @clair/icons npm package ([b18197b])
* chore(icons): release @clair/icons 0.0.1 ([52f6ebd])
* chore(theme-default): release @clair/theme-default 0.0.3 ([427078c])
* chore(vue): add `vue` as rollup externals ([75c6b7d])
* chore(vue): add banner to bundle ([d05fad5])
* chore(vue): add dependency(lodash) ([95e894b])
* chore(vue): add jest configs for development ([14e1e61])
* chore(vue): add jest-serializer-vue ([84b3158])
* chore(vue): add more eslint rules ([b18f634])
* chore(vue): add new babel plugins and update lodash ([66631c6])
* chore(vue): change sass implementation from node-sass to sass ([e241fe1])
* chore(vue): export toc for each component ([98ea53c])
* chore(vue): fix icon info ([df648a6])
* chore(vue): fix jest related configurations ([98349dc])
* chore(vue): fix radio's `defaultChecked` ([1f04f32])
* chore(vue): ignore artifacts generated by stroybook ([19cf672])
* chore(vue): install core-js@3 for development ([88aca6c])
* chore(vue): integrating jest for unit testing ([d932281])
* chore(vue): release @clair/vue 0.0.1 ([cdfe09a])
* chore(vue): support including external markdown in markdown file ([a005f31]), closes [#86]
* chore(vue): udpate deps ([01f57b1])
* chore(vue): update deps ([1358ec2])
* chore(vue): update deps ([86d5c64])
* chore(vue): update deps ([6290484])
* chore(vue): update deps ([bc66e8f])
* chore(vue): use prism for code highlighting ([aa02a64])
* chore(vue): use pure webpack for development of vue ([990e5bb])
* chore(vue): use require to resolve alias instead of import ([1b5ab6f])
* chore(vue): use sass instead of node-sass ([0737184])
* Merge branch 'docs/vue' ([311e698])
* Merge branch 'feature/icons' ([54d451e])
* Merge branch 'feature/vue-more-icons' ([fbc600c])
* Merge branch 'fix/vue-table-slot' into 'master' ([2a854c2])
* Merge branch 'master' into 'master' ([7ef32e4])
* Revert "Merge branch 'card' into 'master'" ([5170885])
* Revert "Merge branch 'steps' into 'master'" ([eb2bda7])
* update security-vue site ([979c321])
* test(vue): [alert] first unit test ([d278965])
* test(vue): add createPortal test suites ([1838ad2])
* test(vue): add form unit test coverage to 100% ([c987ed8])
* test(vue): add test cases for radio ([eeda7e6])
* test(vue): fix CSS classname in notification tests ([fb4ca1b])
* test(vue): fix test cases for tag ([fdfcc84])
* test(vue): improve form’s test coverage to 100% ([4116bd0])
* test(vue): make console.error silent for table test ([b0aea86])
* test(vue): update snapshot ([8278b49])
* test(vue): update snapshot due to icon's update ([c76740e])
* test(vue): update snapshots ([5e92871])
* test(vue): update table snapshot ([14d64e7])
* test(vue): update table tests ([a5704b2])
* test(vue): update test for input type props ([50ad61e])
* WIP: initialize ([def743d])
* WIP(site): uxc theme ([16c3f5b])
* WIP(theme-default): add animation for notification ([bf9e8c9])
* WIP(theme-default): transit to UXC theme ([4153f3d])
* WIP(vue): add icon-info ([bb8095d])
* WIP(vue): merge latest master ([03b509a])
* WIP(vue): use common modal service ([dee6b8f])
* style(theme-default): add form basic style ([59ef6f0])
* style(vue): update code style to comply with new eslint rules ([8ca0422])


### BREAKING CHANGE

* Rename \`c-icon-close-circle\` to \`c-icon-close-circle-stroke\`
* Rename avatar icon to user
* Rename status-icons from \`c-icon-${name}-circle\` to \`c-icon-status-${name}\`
* Signature of modal's events
* Update parameter signature of input's event
* Update the structure of collapse's 'change' event argument
* Use \`{ detail: { key: string } }\` as the structure of event argument instead of \`key: string\`
