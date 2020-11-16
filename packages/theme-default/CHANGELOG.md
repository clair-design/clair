# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.2] (2020-09-21)


### Bug Fixes

* **theme-default:** avoid unwanted shrink of radio box ([e63cc38])





## [0.7.1] (2020-08-26)


### Bug Fixes

* **theme-default:** make border invisible for ghost button ([fbe682d])





# [0.7.0] (2020-08-25)


### Bug Fixes

* **theme-default:** avoid placing triangle outside the content boundary ([84a4ed1]), closes [#190]
* **theme-default:** avoid stacking drop-shadow ([c99f53a]), closes [#191]
* **theme-default:** change border width of active menu item ([f1ffe65])


### Features

* **theme-default:** add ghost button ([1ff25fc]), closes [#52] [#75]
* **theme-default:** encapulate css given components composition ([eeb3821])





# [0.6.0] (2020-07-16)


### Bug Fixes

* **theme-default:** display modal without header or footer properly ([88108d5])
* **theme-default:** fix issue where timeline fail to render solid icon ([c8debc2])


### Features

* **react:** add inputNumber ([836b309])
* **react:** add menu component ([766c99e])
* **react:** add select component ([c7defd6]), closes [#17]
* **vue:** add tree component ([281b8ac]), closes [#80]





## [0.5.1] (2020-06-25)

**Note:** Version bump only for package @clair/theme-default





# [0.5.0] (2020-06-23)


### Bug Fixes

* **theme-default:** remove unwanted deps from \`yarn upgrade\` ([f06b7a2])


### Features

* **react:** add DatePicker and RangePicker component ([4c13f5b]), closes [#147]
* **react:** add tabs component ([9f41a69])
* **theme-default:** add selected background for table row ([4530d90])
* **theme-default:** increase the size of popover's arrow ([6a9b079])
* **theme-default:** shrink the gap between form-items ([c8dcfcb])
* **theme-default:** unify space between label and radio/checkbox ([95f2243])
* **theme-default:** unify the style of disabled button ([96ae6d5])





# [0.4.0] (2020-05-21)


### Features

* **theme-default:** support hiding controls of input-number ([a9f0bae])





# [0.3.0] (2020-04-30)


### Bug Fixes

* **theme-default:** fix overlapped display of option in Firefox ([cc65fee])
* **vue:** update cascader-panel properly when `options` changed ([8bf974a]), closes [#148]


### Features

* **react:** add slider component ([b51e80a])
* merge ([d96418e])





## [0.2.1] (2020-04-16)

**Note:** Version bump only for package @clair/theme-default





# [0.2.0] (2020-04-09)


### Bug Fixes

* **theme-default:** avoid misplacing cursor inside pagination's jumper ([179263c])
* **vue:** disallow non-number input to pagination's jumper ([e7f8273]), closes [#150]


### Features

* **react:** add Descriptions ([ac6d10d]), closes [#144]
* **react:** add pagination ([2baf0ed]), closes [#41]
* **react:** refocus on the previously focused element after modal exit ([5b3257a])
* **theme-default:** add a new transition to popover ([4ba1128]), closes [#139]





## [0.1.2] (2020-03-26)


### Bug Fixes

* **theme-default:** disallow disabled date-picker to gain focus ([286f938])
* **theme-default:** override border-radius of button from ua ([b6944e7])





## [0.1.1] (2020-02-20)


### Bug Fixes

* **theme-default:** remove max-height of textarea ([e760270])
* **theme-default:** remove unwanted \`box-shadow\` from dropdown ([86d94a2])
* **theme-default:** remove unwanted position style ([9446fcc])





# [0.1.0] (2020-02-06)


### Bug Fixes

* **theme-default:** allow modal to be scrolled ([88e392c]), closes [#105]
* **vue:** make height of collapse-item's content flexible ([c77391f])


### Features

* **react:** add rating component ([075d653])





## [0.0.15] (2020-01-09)


### Bug Fixes

* **theme-default:** display error border correctly ([1d35c11])
* **vue:** specify `cursor` and `font-size` of select ([6e9c5c9])





## [0.0.14] (2019-12-26)


### Bug Fixes

* **vue:** refine cursor style for select ([4c833d3])





## <small>0.0.13 (2019-12-19)</small>

* fix(theme-default): inherit line-height in checkbox-group ([275a43ee])
* fix(theme-default): disallow content of form-item to wrap ([a9604685])
* fix(theme-default): set \`flex-grow: 1\` on content of timeline item ([aafcd921])
* fix(theme-default): use flexbox to layout form-item ([357feefa])
* docs(theme-default): fix changelog ([2b5a639a])
* fix(theme-default): update color scheme of cascader's placeholder ([92f7cd2f])
* fix(theme-default): set cursor to pointer when cascader is readonly ([159f7f39])
* docs(theme-default): remove unneeded part of changelog ([04ac1df4])





## <small>0.0.12 (2019-12-16)</small>





## <small>0.0.11 (2019-12-15)</small>

* refactor(theme-default): update date-picker's html structure and demos ([8716c1a])
* refactor(vue): use different approach to style timeline ([22ab650])
* fix(theme-default): set cascader's default width to select's one ([a165ee9])
* fix(theme-default): set icon to proper size in timeline ([43e7788])
* fix(theme-default): use thinner border for step number ([4035a23])




## <small>0.0.10 (2019-12-12)</small>

* fix(theme-default): do not shrink the box part of checkbox ([710c687])
* fix(theme-default): remove padding within date-picker's input element ([10f0bce])
* fix(theme-default): update block-padding of textarea ([30de74e])
* fix(theme-default): use default font-size for select's icon ([9804792])
* fix(vue): do not emit `change` when the value is the same ([683399a])




## <small>0.0.9 (2019-12-05)</small>

* feat(vue): add datepicker component ([f66f1e4])
* feat(vue): add time-picker component ([b6428df])
* feat(vue): add timeline component ([6bb4d9a])
* fix(theme-default): process number line-height ([7265005])
* fix(theme-default): steps css ([c33aa53])
* Revert "Merge branch 'master' into 'master'" ([ae571b6])




## <small>0.0.8 (2019-11-29)</small>

* fix(theme-default): expand popover's content width to max-content ([609c054])
* fix(theme-default): replace \`flex:1\` with \`flex-grow:1\` ([61c34e2])




## <small>0.0.7 (2019-11-22)</small>

* refactor(theme-default): update some htmls to reflect recent changes ([d33c43c])
* fix(theme-default): set cursor to \`default\` for disabled state ([188d49e])




## <small>0.0.6 (2019-11-15)</small>

* fix(theme-default): fix background color of Card ([021d5bf])
* fix(theme-default): override \`<menu />\`'s style by user agent ([59a19ac])
* fix(theme-default): update z-index of switch's internal box and label ([df7214f])
* refactor(vue): use popover to empower popconfirm ([0e9a893])
* refactor(vue): use popover to empower tooltip ([969608d])
* feat(theme-default): remove padding of popover's content ([48ae570])
* feat(vue): add borderless style and custom body style for card ([4cb2cf7])
* feat(vue): pass attrs to popup panel and remove \`title\` props ([5ef9c1e])
* feat(vue): use popover to empower select ([e0ac4dd])


### BREAKING CHANGE

* Remove \`title\` prop from popover



## <small>0.0.5 (2019-11-08)</small>

* fix(theme-default): align step's number vertically middle ([fe3b37a])




## <small>0.0.4 (2019-11-08)</small>

* feat: add \`size\` prop to radio group ([8914e16])
* feat: add icon for question mark ([407359a])
* feat: add tooltip html ([d61e676])
* feat: update pagination for simplicity and better a11y ([e7dde7e])
* feat(homepage): add docs ([65a8cca])
* feat(react): add input component ([19719d7]), closes [#78]
* feat(react): add switch component ([d3095f2]), closes [#58]
* feat(react): input component ([b9a42c4])
* feat(theme-default): add button-group style ([ba25498])
* feat(theme-default): add date-picker ([67856d2])
* feat(theme-default): add empty component ([8e309ea])
* feat(theme-default): add focus-within polyfill and update deps ([1f16540])
* feat(theme-default): add grid style ([7deae95])
* feat(theme-default): add HTML and CSS for card component ([64a4c11])
* feat(theme-default): add input-number component ([c06c92d]), closes [#21]
* feat(theme-default): add layout html and styles ([203b124])
* feat(theme-default): add more styles for icons ([578e075])
* feat(theme-default): add progress component ([56aadcc])
* feat(theme-default): add radio component ([3d0a38b])
* feat(theme-default): add sass function to make a color legible ([39756ea])
* feat(theme-default): add select style ([4c86e41])
* feat(theme-default): add slider style and html ([969327f])
* feat(theme-default): add steps' style and icons ([4eab350])
* feat(theme-default): add style for spin icon ([c790de2])
* feat(theme-default): add time-picker style and html ([2c14a5a])
* feat(theme-default): finish checkbox's style ([77e4fd6])
* feat(theme-default): input style ([4d39909])
* feat(theme-default): pagination html and css ([cb2bb66])
* feat(theme-default): popconfirm style ([2bcced5])
* feat(theme-default): support \`:focus-visible\` ([5770dcc])
* feat(theme-default): update input style and html ([437b1e0])
* feat(theme-default): update status icons' coloring logic ([b8c1882])
* feat(theme-default): update status-icons' style ([fec79b9])
* feat(vue): add avatar component ([165ab1a])
* feat(vue): add badge component ([e5614e1])
* feat(vue): add breadcrumb component ([4e64755])
* feat(vue): add cascader family and popover ([c212852]), closes [#25]
* feat(vue): add checkbox component ([247c7e5])
* feat(vue): add collapse component@vue ([88e8918])
* feat(vue): add drag and drop to upload component ([06fef3c])
* feat(vue): add dropdown component ([d4faf0e])
* feat(vue): add input component ([908aacd])
* feat(vue): add layout component ([711ff31]), closes [#65]
* feat(vue): add loading component ([1045baf])
* feat(vue): add menu component ([71c7a2c]), closes [#70]
* feat(vue): add more functionalities to modal ([4e3f679])
* feat(vue): add pop-confirm component ([4974068])
* feat(vue): add progress component ([5947a2f])
* feat(vue): add rating component ([36bf65d]), closes [#72]
* feat(vue): add select component ([61f2751])
* feat(vue): add slider component ([2f8d47b]), closes [#113]
* feat(vue): add step(s) component ([16d63d0])
* feat(vue): add tabs component ([ac5c275])
* feat(vue): add upload component ([0e601a1]), closes [#56]
* feat(vue): fix page lists in pagination and add pagination to table ([5be00be])
* feat(vue): make select support form validation and fix bugs ([4138fb1]), closes [#77] [#81] [#88] [#96] [#98]
* feat(vue): table init ([683647d])
* feat(vue): vue dropdown init ([8fe7118])
* refactor: merge latest master ([e747714])
* refactor: remve opacity of icon components ([7baedc6])
* refactor: 修改Merge Requests问题，并解决构建问题，添加说明文档。修改样式组件的package.json ([0069931])
* refactor(theme-default): [tip] optimize triangle styles ([f71f497])
* refactor(theme-default): align icon vertically centered ([1e837fa])
* refactor(theme-default): disable stylelint rule and fix syntax error ([ea0fc13])
* refactor(theme-default): make sass variables more consistent ([24cb708])
* refactor(theme-default): radio ([2af3948])
* refactor(theme-default): remove implicit reference ([6f5b9f4])
* refactor(theme-default): remove redundant rules ([b25e0a4])
* refactor(theme-default): remove useless css declarations ([de367d4])
* refactor(theme-default): reorganize examples of input ([b74c9a6])
* refactor(theme-default): reuse variables as much as possible ([feb1bf8])
* refactor(theme-default): unify all transition easing and duration ([311587d])
* refactor(theme-default): unify the sass colors ([d9f22ab])
* refactor(theme-default): update form label size & padding & demo ([a4da62b])
* refactor(theme-default): update how to vertically align icon ([111538f])
* refactor(theme-default): update sass variables ([09bc91c])
* refactor(theme-default): use color function to calculate color ([4611531])
* refactor(theme-default): use line-height to control the height of input ([eb1b73c])
* refactor(theme-default): use proper BEM-style class for avatar ([cd39658])
* refactor(vue): remove surplus css and update test descriptions for badge ([47c1f33])
* refactor(vue): use \`aria-disabled\` to indicate disabled state ([241dadf])
* refactor(vue): use clear icon for tag ([16413a3])
* fix: fix dropdown docs ([59d960c])
* fix: fix props reactivity of c-tab-pane ([c91dbae])
* fix: fix style and ux issues, and handle composition event ([643c497])
* fix: fix style issues of input-number ([0eecbe5])
* fix: handle conflict ([3420065])
* fix: improve the UI detail and docs ([bccd28b])
* fix: make input-number center aligned when using in c-form-item ([5425efc])
* fix: remove hover effect of empty table and update table docs ([f5d3e3e])
* fix: uI refine after designer review ([a986b16])
* fix: update breadcrumb styles and demos ([9911b96])
* fix: update collapse docs to align with design docs ([405e893])
* fix: update docs of modal ([b18d29d])
* fix: update dropdown docs and merge ([ac7a889])
* fix: update select style ([c77b868])
* fix: vertical alignment issue of select ([0c57b08])
* fix: 提交关于default package.json 提交自动格式化的修改 ([db278ae])
* fix: 添加icon的测试用例，修改部分style，修改icon的图标bug ([682bff4])
* fix(site): fix responsive design of the docs page ([cda5f3b])
* fix(site): refine ui ([f77c129])
* fix(site): static to vue ([d535895])
* fix(theme-default):  add message animation ([331d937])
* fix(theme-default): [modal] change header struct ([d7cc552])
* fix(theme-default): add \`!default\` to variables ([e324747])
* fix(theme-default): add a variable for base background color ([3e82786])
* fix(theme-default): add class for text in c-tooltip ([878e527])
* fix(theme-default): add classname for multiple select dropdown ([155c08a])
* fix(theme-default): add default tooltip spacing ([350ed55])
* fix(theme-default): add radio button border radius ([df657ff])
* fix(theme-default): add tooltip effect ([77f8100])
* fix(theme-default): add transition for alert ([00ff84d])
* fix(theme-default): align checkbox-group properly ([52492a9])
* fix(theme-default): change button's line-height to its height - 2px ([3f0a945])
* fix(theme-default): change steps' icon into flexbox ([a31b1ec])
* fix(theme-default): code reviewed ([feed2ff])
* fix(theme-default): ensure input has correct border-color and font-size ([6a22f05])
* fix(theme-default): extract public tooltip style ([f59230b])
* fix(theme-default): fix border radius of some components ([400a4bb])
* fix(theme-default): fix dropdown in button group style ([749cf10])
* fix(theme-default): fix hover and input group style ([8b63d83])
* fix(theme-default): fix margin-left of close icon ([4dcfc83])
* fix(theme-default): fix recursive reference issues ([cba6e7a])
* fix(theme-default): fix sass variable name of dropdown ([bfc3545])
* fix(theme-default): fix select html demo style ([bfd3d66])
* fix(theme-default): generate transition rules correctly ([33a9508])
* fix(theme-default): limit max-width, add text-overflow ellipsis ([341d3b5])
* fix(theme-default): make icon just inline again ([feb9233])
* fix(theme-default): modal animation fill mode ([23b807c])
* fix(theme-default): modal header styles ([795200d])
* fix(theme-default): modify className to x-placement ([49fc106])
* fix(theme-default): normalize border-width of button to 1px ([265b7ad])
* fix(theme-default): pass correct format of map to transition function ([160fc8a])
* fix(theme-default): place icon visually centered within circle ([94a8af8])
* fix(theme-default): radio variables ([f85341d])
* fix(theme-default): reduce parameters ([83c8665])
* fix(theme-default): remove box-shadow of input:focus within select ([525464a])
* fix(theme-default): remove default width of select-dropdown ([2d3074d])
* fix(theme-default): remove outline when option is focused ([02670d5])
* fix(theme-default): remove pale-background-color ([864ae76])
* fix(theme-default): reorder arguments of get-text-color ([a0588ae])
* fix(theme-default): restrain effect of input's style under scoped block ([8a110b2])
* fix(theme-default): set line-height of switch to 0 ([e9c273e]), closes [#114]
* fix(theme-default): support background color of tab item ([387e508])
* fix(theme-default): take border-width into account of select's height ([c507163])
* fix(theme-default): transform borderWidth ([a9a9d45])
* fix(theme-default): update alignment of pagination icon ([d66f705])
* fix(theme-default): update checkbox dom and style ([e248d14])
* fix(theme-default): update clear icon style ([9d41f1c])
* fix(theme-default): update default width and affix padding of input ([e2e1fab])
* fix(theme-default): update input styles ([b73bf63])
* fix(theme-default): update menu's style ([09972bb])
* fix(theme-default): update min-width of dropdown item ([ae878d9])
* fix(theme-default): update option's style ([a8a2e91])
* fix(theme-default): use line-height to control tag's height ([b4ce608])
* fix(theme-default): use margin to place icon ([0f51791])
* fix(theme-default): use new dom structure for select ([899ca88])
* fix(theme-default): use variable for button background color ([caa4aee])
* fix(theme-default): use vertical-align to align icon, again ([3cdc24e])
* fix(theme-default): width of notification ([f3007cf])
* fix(theme-security): update security themes ([c7d2837])
* fix(vue): add default trigger ([3035b85])
* fix(vue): add new features to pagination ([3337657]), closes [#68]
* fix(vue): add step(s) component ([0af7fad]), closes [#100]
* fix(vue): change select default width to 240 ([227aaee])
* fix(vue): delete .c-dropdown-menu__item height ([c4fad07])
* fix(vue): fix dropdown ([776dbb8])
* fix(vue): fix dropdown ([828da1f])
* fix(vue): fix dropdown ([e547853])
* fix(vue): fix dropdown ([c273d80])
* fix(vue): fix select disabled style ([d6e4607])
* fix(vue): fix some input related bugs ([6542ba2])
* fix(vue): merge and dropdown commit ([2e4cd01])
* fix(vue): merge and fix dropdown ([9051c50])
* fix(vue): merge and update dropdown css ([5669d3d])
* fix(vue): merge master ([42f9db3])
* fix(vue): update dropdown scss ([218d051])
* fix(vue): update dropdown.scss ([be896b7])
* fix(vue): update table docs and change element to fullscreen ([eb00eb4])
* fix(vue): 解决dropdown存在的问题 ([e3ce647])
* Merge branch 'feature/icons' ([a118800])
* Merge branch 'feature/input' into 'master' ([6af1aea])
* Merge branch 'master' into 'creat-angular' ([fb30679])
* Merge branch 'master' into 'master' ([75aec84])
* Merge branch 'master' into 'master' ([7ef32e4])
* Merge branch 'master' into 'master' ([2da9123])
* Revert "Merge branch 'steps' into 'master'" ([eb2bda7])
* chore: add pattern arguments to pretty-check ([9d12508])
* chore: bump internal deps version ([334192d])
* chore: merge latest master ([00a4513])
* chore: merge latest master ([944fcc4])
* chore: support publish to qnpm ([bab079f])
* chore: theme update ([e1544d1])
* chore: update theme customization ([37f59b7])
* chore(theme-default): [alert,icon,notification] styles ([ac7ea5d])
* chore(theme-default): add doctype to every html file ([4508c2c])
* chore(theme-default): add stylelint-config-rational-order ([953bdfb])
* chore(theme-default): apply more strict properties-order rule ([002ebf4])
* chore(theme-default): format before commit ([43a7772])
* chore(theme-default): ignore html folder for stylelint ([177cfaf])
* chore(theme-default): release @clair/theme-default 0.0.3 ([427078c])
* chore(theme-default): resolve conflicts in index.scss ([448d306])
* chore(theme-default): update .stylelintrc.js ([0880d69])
* chore(theme-default): update stylelint rules ([13695bd])
* chore(theme-default): update stylelint rules ([bcfe33e])
* docs(site): update docs of form ([33d0809])
* docs(sites): update style and content of security-vue site ([1ed3233]), closes [#90]
* docs(theme-default): fix wrong titles ([f782292])
* style(theme-default): add form basic style ([7364f64])
* style(theme-default): fix lint error of table css ([205635c])
* style(theme-default): format based on lint rules ([ca09255])
* style(theme-default): format css ([5fe0c0c])
* style(theme-default): format grid.html ([ad8d7cb])
* style(theme-default): iniput style ([5bca744])
* style(theme-default): input ([7910f07])
* style(theme-default): input ([7e9fd58])
* style(theme-default): input style ([02c6095])
* style(theme-default): input style ([3ae4b0e])
* style(theme-default): input style ([198b120])
* style(theme-default): input style ([c460076])
* style(theme-default): input style ([140fa6a])
* style(theme-default): input style ([8295111])
* style(theme-default): input style ([92ac575])
* style(theme-default): input style ([19d7e10])
* style(theme-default): input style ([74b2db1])
* style(theme-default): input style ([9f03ec7])
* style(theme-default): input style ([39c3114])
* style(theme-default): input style ([3461f70])
* style(theme-default): input style ([7788a90])
* style(theme-default): input style and html ([8459005])
* style(theme-default): input style update ([b5c6a3f])
* style(theme-default): input-html ([d83fe55])
* style(theme-default): radio ([b921271])
* style(theme-default): update code style to comply with stylelint config ([af207c1])
* style(theme-default): update input style ([bad85a0])
* style(theme-default): update properties order ([98264fd])
* test(vue): add form unit test coverage to 100% ([c987ed8])
* WIP: initialize ([def743d])
* WIP(theme-default): [button,alert,icon] styles ([7c52366])
* WIP(theme-default): [button] rewrite ([35db105])
* WIP(theme-default): [button] support more flavors ([33239d0])
* WIP(theme-default): add animation for modal ([821ffad])
* WIP(theme-default): add animation for notification ([bf9e8c9])
* WIP(theme-default): add icon-info ([dcedc75])
* WIP(theme-default): add modal styles ([c1a7f08])
* WIP(theme-default): basic component styles ([fca6b23])
* WIP(theme-default): change CSS padding ([a558836])
* WIP(theme-default): transit to UXC theme ([4153f3d])
* WIP(theme-default): update theme colors and  outline button styles ([bc3ad5c])
* WIP(vue): merge latest master ([03b509a])
